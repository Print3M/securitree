---
label: NTDS.DIT
disabled: true
---

# Domain Active Directory Database (NTDS.DIT)
The Active Directory database is the authoritative store of credentials for all user and computer accounts in an Active Directory domain. Each writable DC in the domain contains a full copy of the domain’s Active Directory database, including account credentials for all accounts in the domain.

Active Directory database stores a number of attributes for each account:

* Username
* NT hash for current password
* NT hashes for password history (if configured)

LM hashes may also be stored in the Active Directory database depending on the domain controller operating system version.
