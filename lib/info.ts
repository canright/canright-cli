import nos = require('os');

const put = (s: String) => console.log(s);

export function os(): Object {
  return {
// 	eol:       nos.EOL,
    arch:      nos.arch(),
    cpus:      nos.cpus(),
    endianness:nos.endianness(),
    freemem:   nos.freemem(),
    homedir:   nos.homedir(),
    hostname:  nos.hostname(),
    loadavg:   nos.loadavg(),
    netFaces:  nos.networkInterfaces(),
    platform:  nos.platform(),
    release:   nos.release(),
    tmpdir:    nos.tmpdir(),
    totalmem:  nos.totalmem(),
    type:      nos.type(),
    uptime:    nos.uptime()
  }
}

var head = [];

function typer(o) {
  var t = typeof o;
  return t === 'object' && Array.isArray(o) ? 'array' : t;
}

function sayProperty(p: String, v: any): void {
  put(`- ${head.length?head.join(' ')+' ':''}${p}: ${v}`);
}

function sayValue(n, v) {
  switch (typer(v)) {
    case 'string': sayProperty(n, v); break;
    case 'number': sayProperty(n, v.toString()); break;
    case 'array':  sayArray(n, v); break;
    case 'object': sayObject(n, v); break;
    default:       sayProperty(`${n} ?${typer(v)}?`, JSON.stringify(v)); break;
  }
}

function sayArray(name: String, a:any[]) {
  head.push(name);
  for (var knt=a.length, k=0; k<knt; ++k)
  	sayValue(`[${k}]`, a[k]);
  head.pop();
}

export function sayObject(name: String, o:Object) {
  head.push(name);
  for (var p in o)
    if (o.hasOwnProperty(p))
      sayValue(p, o[p]);
  head.pop();
}

export function saySection(name: String, o:Object) {
  put(name);
  for (var p in o)
    if (o.hasOwnProperty(p))
      sayValue(p, o[p]);
}
