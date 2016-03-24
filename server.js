/*jslint node: true */
'use strict';

const app = (require('express'))(),
  parser  = require('body-parser'),
  morgan  = require('morgan'),
  PORT    = process.env.PORT || 3000,
  cli     = require('./js/cli');

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(morgan('dev', {stream: cli.log}));

console.log('Serving HTTP requests at: "localhost: %d"', PORT);
app.listen(PORT);
module.exports = app;
