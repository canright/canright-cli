# CLI for a Web Server

## A baseline CLI for a web server.

This is a minimalist, baseline CLI ready to be filled in as required.  It is intended as a wrapper for the implementation of a CLI application.

At runtime, it works like this:

#### Activate the CLI from your node application console by pressing the enter key.

At startup, CLI issues this hint to the console:

    CLI is off.  Enter to turn it on.

Upon entering an empty line, CLI puts this to the console:

    - Logging to the console is paused.
    - Incoming event logs are queued.
    - The CLI is active. Try "help".

#### Enter 'help' to see this:

    CLI Commands:

    > now     -- echo current date and time.
    > hey     -- random heys.

    > <enter> -- toggle log flow to console - pause or resume flow.
    > help    -- this help.
    > info    -- system information.
    > exit    -- flush logs and stop the server.

    > _

#### Notes:

The main server module demonstrates usage.  It is a minimum express web server that:

1. requires the CLI module.
2. streams the logger (morgan) to cli.log rather than directly to the console.

The CLI module buffers, queues and allows you to manage event logs while the CLI is active.

The CLI module handles the mechanics of entering and leaving the CLI by directly handling these commands:

- enter blank line to toggle (pause or resume) the flow of logs to the console.
- help
- exit the server

It passes any unrecognized commands to the exe function in commands.js.

The commands sub-module is a stub for you to add your specific CLI commands.  For demonstration purposes, commands implements two trivial commands, 'now' and 'hey'.

The exe function receives an array of strings - the space delimited command and arguments.

#### Features

- No external dependencies (only uses node and express).
- Built with ES6/2015 - promises, template strings, arrow functions, ...
- Built with Typescript.  But, the generated js files are included in the distribution so that the Typescript is optional.
- Demonstrates simple CLI integrated with web server.
- Demonstrates functional programming.
- Demonstrates minimalist node/express web server.

#### Modules:

- server       - a minimal express web server.
- lib/cli      - the CLI framework module.
- lib/commands - stub for non-framework CLI command processors.
