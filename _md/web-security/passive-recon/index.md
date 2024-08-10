---
label: Passive Reconnaissance
---

# Passive Reconnaissance

## Whois

Whois is a TCP service and type of database that can provide information about a domain name (e.g. the name server and registrar). This information is most often public because registrars charge a fee for private registration.

```bash
# With default WHOIS server
whois $domain

# With WHOIS specific server
whois $domain -h $whois_server
```

## Google Dorks / Google Hacking

Check out this [huge database of creative Google Dorks for various purposes](https://www.exploit-db.com/google-hacking-database). There is also several tools that helps with building complex Google queries: [DorkSearch.com](https://dorksearch.com/).

Most interesting parameters of Google search engine:

```powershell
-something              # Filter out this phrase
-filetype:<FILETYPE>    # Negation of filter

"<PHRASE>"              # Match exact phrase
site:<DOMAIN>           # Filter by domain
filetype:<FILETYPE>     # Filter by filetype
ext:<EXTENSION>         # Filter by file extensions
intitle:<PHRASE>        # Filter by phrase in a page title
inurl:<PHRASE>          # Filter by phrase in a page URL
```

Quick hints:

```powershell
# Find non-html pages
site:<DOMAIN> -filetype:html

# Find directory listing
intitle:"index of" "parent directory"
```

## Web Aggregators

There are some sites that aggregate data on multiple Internet domains for various reasons. They are a great source of passive knowledge about a site. With them, you can e.g. discover subdomains without enumeration.

> **NOTE**: It's worth to check various tools. Results may vary.

* [Netcraft](https://searchdns.netcraft.com/) - very detailed report about domains and subdomains.
* [crt.sh](https://crt.sh/) - great resource for subdomains enumeration.
* [ViewDNS.info](https://viewdns.info/) - various tools.
* [Shodan.io] - you know what it is ;)

## Source Code Inspection

Inspection of the source code sent to the front-end can give good results. Comments and framework-specific artifacts are often left behind. Back-end frameworks sometimes add their headers to the HTTP response. Inspection of HTTP requests and responses can provide answers.

The names of HTML classes or libraries used may be specific to a particular framework. File extensions, default files and folder names can also be helpful in identifying a specific technology.  

## Wappalyzer

[Wappalyzer](https://www.wappalyzer.com/) is a free tool that aggregates information about the technologies (i.e. frameworks, libraries, servers and languages) used by websites.
