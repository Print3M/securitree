# ADLab notes

## Default observations

* There is `adlab\Administrator` domain account in `Domain Admins`, `Schema Admins`, `Enterprise Admins`, `Group Policy Creator`, and local `Administrators` group on DC. There's no other (local-only) Administrator account on DC - only domain one.
* `Domain Admins` are placed in local `Administrators` group on DC.
* There is `krbtgt` in `Domain Users` group.
* There is `Guest` account in domain.
* There is PowerShell AD module on DC. There's no PowerShell AD module on machines.
* `Domain Admins` group is added to local `Administrators` group on every machine in the domain (after domain join). Because of that, any domain admin is local admin as well.
* `ADLAB\hpotter`, `adlab.local\hpotter`, `adlab\hpotter` and even `hpotter` (wihout domain part) works the same. Logon by default uses domain user. If there is two users (local and domain) with the same name, it uses local user and domain part must be specified explictly.
* Local Administrator account on machine is disabled (presence of domain doesn't matter).
* WinRM is enabled on DC (`winrs` works). WinRM is disabled on clients.
* RDP is disabled on DC and clients.
* _Domain Admins_, _Enterprise Admins_, _Administrators_ and _Domain Controllers_ have access to DCSync attack.

Default DC (with AD DS) port scan:

```text
Not shown: 989 filtered tcp ports (no-response)
PORT     STATE SERVICE          REASON
53/tcp   open  domain           syn-ack ttl 128
88/tcp   open  kerberos-sec     syn-ack ttl 128
135/tcp  open  msrpc            syn-ack ttl 128
139/tcp  open  netbios-ssn      syn-ack ttl 128
389/tcp  open  ldap             syn-ack ttl 128
445/tcp  open  microsoft-ds     syn-ack ttl 128
464/tcp  open  kpasswd5         syn-ack ttl 128
593/tcp  open  http-rpc-epmap   syn-ack ttl 128
636/tcp  open  ldapssl          syn-ack ttl 128
3268/tcp open  globalcatLDAP    syn-ack ttl 128
3269/tcp open  globalcatLDAPssl syn-ack ttl 128
```

Default DC SMB shares (POV non-admin domain user):

```text
ADMIN$               NO ACCESS       Remote Admin
C$                   NO ACCESS       Default share
IPC$                 READ ONLY       Remote IPC
NETLOGON             READ ONLY       Logon server share 
SYSVOL               READ ONLY       Logon server share
```

Default machine before domain connection port scan:

```text
Not shown: 999 filtered tcp ports (no-response)
PORT     STATE SERVICE REASON
5357/tcp open  wsdapi  syn-ack ttl 128
```

Default machine after domain connection port scan:

```text
135/tcp  open  msrpc   syn-ack ttl 128
2869/tcp open  icslap  syn-ack ttl 128
```

Default machine SMB shares:

```text
There is not SMB shares by default.
```

* On client machine: SMB is not allowed on firewall. The firewall exception is enabled when new share is created.

## Things to research

[ ] Mimikatz.exe LSASS with domain users
[ ] Double-hop problem and domain operations
[ ] PowerView without AD Module
[ ] Python alternatives to SharpHound and PowerView
[ ] PowerUp default errors (on machine).
[ ] What is possible blind - without SMB/WinRM/RDP?
    - [ ] Blind remote: enable SMB and WinRM firewall rules.