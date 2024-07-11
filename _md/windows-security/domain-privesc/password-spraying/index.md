---
label: Password Spraying
---

# Password Spraying

Password spraying involves trying different combinations of acquired passwords and usernames in different network protocols. In this way, some reused credentials can be found. The best tool for this is **NetExec** (successor to CrackMapExec). Available protocols: `smb`, `ssh`, `ldap`, `ftp`, `wmi`, `winrm`, `rdp`, `vnc`, `mssql`.

> **NOTE**: `Username`, `password` and `target` parameter can be provided in a form of:
>
> * single string (e.g. `-u john.doe`)
> * multiple space-separated strings (e.g. `-u john.doe adam.smith`)
> * path to the file with items (e.g. `-u ~/usernames.txt`)
>
> Read more: [NetExec official documentation](https://www.netexec.wiki/).

```bash
# Try on targets using usernames and passwords via selected protocol
netexec $protocol $target -u $domain/$username -p $password --continue-on-success
```

## Local Administrator's password reuse

The password for the local `Administrator` account is very often reused and is therefore the same on multiple machines within the domain. It's quite often to see one system image that is used for all machines. It is always a good idea to check if the Administrator user password is reused across the domain.
