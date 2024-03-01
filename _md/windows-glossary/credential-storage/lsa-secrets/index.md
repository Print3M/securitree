---
label: LSA Secrets
---

# LSA Secrets on disk
A Local Security Authority (LSA) secret is a secret piece of data that is accessible only to SYSTEM account processes. They are stored in the registry on the local computer and provide credentials validation when a domain-joined computer cannot connect to AD DS during a user’s logon. Some of these secrets are credentials that must persist after reboot. Credentials stored as LSA secrets on disk may include:

* Account password for the computer’s Active Directory
account.
* Account passwords for Windows services configured on the
computer.
* Account passwords for configured scheduled tasks.
* Account passwords for IIS application pools and websites.

An attack tool running as an account with administrative privileges on the computer can exploit those privileges to extract these LSA secrets.
