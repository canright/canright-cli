/// <reference path="./node.d.ts" />
/// <reference path="./express.d.ts" />
/// <reference path="./body-parser.d.ts" />
/// <reference path="./morgan.d.ts" />

import readline = require('readline');
import stream = require('stream');
export declare const con: readline.ReadLine;
export declare var log: stream.Transform;

export declare const help: string;
export declare function exe(r: String[]): void;
