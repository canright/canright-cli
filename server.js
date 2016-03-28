/// <reference path='./node.d.ts' />
/// <reference path='./node_modules/express/express.d.ts' />
/// <reference path='./node_modules/body-parser/body-parser.d.ts' />
/// <reference path='./node_modules/morgan/morgan.d.ts' />
"use strict";
const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cli = require('./lib/cli');
const PORT = process.env.PORT || 3000, put = (s) => console.log(s);
const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(morgan('dev', { stream: cli.log }));
console.log('Serving HTTP requests at: "localhost: %d"', PORT);
app.listen(PORT);
//export = app;
//# sourceMappingURL=server.js.map