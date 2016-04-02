/// <reference path='./tsds/node.d.ts' />
/// <reference path='./tsds/express.d.ts' />
/// <reference path='./tsds/body-parser.d.ts' />
/// <reference path='./tsds/morgan.d.ts' />

import express = require('express');
import parser  = require('body-parser');
import morgan  = require('morgan');
import cli     = require('./lib/cli');


const PORT: number = process.env.PORT || 3000;
const app: any = express();

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(morgan('dev', {stream: cli.log}));



console.log('- Serving HTTP requests at: "localhost: %d"', PORT);
app.listen(PORT);
