---
label: Subdomains Enumeration
---

# Subdomains Enumeration

## DNS

Enumerate the information held on the DNS server. These could be records about subdomains, but they could also be records with some data. Good results returns Metasploit module `msf auxiliary/gather/enum_dns`.

> **NOTE**: It is worth checking out different tools as the results may vary!

```bash
# Manual enumeration. Types:
# ANY, A, AA, AAA, AAAA, TXT, PTR, AXFR, MS, MX, NS, CNAME
dig $type $domain> @$dns_ip
nslookup -type=$type $domain $dns_ip
host -t $type $domain

# Multiple types scanning
for type in $(cat types.txt); do host -t $type $domain; done

# Multiple subdomains scanning
for sub in $(cat subdomains.txt); do host $sub.domain.com; done

# Automated enumeration of all types of domain records
dnsrecon -d $domain -a -n $dns_ip

# Brute-force subdomain enumeration
dnsrecon -d $domain -D $wordlist_file -t brt

# Various DNS enumerations at once 
dnsenum $domain --dnsserver $dns_ip
```
