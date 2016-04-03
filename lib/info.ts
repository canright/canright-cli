import nos = require('os');

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

export function canright(): Object {
  return {
  	name: 'Jim Canright',
  	email: 'jim@canright.net',
  	location: 'Portland, Oregon'
  }
}

const put = (s: String) => console.log(s);
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

function rptProperty(p: String, v: String): void {
  put(`- ${header()}${p}: ${v}`);
}

var jal = {
  string: rptString,
  number: rptNumber,
  array:  rptArray,
  object: rptObject,
  other:  rptOther
}

function rptString (n: String, v: String) { rptProperty(n, v) }
function rptNumber (n: String, v: Number) { rptProperty(n, v.toString()) }
function rptOther  (n: String, v: any   ) { rptProperty(`${n} ?${typeof v}?`, JSON.stringify(v)) }
function rptValue  (n: String, v: any   ) { jal[typer(v)](n, v) }

function rptArray  (n: String, a: any[]) {
  head.push(n);
  a.map( (v, k) => rptValue(`[${k}]`, v));
  head.pop();
}

function rptObject (name: String, o: Object) {
  head.push(name);
  for (var p in o)
    if (o.hasOwnProperty(p))
      rptValue(p, o[p]);
  head.pop();
}

export function report(name: String, o: Object) {
  put(name);
  for (var p in o)
    if (o.hasOwnProperty(p))
      rptValue(p, o[p]);
}
