---
label: SMB
---

# Recon of SMB (445)

## Shares enumeration

Enumeration using Guest account or Anonymous Logon. Both of these logons are quite rare. Most often only `Authenticated Users` have access to shares.

- `Guest` account (no password) is disabled by default. Guest account is a member of `Everyone` group but it's not a member of `Authenticated Users` group. Also, even if Guest account is enabled, its access to SMB shares is still disabled by default. Documentation: [here](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/guest-access-in-smb2-is-disabled-by-default).
- Anonymous Logon (no username, no password) is a special group, not even included in the built-in `Everyone` group since Windows XP. You still need to set some options ([example](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/network-access-let-everyone-permissions-apply-to-anonymous-users)), it is quite complicated to give Anonymous Logon access to SMB share.

Linux:

```bash
# Anonymous Logon
smbclient -L //$ip/ -U "%"
smbmap -H $ip -u "" -p ""
impacket-smbclient ""@$ip

# Guest logon
smbclient -L //$ip/ -U "guest%"
smbmap -H $ip -u "guest" -p ""

# Enumerate with credentials
crackmapexec smb $ip -u $user -p $pass --shares
smbclient -L //$ip/ -U "$domain/$user%$pass"
smbmap -H $ip -u $user -p $pass -d $domain
```

Windows:

```powershell
# List all shares available on host
net view \\$host /all
```

## Connect to share

Connect to a specific SMB share:

```bash
# Connect to SMB share (interactive shell)
smbclient //$ip/$share -U "$domain/$user%$pass"

# Connect to SMB share with impacket
impacket-smbclient $domain/$user:$password@$ip 
> shares
> use $share_name

# Connect using NT hash
impacket-smbclient $domain/$user@$ip -hashes :$nt_hash 

# Mount SMB share to local filesystem
mount -t cifs -o "user=$user,password=$pass" //$ip/$share /mnt/$target_dir
```

## Automated internal data enumeration

```bash
# Enumerate internal data via SMB
nmap --script smb-enum-domains.nse,smb-enum-groups.nse,smb-enum-processes.nse,smb-enum-services.nse,smb-enum-sessions.nse,smb-enum-shares.nse,smb-enum-users.nse,smb-protocols -p445 $ip

# Enumerate with SMB, RPC and NetBIOS
enum4linux-ng -A $ip
enum4linux-ng -A $ip -u $user -p $pass
```
