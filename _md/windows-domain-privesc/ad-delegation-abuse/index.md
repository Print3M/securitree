---
label: AD Delegation Abuse
disabled: true
---

# AD Delegation mechanism

AD Delegation is a security-sensitive operation, which allows services to act on behalf of another user. It mitigates the double-hop problem - credentials are sent to the server even if there's a network logon.

* Do not trust this user for delegation.
* Trust this user for delegation to any service (Kerberos only) - Unconstrained
* Trust this user for delegation to specified services only - Constrained
  * Services to which this account can present delegated credentials

[x] Only service accounts and machine accounts can delegate.
[x] Usually delegation privilege is given to machine accounts.
[x] Dajemy uprawnienie kontu maszynowemu do delegacji do wszystkich serwisów (unconstrained) do wybranych serwisów (constrained).

Delegation is pretty complicated topic.
All objects that have an SPN can be configured for delegation.