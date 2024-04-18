---
label: Local Admin Hunting 
---

# Local Admin Hunting (Derivative Local Admin)

There is a chance that the domain user you have access to is a **local administrator** on some machine in the network and you don't know about this. This type of user is sometimes referred to as **Derivative Local Admin**. There is no simple method to enumerate the local groups of a remote machine and information about local administrators is not stored in the DC.

Fortunately, there are tools that attempt to connect to different hosts in the domain using your user in an automated way and thus determine whether you are the local administrator on a particular machine. Keep in mind that these tools are often very noisy in the network. Of course, manual [lateral movement](/windows-lateral-movement) and [password spraying](/windows-domain-privesc/password-spraying) is also possible, although it can be time-consuming.

Windows:

```powershell
# Find local admin access using PowerShell Remoting
. .\Find-PSRemotingLocalAdminAccess.ps1
Find-PSRemotingLocalAdminAccess

# Find local admin access using WMI
. .\Find-WMILocalAdminAccess.ps1
Find-WMILocalAdminAccess

# Find local admin access using different checks
. .\PowerView.ps1
Find-LocalAdminAccess -Verbose
```

## References

* [Justin Warner, _Derivative Local Admin_](https://sixdub.medium.com/derivative-local-admin-cdd09445aac8)
