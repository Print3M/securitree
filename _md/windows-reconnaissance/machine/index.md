---
label: Machine Recon
subLabel: (blackbox)
---

# Reconnaissance of Windows machine (blackbox)

## MS-RPC

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

## SMB

```bash
# Enumerate SMB shares and privileges
smbmap -H //$ip -u $domain/$user -p $password

# Connect to SMB share
smbclient //$ip/$share -U "$DOMAIN\\$user%$pass"
```

{/*TODO: PortScan, NFS, NetBIOS, Domain Name, Local user enumeration*/}