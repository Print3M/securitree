# Research

[ ] Does `PsExec.exe` try to reach different SMB shares? What about non-standard ones? What if `ADMIN$` is not available. What about `impacket-psexec`?
[ ] Logon type:
    [ ] MSRPC (MS-SCMR) logon type (PsExec, SmbExec).
    [ ] WinRM logon type.
    [ ] Does logon type differ between authn methods (NT hash, password, Kerberos)?
    [ ] Why does PsExec run as SYSTEM?
