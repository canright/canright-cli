/*jslint node: true */
'use strict';

const cli = require('./cli'),
  ask = s => {console.log(s); cli.con.prompt()},
  heys = ['there', 'now', 'good looking', 'is for horses'],
  help = `
> now    -- echo current date and time.
> hey    -- random heys.`;

function exe(r) {
  switch(r[0]) {

    case 'now':
      ask('It is ' + new Date());
      break;

    case 'hey':
      ask(heys[Math.floor((Math.random() * heys.length))]);
      break;

    default:
      ask(`command arguments: ${r.map(s => s)}
------------------
OK?`);
      break;
  }
}
exports.help = help;
exports.exe = exe;