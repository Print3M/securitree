---
label: Path Enumeration
---

# Path Enumeration

## Basic

Very basic and quick path enumeration can be done with `Nmap` built-in NSE script:

```bash
nmap -p80,443 --script=http-enum $ip
```

## Brute-force

Files and directories enumeration. Wordlists:

- `/usr/share/wordlists/dirb/common.txt` - all ([link](https://github.com/v0re/dirb/blob/master/wordlists/common.txt))
- `/usr/share/seclists/Discovery/Web-Content/combined_words.txt` - files ([link](https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/combined_words.txt))
- `/usr/share/seclists/Discovery/Web-Content/combined_directories.txt` - directories ([link](https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/combined_directories.txt))

> **NOTE**: If you discover a directory you must enumerate further starting from there. There may be nested files or further directories.

```bash
gobuster dir 
    -u $url 
    -w $wordlist 
    -t $threads                             # Number of threads
    -r                                      # Follow redirects

ffuf
    -u http://url.com/FUZZ
    -w $wordlist
    -H "Header: value"                      # Extra headers
    -b "Cookie=value;"                      # Extra cookies
    -x http://$ip:80                        # Proxy
    -timeout $seconds                       # HTTP request timeout
    -ac                                     # Auto-calibrate filtering
```

{/*FeroxBuster*/}
