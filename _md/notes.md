# Temporary notes

## Windows credentials dump

With administrative access, an attacker can steal credentials from several locations on the computer, including:

* The Security Accounts Manager (SAM) database.
* Local Security Authority Subsystem (LSASS) process memory.
* Domain Active Directory Database (domain controllers only).
* The Credential Manager (CredMan) store.
* LSA Secrets in the registry.

It is important to reiterate that the attacker must have administrative access on the initial compromised computer in order to steal these credentials. Administrative Access to a computer can include the ability to run a program or script with an account in the local Administrators group, but this type of access can also be achieved through the use of "admin-equivalent" privileges, such as those used for "Debug programs," "Load and unload device drivers" or "Take ownership" privileges.

An attacker is limited to the logon credentials that they can obtain from the compromised computer. Accounts the attacker cannot harvest locally cannot be used in further attacks. If a Domain Admin account is never used for authentication to workstations, this account will not be available to an attacker that has compromised these workstations.

he attacker uses the stolen credentials to connect to other computers on the network using built-in Windows commands, such as net use, or net view, or by downloading and executing utilities like psexec.exe.
Windows built-in tools by default only support plaintext passwords or the use ofcurrent session credentials for authentication through network logon. Attack tools can allow the attacker to use any credential type by either creating a new session command prompt or overwriting the hashes for the current session with these newly obtained credentials to impersonate the target user.

Hash spraying: NT password hashes are created using an unsalted MD4 algorithm, so they are identical on each computer.

Reuse credentials: The same single sign-on (SSO) mechanism that brings significant benefits to the user experience also increases the risk of a PtH attack if an operating system is compromised. Credentials must be stored or cached to allow the operating system to perform actions on behalf of the user to make the system usable. If credentials that a user typed at logon are not available or cannot be reused, the user must retype them countless times in a distributed environment that uses Active Directory. Additionally, keystroke logging and other attack techniques to capture credentials can still be performed. Limiting delegation or where credentials can be used are positive steps toward preventing PtH attacks. The mitigation recommendations in this document address these challenges.

Disabling the NTLM protocol completely mitigates PtH attacks. However, it cannot be easily implemented by most organizations. Even with extensive NTLM restrictions in the environment that mitigate PtH attacks, attackers may still be able to steal and reuse other credentials including Kerberos TGTs (see: Pass The Key) and plain passwords (see: Pass the Password).

## Logon types

Table 6 Connection Methods

Interactive (a.k.a. local logon):

* Id: 2
* Credentials: password, smartcard, other
* Reusable credentials in LSA: yes
* Examples: console logon, `runas`

Network:

* Id: 3
* Credentials: password, NT hash, Kerberos ticket
* Reusable credentials in LSA: no (except if delegation is enabled, then Kerberos tickets present)
* Examples: `net`, RPC calls, remote registry, IIS integrated Windows authn, SQL Windows authn, `net use * \\<SERVER>`, MMC, Powershell WinRM (`Enter-PSSession server`), PsExec without explicit creds (`PsExec \\server cmd`)

Batch:

* Id: 4
* Credentials: password
* Reusable credentials in LSA: yes
* Examples: scheduled tasks

Service

* Id: 5
* Credentials: password
* Reusable credentials in LSA: yes
* Examples: Windows services

NetworkCleartext

* Id: 8
* Credentials: password
* Reusable credentials in LSA: yes
* Examples: IIS Basic Authn, PowerShell WinRM with CredSSP (`New-PSSession server -Authentication Credssp -Credential cred`)

NewCredentials:

* Id: 9
* Credentials: password
* Reusable credentials in LSA: yes
* Examples: `runas /network`

RemoteInteractive:

* Id: 10
* Credentials: password, smartcard
* Reusable credentials in LSA: yes
* Examples: Remote Desktop

PsExec with explicit creds (`PsExec \\<SERVER> -u <USER> -p <PASSWORD> cmd`): Network + Interactive. Creates multiple logon sessions.

