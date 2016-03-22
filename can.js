/*jslint node: true */
'use strict';

const cli = require('./cli');

const help = `
> now    -- echo current date and time.`;

function exe(r) {
  switch(r[0]) {
    case 'now':
      cli.ask('It is ' + new Date());
      break;

    case '':
      cli.ask(cli.help);
      break;

    default:
      console.log('Command arguments:');
      r.map((s,k) => console.log(`${k}: ${s}.`));
      console.log('------------------');
      break;
  }
}
exports.help = help;
exports.exe = exe;