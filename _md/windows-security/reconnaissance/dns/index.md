---
label: DNS
---

# Recon of Domain Name Service (53)

Enumerate the information held on the DNS server. These could be records about subdomains, but they could also be records with some data. Good results gives Metasploit module `msf auxiliary/gather/enum_dns`.

> **IMPORTANT**: It is worth checking out different tools as the results may vary!

```bash
# Manual enumeration
# Types: ANY, A, AA, AAA, AAAA, TXT, AXFR (zone transfer), MS, NS, CNAME
dig $type $domain> @$dns_ip

# Automated enumeration
dnsrecon -d $domain -a -n $dns_ip
```
