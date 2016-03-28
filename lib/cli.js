"use strict";
const cons = require('readline');
const cmds = require('./commands');
var inCli = false, q = [];
exports.con = cons.createInterface(process.stdin, process.stdout);
exports.log = process.stdout;
const CLIOF = '', CLION = '> ', MGOFF = 'CLI is off.  Enter to turn it on.', TURNON = `- Logging to the console is paused.
- Incoming event logs are queued.
- The CLI is active. Try "help".
`, help = `CLI Commands:
${cmds.help}

> help        -- this help.
> flush queue -- flush queued logs and continue with the CLI.
> leave cli   -- flush queued logs and resume normal logging.
> exit server -- flush queued logs and stop the server.
`, put = (s) => console.log(s), ask = (s) => { put(s); exports.con.prompt(); }, flu = (x) => {
    var knt = q.length;
    if (knt) {
        for (let k = 0; k < knt; ++k)
            put(q.shift());
        flu(false);
    }
    else if (!x)
        flu(true);
}, clion = () => {
    inCli = true;
    exports.con.setPrompt(CLION);
}, clino = () => {
    flu(false);
    inCli = false;
    exports.con.setPrompt(CLIOF);
}, processExit = () => {
    put('[> close]');
    process.exit(0);
}, exeQueue = (act) => {
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
}, exeCli = (act) => {
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
}, exeServer = (act) => {
    switch (act) {
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
}, parm = (p) => p.toLowerCase(), exe = (r) => {
    const act = parm(r[0]);
    if (r.length < 2)
        switch (act) {
            case 'queue':
            case 'cli':
            case 'server':
            case '':
            case 'help':
                ask(help);
                break;
            default:
                cmds.exe(r);
                break;
        }
    else
        switch (parm(r[1])) {
            case 'queue':
                exeQueue(act);
                break; /* flush queue: flush queue, then continue cli with events logs refilling the queue. */
            case 'cli':
                exeCli(act);
                break; /* leave cli:   flush queue, leave cli and start logging events directly to console. */
            case 'server':
                exeServer(act);
                break; /* exit server: flush queue, leave cli, shutdown the node server process */
            default:
                cmds.exe(r);
                break;
        }
};
exports.say = (s) => {
    if (inCli)
        q.push(s);
    else {
        flu(false);
        put(s);
    }
};
put(MGOFF);
exports.con.setPrompt(CLIOF);
exports.con.on('close', () => {
    processExit();
});
exports.con.on('line', (line) => {
    if (!line.length && !inCli) {
        exports.con.setPrompt(CLION);
        inCli = true;
        ask(TURNON);
    }
    else if (inCli)
        exe(line.trim().split(' '));
    else
        put(MGOFF);
    exports.con.prompt();
});
//# sourceMappingURL=cli.js.map