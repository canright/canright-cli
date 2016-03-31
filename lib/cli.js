"use strict";
const readline = require('readline');
const cmds = require('./commands');
const put = (s) => console.log(s);
const ask = (s) => { put(s); exports.con.prompt(); };
/** import spigot = require('./spigot'); */
const stream = require('stream');
const BUFFERSIZE = 10485760; // 10MB
function pipeout(out, trans) {
    const parms = { objectMode: true, highWaterMark: BUFFERSIZE };
    const g = new stream.Transform(parms);
    g._transform = function (chunk, enc, done) {
        var data = (this._tail ? this._tail : '') + chunk.toString(), lines = data.split('\n');
        this._tail = lines.splice(lines.length - 1, 1)[0];
        for (let knt = lines.length, k = 0; k < knt; ++k)
            this.push(trans(lines[k], enc));
        done();
    };
    g._flush = function (done) {
        put(this._tail `|==> FLUSH: ${this._tail}!`);
        if (this._tail)
            this.push(trans(this._tail, null));
        this.tail = null;
        done();
    };
    g.on('drain', (err, data) => {
        if (err)
            put(`|==> DRAINERR ${err}`);
        else
            put(`|==> DRAIN ${data}`);
    });
    g.on('readable', (err) => {
        if (err)
            put(`|==> READABLE ERROR ${err}`);
        else
            put('\n- logs are queued.');
    });
    g.on('error', (err) => put(`|==> ERROR ${JSON.stringify(err)}`));
    g.on('close', () => put('|==> CLOSE SPIGOT'));
    g.on('end', () => put('|==> END SPIGOT'));
    g.pipe(out);
    g.resume();
    return g;
}
const CLIOF = '', CLION = '> ', MGOFF = 'CLI is off.  Enter to turn it on.';
const RESUME = '- Flowing logs. Enter to pause.';
const PAUSE = '- Log flow is paused.  Enter to resume.  Try "help".';
const HELP = `CLI Commands:
${cmds.help}

> <enter> -- toggle log flow to console - pause or resume flow.
> help    -- this help.
> info    -- system information.
> exit    -- flush logs and stop the server.
`;
var inCli = false;
exports.con = readline.createInterface(process.stdin, process.stdout);
function processExit() {
    put('[> close]');
    process.exit(0);
}
exports.log = pipeout(process.stdout, (lin, enc) => `|== ${enc} ==> ${lin}\n`);
function info() {
    put(`Information...`);
}
function exiter() {
    exports.con.setPrompt(CLIOF);
    exports.log.resume();
    inCli = false;
    put('Exiting node server');
    processExit();
}
function flowLog() {
    exports.con.setPrompt(CLIOF);
    exports.log.resume();
    inCli = false;
    put(RESUME);
}
function exe(r) {
    const act = r[0].toLowerCase();
    if (r.length < 2)
        switch (act) {
            case '':
                flowLog();
                break;
            case 'help':
                ask(HELP);
                break;
            case 'exit':
                exiter();
                break;
            case 'info':
                info();
                break;
            default:
                cmds.exe(r);
                break;
        }
    else
        cmds.exe(r);
}
exports.con.on('close', () => {
    processExit();
});
exports.con.on('line', (line) => {
    if (!line.length && !inCli) {
        exports.con.setPrompt(CLION);
        inCli = true;
        exports.log.pause();
        ask(PAUSE);
    }
    else if (inCli)
        exe(line.trim().split(' '));
    else
        put(MGOFF);
    exports.con.prompt();
});
put(MGOFF);
exports.con.setPrompt(CLIOF);
//# sourceMappingURL=cli.js.map