[Get logon sessions - SysInternals](https://learn.microsoft.com/en-us/sysinternals/downloads/logonsessions)

## Local Account
Local accounts are stored individually on each computer (PC, laptop, server, etc.).
`C:\windows\system32\config\SAM`

## Domain Account
Domain accounts are stored on the Active Directory Domain Controller (AD DC).
`systemroot\NTDS\Ntds.dit`

## NT Hash
The NT hash of the password is calculated using an unsalted MD4 hash algorithm. MD4 is a cryptographic one-way function that produces a mathematical representation of a password. This hashing function is designed to always produce the same result from the same password input, and to minimize collisions where two different passwords can produce the same result. This hash is always the same length and cannot be directly decrypted to reveal the plaintext password. Because the NT hash only changes when the password changes, an NT hash is valid for authentication until a user’s password is changed. This also means that if two accounts use an identical password, they will also have an identical NT password hash.

## LM Hash
LAN Manager (LM) hashes are derived from the user password. Legacy support for LM hashes and the LAN Manager authentication protocol remains in the Windows NTLM protocol suite, but default configurations and Microsoft security guidance have discouraged their use for more than a decade. LM hashes have a number of challenges that make them less secure and more valuable to attackers if stolen:

* LM hashes required a password to be less than 15 characters long and contain only ASCII characters.
* LM Hashes also do not differentiate between uppercase and lowercase letters.

The loss of a LM hash should be considered nearly equivalent to the loss of plaintext password.

## Windows logon cached password verifiers
These verifiers are stored in the registry (HKLM\Security) on the local computer and provide validation of a domain user’s credentials when the computer cannot connect to Active Directory during a user logon. These are not credentials, as they cannot be presented to another computer for authentication. They can only be used to locally verify a credential.

These password verifiers are resistant from brute force attack techniques through the use of a resource intensive validation process. They are also protected against rainbow table attacks through the use of salt values included during their calculation. They cannot be used for credential theft attacks.

## MSRPC
It cannot be blocked. It's always there. It is a basis for many different protocols. Windows services rely heavily on RPC. RPC is very noisy ~ 2m event logs per hour. Because of that it's hard to monitor and detect suspicious activity.

RPC has a filtering feature. It is able to filter specific RPC calls.

RPC consists of different protocols, e.g.:

* [MS-DRSR]: Directory Replication Service Remote Protocol - used to execute DC Sync attack.
* [MS-EFSR]: Encrypting File System Remote Protocol - used to execute PetitPotam attack.
* [MS-NRPC]: Netlogon Remote Protocol - used to execute ZeroLogon attack.
* [MS-SCMR]: Service Control Manager Remote Protocol - used to execute `PsExec` lateral movement.
* [MS-TSCH]: Task Scheduler Service Remoting Protocol - used to execute task scheduling operations (lateral movement as well).

[Great resource of dangerous RPC protocols](https://github.com/jsecurity101/MSRPC-to-ATTACK)

## SYSTEM / Machine Account
When a service runs under the LocalSystem account on a computer that is a domain member, the service has whatever network access is granted to the computer account, or to any groups of which the computer account is a member.Computer accounts typically have few privileges and do not belong to groups. The default ACL protection in Active Directory Domain Services permits minimal access for computer accounts.

## Worth to mention
When in lateral movement I write that something is enabled by default I mean that in workgroup or domain it is enabled by default. Lateral movement without workgroup or domain makes no sense.

## Remote UAC
Remote UAC applies to:

* RPC calls
* WinRM

## RPC research

There are various ways to talk to RPC protocols over the network, including:

### TCP/IP

* ncacn_ip_tcp - TCP protocols uses dynamically assigned or pre-defined ports to communicate with them. Usually they can be handled by firewall separately.

```bash
# Enumerate RPC interfaces accessible via TCP
msfconsole
use auxiliary/scanner/dcerpc/tcp_dcerpc_auditor
```

TCP/IP:
<https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-rpce/95fbfb56-d67a-47df-900c-e263d6031f22>

### Named Pipes

* ncacn_np - Named Pipes via SMB `IPC$` share. These protocols usually are not handled by firewall separately because they use standard SMB named pipes. It is not the case that each named pipe is one RPC protocol. One named pipe is used by multiple RPC interfaces.

```bash
# Enumerate named pipes available via SMB
msfconsole
use auxiliary/scanner/smb/pipe_auditor

# Enumerate RPC interfaces accesible via named pipe
use auxiliary/scanner/smb/pipe_dcerpc_auditor
```

Named pipes:
<https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-rpce/7063c7bd-b48b-42e7-9154-3c2ec4113c0d>

## Service account

An Active Directory (AD) service account is a specific type of service account that exists within a Windows domain environment.

Service account usually doesn't allow interactive logon. It's not associated with any specific user. Service accounts should be granted only the minimum permissions necessary to perform their tasks. This helps to minimize the potential damage if the account is compromised.

Service account is more of a convention. There's no special category for service accounts. To differentiate service accounts from regular users, administrators often use naming conventions, e.g. a specific suffix like `Svc`.

## SPN

SPN (Service Principal Name) is a unqiue identifier of a service available within AD forest. It ties a service instance to a service account in AD. SPN resides within the service account AD object as an attribute.

SPN is created in two ways:

1. Automatic registration: some services (e.g. MSSQL) try to register their SPNs automatically when they are installed.
2. Manual registration (more common): it involves using the built-in `setspn` tool. Example: `setspn -m HTTP/websrv.adlab.local adlab.local\WebSvc` - this command creates an SPN for the HTTP service running on the machine `websrv.adlab.local` using the service account `adlab.local\WebSvc`.

Format of SPN: `<service_class>/<host>:<port>`. The port can be ommited if a standard _service\_class_ is used.
