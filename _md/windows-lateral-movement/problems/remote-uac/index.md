---
label: Remote UAC
---

# Remote UAC Restrictions and Lateral Movement

> **IMPORTANT**: This problem does not apply to **domain users**. Only **local users** are affected.  

Even if your local user is a member of the local administrators group and all the necessary services are enabled, you still may not be able to perform RPC-based attacks (PsExec, SmbExec, WmiExec, etc.) or use WinRM to access the target machine. Admin SMB shares may not be visible for you. This is because by default on Windows, all local administrators (exceptions below) are filtered by UAC when they want to access remote management services: RPC and WinRM. **They have no full-administrative remote access** by default. They have only non-admin access, just as a regular user. RDP and physical interactive logon methods are not affected.

**Exceptions**: which users are not filtered by Remote UAC?

- Local built-in **Administrator** account (RID = 500)
- Domain users in local administrators group

## Disable Remote UAC Accounts Filtering

The default Remote UAC behavior can be disabled editing Windows Registry:

```powershell
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /f /v LocalAccountTokenFilterPolicy /t Reg_DWORD /d 1
```

## References

- [Microsoft, _Description of User Account Control and remote restrictions in Windows Vista_](https://learn.microsoft.com/en-us/troubleshoot/windows-server/windows-security/user-account-control-and-remote-restriction)
- [Will Schroeder, _Pass-the-Hash is Dead: Long Live LocalAccountTokenFilterPolicy_](https://posts.specterops.io/pass-the-hash-is-dead-long-live-localaccounttokenfilterpolicy-506c25a7c167)
