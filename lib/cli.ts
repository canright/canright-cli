import cons = require('readline');
import cmds = require('./commands');

var inCli:boolean = false,
  q:String[] = [];

export const con = cons.createInterface(process.stdin, process.stdout);
export const log = process.stdout;

const CLIOF: string = '',
  CLION: string = '> ',
  MGOFF: string = 'CLI is off.  Enter to turn it on.',

  TURNON: string =
`- Logging to the console is paused.
- Incoming event logs are queued.
- The CLI is active. Try "help".
`,

  help:string =
`CLI Commands:
${cmds.help}

> help        -- this help.
> flush queue -- flush queued logs and continue with the CLI.
> leave cli   -- flush queued logs and resume normal logging.
> exit server -- flush queued logs and stop the server.
`,

  put = (s: String) => console.log(s),
  ask = (s: string) => {put(s); con.prompt()},

  flu = (x: boolean) => { // flush queue to console. x indicates final check.
    var knt: Number = q.length;
    if (knt) {
      for (let k = 0; k < knt; ++k)
        put(q.shift());
      flu(false);
    } else if (!x)
      flu(true);
  },

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
    put('[> close]');
    process.exit(0);
  },

  exeQueue = (act: String) => {
    switch (act) {
      case 'flush':
        clino();
        clion();
        put('- Logs are flushed.');
        break;
      default:
        ask(help);
        break;
    }
  },

  exeCli = (act: String) => {
    switch (act) {
      case 'leave':
        clino();
        put(`- Logs are flushed.
- The CLI is off.
- Incomming events log directly to the console.
- Enter to return to the CLI.`);
        break;
      default:
        ask(help);
        break;
    }
  },

  exeServer = (act: String) => {
    switch(act) {
      case 'exit':
        clino();
        put('Exiting node server');
        processExit();
        break;

      case 'info':
        put(`require.main: ${require.main}.`);
        break;

      default:
        ask(help);
        break;
    }
  },

  parm = (p: String) => p.toLowerCase(),

  exe = (r: String[]) => {
    const act: string = parm(r[0]);
    if (r.length<2)
      switch (act) {
        case 'queue' :
        case 'cli'   :
        case 'server':
        case '':
        case 'help'  : ask(help);      break;
        default      : cmds.exe(r);    break;
      }
    else
      switch (parm(r[1])) {
        case 'queue' : exeQueue(act);  break; /* flush queue: flush queue, then continue cli with events logs refilling the queue. */
        case 'cli'   : exeCli(act);    break; /* leave cli:   flush queue, leave cli and start logging events directly to console. */
        case 'server': exeServer(act); break; /* exit server: flush queue, leave cli, shutdown the node server process */
        default      : cmds.exe(r);    break;
      }
  };

export const say = (s: String) => { // say the message to the queued console.
  if (inCli)
    q.push(s);
  else {
    flu(false);
    put(s);
  }
};

put(MGOFF);
con.setPrompt(CLIOF);

con.on('close', () => {
  processExit();
});

con.on('line', (line: String) => {
  if (!line.length && !inCli) {
    con.setPrompt(CLION);
    inCli = true;
    ask(TURNON);
  } else
    if (inCli)
      exe(line.trim().split(' '));
    else
      put(MGOFF);

  con.prompt();
});
