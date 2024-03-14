# Research

[X] Does `PsExec.exe` try to reach different SMB shares? What about non-standard ones? What if `ADMIN$` is not available. What about `impacket-psexec`?
[ ] Logon type:
    [X] MSRPC (MS-SCMR) logon type (PsExec, SmbExec).
    [ ] WinRM logon type.
    [ ] Does logon type differ between authn methods (NT hash, password, Kerberos)?
    [X] Why does PsExec run as SYSTEM?
[ ] `mimikatz sekurlsa::pth` logon type and behavior.
[ ] RunAs without local admin?