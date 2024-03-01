---
label: LSASS
---

# Local System Security Authority Subsystem (LSASS)

The Local Security Authority (LSA) stores credentials in memory on behalf of users with active Windows sessions. This allows users to seamlessly access network resources, such as file shares, mailboxes, SharePoint sites etc., without re- entering their credentials for each remote service.

LSA may store credentials in multiple forms including:

* Kerberos tickets (TGTs, TGSs)
* NT hash
* LM hash

The credentials stored are directly associated with the LSA logon sessions that have been started since the last reboot and have not been closed. For example, LSA sessions with stored LSA credentials are created when a user or service account does any of the following:

* Logs on to a local session
* Logs on to an RDP session
* Runs a process using `runas`
* Runs an active service
* Runs a scheduled task or batch job
* Runas a process on the local computer using a remote admin tool, such as `PsExec`
