---
label: ACL Abuse
---

# Active Directory ACL misconfiguration abuse

## Theory

Active Directory is a complex ecosystem. There are hundreds of objects (i.e. groups, machines, users) in each domain. Each object has a list of *Access Control Entries* (ACEs). Each ACE defines:

* *ACE Type* - allow or deny.
* *Security Principal* - a user or group to which the permissions apply.
* *Permissions* - what actions the Security Principal is allowed or denied. They can include actions such as `read`, `write`, delete and so on.

There is a lot of combinations of ACEs that create potential for abuse. E.g., when a non-Domain Admins user has the ability to edit the Domain Admins group, they can add themselves to that group. There are many such misconfigurations and we will not list them all here.

Read about many ways to abusing Active Directory ACLs/ACEs: [Ired, *Abusing Active Directory ACLs/ACEs*](https://www.ired.team/offensive-security-experiments/active-directory-kerberos-abuse/abusing-active-directory-acls-aces)

## Tooling

Of course, everything can be enumerated manually, but there are tools that make the process easier. For Example, `BloodHound` can find a lot of ACL misconfigurations in a domain by default and it's probably the best option out of the box. People create many scripts searching for certain misconfigurations, some of them below:

Windows (PowerView module):

```powershell
Find-InterestingDomainAcl -ResolveGUIDs
```

Windows ([AD ACL Scanner](https://github.com/canix1/ADACLScanner) module):

```powershell
.\ADACLScan.ps1 -AccessType Allow
```

## References

* [Ired, *Abusing Active Directory ACLs/ACEs*](https://www.ired.team/offensive-security-experiments/active-directory-kerberos-abuse/abusing-active-directory-acls-aces)
