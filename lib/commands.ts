import cli = require('./cli');

const ask = (s: String) => {console.log(s); cli.con.prompt()},
  heys: (String[]) = ['there', 'now', 'good looking', 'is for horses'];

export const help = `
> now    -- echo current date and time.
> hey    -- random heys.`;

export function exe(r: String[]) {
  switch(r[0]) {

    case 'now':
      ask('It is ' + new Date());
      break;

    case 'hey':
      ask(heys[Math.floor(Math.random() * heys.length)]);
      break;

    default:
      ask(`command arguments: ${r.map(s => s)}.`);
      break;
  }
}
