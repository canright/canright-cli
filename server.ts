/// <reference path='./declarations/node.d.ts' />
/// <reference path='./declarations/express.d.ts' />

import express= require('express');
import parser = require('body-parser');
import morgan = require('morgan');
import cli    = require('./lib/cli');

const PORT: number = process.env.PORT || 3000,
  put = (s: String) => console.log(s),
  app = express();

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(morgan('dev', {stream: cli.log}));

console.log('Serving HTTP requests at: "localhost: %d"', PORT);
app.listen(PORT);
//export = app;
