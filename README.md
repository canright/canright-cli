# CLI for a Web Server

## A baseline CLI for a web server.

This is a minimalist, baseline CLI ready to be filled in as required.  This is a good wrapping for the implementation of a CLI application.

At runtime, it works like this:

#### Activate the CLI from your node application console by pressing the enter key.

#### Enter 'help' to see cli.help:

-----------------------------------
- The CLI is active.
- Logging to the console is paused.
- Incoming event logs are queued.

CLI Commands:

\> help   -- this help.
\> flush  -- flush queued logs and continue with the CLI.
\> resume -- resume logging after flushing queued logs and closing the CLI.
\> exit   -- stop the server.  Exit node.  Stop the server.

\> now    -- echo current date and time.

\> can    -- interesting stuff.

\> _
-----------------------------------

#### Notes:

Notice that we stream the logger (morgan) to cli.log rather than directly to the console.

The cli buffers, queues and allows you to manage event logs while the CLI is active.

- Consolidated REST dns resolves and lookups from the node dns module.
- No external dependencies (only uses node and express).
- Built with ES6/2015 - promises, template strings, arrow functions, ...
- Demonstrates simple CLI integrated with web server.
- Demonstrates functional programming.
- Demonstrates minimalist node/express web server.


#### Modules:

- server.js    - a minimal express web server
               - process requests like 'dns/:host?:subdomains.
- js/cli.js    - a cli interface.
- js/dns.js    - generates report data for an IP address or for a host domain and array of subdomains.
- js/out.js    - outputs report for html or cli.  Demonstrates functional programming.
- webserver.js - changes two lines of server.js to simply serve http with no cli.
