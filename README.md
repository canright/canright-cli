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

The CLI module buffers, queues and allows you to manage the flow of event logs while the CLI is active.

The CLI facilitates management of the flow of logged events to the console.  It offers a minimal interface that enables the user to easily pause and resume that flow.  The CLI looks for and executes its base commands ('help', 'info' 'exit', '') and passes the rest on to applicatin command processor - the exe function in the commands sub-module.

The commands sub-module (lib/commands.ts/js) is a stub in which to add application specific CLI commands.  For demonstration purposes, commands implements two trivial commands, 'now' and 'hey'.

The CLI interprets a line of text from the console as a space-delimited list to yield an array of command arguments.
It passes that array of command arguments to the exe function in the commands sub-module.

#### Features

- No external dependencies (only uses node and express).
- Stack: Node 4 & 5, Javascript ES6/2015, Typescript, express.
- Demonstrates simple CLI integrated with web server.
- Demonstrates minimalist node/express web server.

#### Modules:

- server       - a minimal express web server.
- lib/cli      - the CLI framework module.
- lib/commands - stub for non-framework CLI command processors.
