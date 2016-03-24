/*jslint node: true */
'use strict';

const cmds = require('./commands');

var inCli = false,
  q = [];

const readline = require('readline');
const con = readline.createInterface(process.stdin, process.stdout),
  log = process.stdio,
  CLIOF = '',
  CLION = '> ',
  MGOFF = 'CLI is off.  Enter to turn it on.',

  help =
`- The CLI is active.
- Logging to the console is paused.
- Incoming event logs are queued.

CLI Commands:
${cmds.help}

> help   -- this help.
> flush  -- flush queued logs and continue with the CLI.
> resume -- resume logging after flushing queued logs and closing the CLI.
> exit   -- stop the server.  Exit node.  Stop the server.
`,

  flu = (x) => { // flush queue - x = already flushed.
    var knt = q.length;
    if (knt) {
      for (let k = 0; k < knt; ++k)
        console.log(q.shift());
      flu(false);
    } else if (!x)
      flu(true);
  },

  say = s => { // say the message to the console
    if (inCli)
      q.push(s);
    else {
      flu();
      console.log(s);
    }
  },

  ask = s => {console.log(s); con.prompt();},

  clion = () => {
    inCli=true;
    con.setPrompt(CLION);
  },

  clino = () => {
    flu(false);
    inCli=false;
    con.setPrompt(CLIOF);
  },

  processExit = () => {
    console.log('[> close]');
    process.exit(0);
  },

  exeFlush = () => {
    clino();
    say('Logs are flushed.');
    clion();
  },

  exeResume = () => {
    clino();
    say('Logs are flushed.');
    say('The CLI is off.');
    say('Incomming events log directly to the console.');
    say('Enter to return to the CLI.');
  },

  exeExit = () => {
    clino();
    say('Exiting node');
    processExit();
  },

  exe = r => {
    switch (r[0].toLowerCase()) {
      case 'flush' : exeFlush() ; break;
      case 'resume': exeResume(); break;
      case 'exit'  : exeExit();   break;
      case ''      : ask(help);   break;
      case 'help'  : ask(help);   break;
      default      : cmds.exe(r); break;
    }
  };

exports.con  = con;
exports.log  = log;
exports.say  = say;
exports.out  = process.stdout;

console.log(MGOFF);
con.setPrompt(CLIOF);

con.on('close', () => {
  processExit();
});

con.on('line', (line) => {
  if (!line.length && !inCli) {
    con.setPrompt(CLION);
    inCli = true;
    ask('CLI is ON. Try "help".');
  } else
    if (inCli)
      exe(line.trim().split(' '));
    else
      say(MGOFF);

  con.prompt();
});
