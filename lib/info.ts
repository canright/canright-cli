import nos = require('os');

const put = (s: String) => console.log(s);

export function os(): Object {
  return {
// 	eol:       nos.EOL,
    arch:      nos.arch(),
    endianness:nos.endianness(),
    freemem:   nos.freemem(),
    homedir:   nos.homedir(),
    hostname:  nos.hostname(),
    platform:  nos.platform(),
    release:   nos.release(),
    tmpdir:    nos.tmpdir(),
    totalmem:  nos.totalmem(),
    type:      nos.type(),
    uptime:    nos.uptime(),
    cpus:      nos.cpus(),
    loadavg:   nos.loadavg(),
    netFaces:  nos.networkInterfaces()
  }
}

var head = [];

const types = ['string', 'number', 'array', 'object'];
function typer(o) {
  var t = typeof o;
  if (t === 'object' && Array.isArray(o)) t = 'array';
  if (types.indexOf(t) < 0) t = 'other'
  return t;
}

function header () {
  return head.length ? head.join(' ') + ' ' : '';
}

function sayProperty(p: String, v: String): void {
  put(`- ${header()}${p}: ${v}`);
}

var jal = {
  string: sayString,
  number: sayNumber,
  array:  sayArray,
  object: sayObject,
  other:  sayOther
}

function sayString (n: String, v: String) { sayProperty(n, v) }
function sayNumber (n: String, v: Number) { sayProperty(n, v.toString()) }
function sayOther  (n: String, v: any   ) { sayProperty(`${n} ?${typeof v}?`, JSON.stringify(v)) }
function sayValue  (n: String, v: any   ) { jal[typer(v)](n, v) }

function sayArray(name: String, a: any[]) {
  head.push(name);
  for (var knt=a.length, k=0; k<knt; ++k)
  	sayValue(`[${k}]`, a[k]);
  head.pop();
}

function sayObject(name: String, o: Object) {
  head.push(name);
  for (var p in o)
    if (o.hasOwnProperty(p))
      sayValue(p, o[p]);
  head.pop();
}

export function saySection(name: String, o: Object) {
  put(name);
  for (var p in o)
    if (o.hasOwnProperty(p))
      sayValue(p, o[p]);
}

/*
function xayValue(n, v) {
  switch (typer(v)) {
    case 'string': sayProperty(n, v); break;
    case 'number': sayProperty(n, v.toString()); break;
    case 'array':  sayArray(n, v); break;
    case 'object': sayObject(n, v); break;
    default:       sayProperty(`${n} ?${typer(v)}?`, JSON.stringify(v)); break;
  }
}
*/
