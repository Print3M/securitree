---
label: Double Hop
---

# Double Hop Problem

Double hop problem is related to the concept of logon type. Not every logon works the same way. Basic **Interactive Logon** (type 2) occurs when a user physically logs into Windows. When this happens, the credentials (NT hash or Kerberos TGT) are stored in LSASS memory and are used for further authentication to e.g. SMB shares.

However, in case of lateral movement the **Network Logon** (type 3) occurs most often. For this logon type, the credentials are not passed to the LSASS memory of the target machine. Although the logon occurs (you can execute commands), you can't get further access to e.g. SMB share. There's no cached credentials in the current session. This is the so-called double hop problem.

> **When double hop problem doesn't occur**:
>
> * RDP connection
> * PowerShell Remoting with CredSSP
> * `runas` session

{/*TODO: Kerberos delegation, how to bypass*/}

## Resources

* [Jebidiah, *PTT: Double Hop Bypass*](https://seymour.hackstreetboys.ph/projects/red-team/ptt-double-hop-bypass)
* [Offsecure, *The Powershell Double Hop*](https://offsecure.io/2022/05/22/powershell-double-hop/)
