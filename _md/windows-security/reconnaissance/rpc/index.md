---
label: RPC
---

# Recon of RPC

## Anonymous connection

Anonymous RPC connection means no username and no password provided. Unauthenticated connection to RPC is possible ([documentation](https://learn.microsoft.com/en-us/windows-server/security/rpc-interface-restrict#configuring-restrictremoteclients)), but the amount of information we can collect this way is limited. Anonymous connection can be disabled.

```bash
# Connect anonymously
rpcclient -U "%" $ip
```

## Authenticated connection

```bash
# Connect with credentials
rpcclient -U "$domain\\$user%$pass" $ip
> ?                           # List all commands
> srvinfo                     # Server info
> enumdomusers                # Enum users
> enumdomgroups               # Enum groups
> enumdomains                 # Enum domains
> netshareenumall             # Enum SMB shares
> queryuser <username>        # Get detailed user's info
> lookupnames <username>      # Get SID of user
> querygroup <group_rid>      # Get group info
> enumprivs                   # Enum current users' privileges
> getusername                 # Get current username
```

More useful commands can be found here: [_HackingArticles.in, Active Directory Enumeration: RPCClient_](https://www.hackingarticles.in/active-directory-enumeration-rpcclient/).

## Automated enumeration

```bash
# Enumerate with SMB, RPC and NetBIOS
enum4linux-ng -A $ip
enum4linux-ng -A $ip -u $user -p $pass
```

## Interfaces

Via TPC ports (`ncacn_ip_tcp` protocol):

```bash
# Enumerate RPC interfaces accessible via TCP
msfconsole
> use auxiliary/scanner/dcerpc/tcp_dcerpc_auditor
```

Via named pipes (`ncacn_np` protocol):

```bash
# Enumerate named pipes available via SMB
msfconsole
> use auxiliary/scanner/smb/pipe_auditor

# Enumerate RPC interfaces accesible via named pipe
> use auxiliary/scanner/smb/pipe_dcerpc_auditor
```
