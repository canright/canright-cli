/*jslint node: true */
'use strict';

const app = (require('express'))(),
  parser  = require('body-parser'),
  morgan  = require('morgan'),
  PORT    = process.env.PORT || 3000,
  cli     = require('./cli.js');
//can     = require('../can');

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(morgan('dev', {stream: cli.log}));

//app.use(can);
// console.log(cli.hello);

console.log('Serving HTTP requests at: "localhost: %d"', PORT);
app.listen(PORT);
module.exports = app;
