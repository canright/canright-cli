import readline = require('readline');
import stream = require('stream');
import cmds = require('./commands');
import info = require('./info');

const put = (s: String) => console.log(s);
const ask = (s: string) => {put(s); con.prompt()};

const BUFFERSIZE: number = 1048576;

function pipeout(out: any, buffer: Number, trans: Function) {

  const parms: Object = {objectMode: true, highWaterMark: buffer};
  const g = new stream.Transform(parms);

  g._transform = function (chunk, enc, done) {
    var data: String = (this._tail ? this._tail : '') + chunk.toString(),
      lines: String[] = data.split('\n');
    this._tail = lines.splice(lines.length-1,1)[0];
    for (let knt=lines.length, k=0; k<knt; ++k)
      this.push(trans(lines[k], enc));
    done();  
  }

  g._flush = function (done) {
    put(this._tail`|==> FLUSH: ${this._tail}!`);
    if (this._tail) this.push(trans(this._tail, null));
    this.tail = null;
    done();
  }

  g.on('readable', (err: any) => {
    if (err) put(`|==> READABLE ERROR ${err}`); else put('\n- logs are queued.');
  });

  g.on('error'   , (err: any) => put(`|==> ERROR ${JSON.stringify(err)}`));
  g.on('close'   , ()         => put('|==> CLOSE SPIGOT'));
  g.on('end'     , ()         => put('|==> END SPIGOT'  ));
  g.pipe(out);
  g.resume();
  return g;
}

/* cli ui */

const START: string = '- Event logs are flowing to the console.  Enter to pause.',
  PROMPTNO: string = '',
  PROMPTON: string = '> ',
  RESUME: string = '- Flowing logs. Enter to pause.',
  PAUSE : string = '- Log flow is paused.  Enter to resume.  CLI is active - try "help".',

  INFO: string =
`CLI INFO Commands:

> info os       -- node os module queries.
> info help     -- this help.
> info          -- this help.
`,

  CANRIGHT: string =
`Jim Canright
`,

  HELP: string =
`CLI Commands:
${cmds.help}

> help    -- this help.
> info    -- system information.
> exit    -- flush logs and stop the server.

> <enter> -- toggle log flow to console - pause or resume flow.
`;

var bPause: boolean = false;

export const con = readline.createInterface(process.stdin, process.stdout);

export var log = pipeout(process.stdout, BUFFERSIZE,
  (lin: String, enc: String) => `|== ${enc} ==> ${lin}\n`);

/* application functionality */

function processExit() {
  put('[> close]');
  process.exit(0);
}

function inform(section: String) {
  switch (section) {
    case 'os'      : info.report(section, info.os()); break;
    case 'canright': info.report(section, info.canright()); break;
    default: ask(INFO); break;
  }
}

function exiter() { /** exit server: flush queue, leave cli, shutdown the node server process */
  con.setPrompt(PROMPTNO);
  log.resume();
  bPause=false;
  put('Exiting node server');
  processExit();
}

function exe(r: String[]) {
  const l: number = r.length,
    act: string = l ? r[0].toLowerCase() : '';
  if (l<2)
    switch (act) {
      case 'help'    : ask(HELP); break;
      case 'exit'    : exiter(); break;
      case 'info'    : ask(INFO); break;
      case 'canright': ask(CANRIGHT); break;
      default        : cmds.exe(r); break;
    }
  else
     switch (act) {
      case 'info'    : inform(r[1]); break;
      default        : cmds.exe(r); break;
    }
}


/* console implementation */

con.on('close', () => {
  processExit();
});

con.on('line', (line: String) => {
  if (!line.length) {
    bPause = !bPause;
    if (bPause) {
      con.setPrompt(PROMPTON);
      log.pause();
      ask(PAUSE);
    } else {
      con.setPrompt(PROMPTNO);
      log.resume();
      put(RESUME);
    }
  } else
    exe(line.trim().split(' '));

  con.prompt();
});

put(START);
con.setPrompt(PROMPTNO);
