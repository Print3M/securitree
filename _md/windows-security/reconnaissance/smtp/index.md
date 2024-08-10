---
label: SMTP
---

# Recon of SMTP (25 / 465 / 587)

We can gather information about a host or network from vulnerable mail servers. The _Simple Mail Transport Protocol_ (SMTP) supports several interesting commands which allow to e.g. perform usernames enumeration.

```bash
# Connect to SMTP server
nc -nv $host -p $port

# Interesting SMTP commands
> VRFY $username            # Verify if user exists
> EXPN $username            # Username to email

```

## Automated enumeration

```bash
# User enumeration using Metasploit
auxiliary/scanner/smtp/smtp_enum

# Various Nmap scripts
nmap --script smtp-commands,smtp-open-relay,smtp-enum-users $ip
```
