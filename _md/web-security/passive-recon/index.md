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
