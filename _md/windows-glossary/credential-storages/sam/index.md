---
label: SAM
disabled: true
---

# Security Accounts Manager (SAM)

The SAM database is stored as a file on the local disk, and is the authoritative credential store for local accounts on each Windows computer. This database contains all the credentials that are local to that specific computer including the built-in local Administrator account and any other local accounts for that computer.

The SAM database stores information on each account, including the username and the NT password hash. By default, the SAM database does not store LM hashes on current versions of Windows.

**Important**: no password is ever stored in a SAM database, only the password hashes.
