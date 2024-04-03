---
label: Constrained Delegation
disabled: true
---

# Constrained Delegation Abuse

> **Requirements**
>
> * Compromised a service or a machine account with Constrained Delegation attribute.

Constrained Delegation is a special attribute (`TRUSTED_TO_AUTH_FOR_DELEGATION`) of a service account or machine account (with an associated SPN). This attribute means that an account with an SPN can use TGS for defined services on behalf of the user who authenticated to the service (example below).

## Correct usage

Example of correct usage (highly simplified):

```plaintext
                            Srv$
                  (  Machine account with  )
                  ( Constrained Delegation )
   User                |'''''''''''''|
|=======| -----------> | User's TGS  |
             (Auth)    |,,,,,,,,,,,,,|
                              |
                              |
                              |
                           HttpSvc
                  (     Allowed in Srv$      )
                  ( msds-allowedToDelegateTo ) 
                       |'''''''''''''|
                       | Auth using  |
                       | User's TGS  |
                       |,,,,,,,,,,,,,|
```

During authentication to Srv$ machine account (with Constrained Delegation) User's TGS is delegated. Srv$ can use User's TGS to access `HttpSvc` because this service is allowed in Srv$ Constrained Delegation `msds-allowedToDelegateTo` list of services.

## Abuse

An account with Constrained Delegation enabled is allowed to request TGT tickets to itself as any user, in a process known as _S4U2self_. That TGT is then used to request a valid TGS to `msds-allowedToDelegateTo` SPNs. As a result, we (`/user` param) obtain a TGS of another domain user (`/impersonateuser`) which is valid to the target SPN (`/msdsspn`). In addition, the service class in the target SPN (the protocol part) can be changed to any other (`/altservice`).

> **NOTE**: `/altservice` parameter can be used to access other services on the target server and exploit different attack techniques:
>
> * `LDAP` – [DCSync attack](/windows-domain-privesc/from-dc)
> * `HOST,HTTP` – [WinRM lateral movement](/windows-lateral-movement/winrm)
> * `HOST,RPCSS,CIFS` – [PsExec lateral movement](/windows-lateral-movement/)  

```powershell
# Using aes256 of compromised user (RC4 can be used as well)
.\Rubeus.exe s4u /user:$compromised_user /aes256:$compromised_user_aes256 /impersonateuser:$domain_user_to_impersonate /msdsspn:$legit_spn_from_msds_list /altservice:$alternative_service_class
```

## Enumerate machines and users with Constrained Delegation

PowerView module:

```powershell
Get-DomainUser -TrustedToAuth | select samaccountname, userprincipalname, msds-allowedtodelegateto
Get-DomainComputer -TrustedToAuth | select samaccountname, userprincipalname, msds-allowedtodelegateto
```

## References

* [Ired, _Kerberos Constrained Delegation_](https://www.ired.team/offensive-security-experiments/active-directory-kerberos-abuse/abusing-kerberos-constrained-delegation)
* [NotSoShant.io, _Attacking Kerberos: Constrained Delegaton_](https://www.notsoshant.io/blog/attacking-kerberos-constrained-delegation/)
* [Rubeus Tool, _Constrained Delegation_](https://github.com/GhostPack/Rubeus?tab=readme-ov-file#s4u)
* [Orange, _Constrained Delegation Considerations for Lateral Movement_](https://sensepost.com/blog/2022/constrained-delegation-considerations-for-lateral-movement/)
