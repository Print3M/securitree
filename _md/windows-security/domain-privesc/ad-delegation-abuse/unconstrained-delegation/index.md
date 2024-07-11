---
label: Unconstrained Delegation
disabled: true
---

# Unconstrained Delegation

> **NOTE**: DC usually appears to have Unconstrained Delegation enabled but it's not useful for privilege escalation.

Windows (PowerView module):

```powershell
# Get machines with Unconstrained Delegation enabled
Get-NetComputer -Unconstrained
```

## References

* [Ired, _Kerberos Unconstrained Delegation_](https://www.ired.team/offensive-security-experiments/active-directory-kerberos-abuse/domain-compromise-via-unrestricted-kerberos-delegation)
