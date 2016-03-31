/// <reference path="node.d.ts" />
/// <reference path="node_modules/express/express.d.ts" />
/// <reference path="node_modules/body-parser/body-parser.d.ts" />
/// <reference path="node_modules/morgan/morgan.d.ts" />

import readline = require('readline');
import stream = require('stream');
export declare const con: readline.ReadLine;
export declare var log: stream.Transform;

export declare const help: string;
export declare function exe(r: String[]): void;
