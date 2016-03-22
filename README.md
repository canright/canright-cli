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

> help   -- this help.
> flush  -- flush queued logs and continue with the CLI.
> resume -- resume logging after flushing queued logs and closing the CLI.
> exit   -- stop the server.  Exit node.  Stop the server.

> now    -- echo current date and time.

> can    -- interesting stuff.

> _
-----------------------------------

So, this CLI moddule establishes a baseline for a cli interface.

The baseline implements these cli commands: help, flush, resume, and exit.


Any other

- 'help'




Notice that we stream the logger (morgan) to cli.log rather than directly to the console.
The cli buffers, queues and allows you to manage event logs while the CLI is active.




you are in the CLI so they do not interfere withcan be viewed at will but when wanted from the 
This allows the logs to buffered and queued so that they do not interrupt the cli sesion so as notbe enables the cli to queue and buffer the logs 

To 
streams morgan router to cli.log rather than directly to the
console so that event logging can be buffered and queued by the cli.

the 
thand
The cli The logger (here morgan)
***/





- Consolidated REST dns resolves and lookups from the node dns module.
- No external dependencies (only uses node and express).
- Built with ES6/2015 - promises, template strings, arrow functions, ...
- Demonstrates simple CLI integrated with web server.
- Demonstrates functional programming.
- Demonstrates minimalist node/express web server.
- CLI is an optional mini-module.

## DNS report functions:

- lookup \<host\>               -- Quick lookup to get the ip address associated with host.
- resolve \<host\>              -- Resolve dns for host with lookups for default subdomains.
- reverse \<ipaddress\>         -- Reverse lookup of hosts for that ip address.
- resolve \<host\> \<subs..\>   -- Resolve dns for host with lookups for listed subdomains.
                                -- default subdomains: @ (root), 'www', 'ftp' and 'mail'.

## REST Request patterns:

- ../dns/\<host\>               -- Lookup host.
- ../dns/\<host\>?full          -- Resolve host.
- ../dns/\<ipaddress\>          -- Reverse lookup ip address.
- ../dns/\<host\>?subs=\<subs\> -- Resolve host with subdomains.

#### HTTP Request Examples:

- ../dns/google.com
- ../dns/google.com?full
- ../dns/192.168.92.15
- ../dns/google.com?subs=www,ftps


## From CLI:

- \> help  -- This help.
- \> off   -- Turn off CLI
- \> exit  -- Exit node.  Stop the server.
- \> now   -- Echo current date and time.

- \> dns \<host\>               -- Lookup host.
- \> dns \<host\> full          -- Resolve host.
- \> dns \<ipaddress\>          -- Reverse lookup ip address.
- \> dns \<host\> \<subs..\>    -- Resolve host with subdomains.

#### CLI Examples:

- \> dns google.com
- \> dns google.com full
- \> dns 192.168.92.15
- \> dns google.com www ftp

## Modules:

- server.js    - a minimal express web server
               - process requests like 'dns/:host?:subdomains.
- js/cli.js    - a cli interface.
- js/dns.js    - generates report data for an IP address or for a host domain and array of subdomains.
- js/out.js    - outputs report for html or cli.  Demonstrates functional programming.
- webserver.js - changes two lines of server.js to simply serve http with no cli.

