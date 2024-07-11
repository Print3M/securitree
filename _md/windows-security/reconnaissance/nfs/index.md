---
label: NFS
disabled: true
---

# Recon of Network File System (2049)

TODO:

- enumeration
- mount

```bash
# List RPC services (NFS included)
rpcinfo -p $ip

# Metasploit
scanner/nfs/nfsmount

# Automated scan
nmap --script nfs-ls,nfs-showmount,nfs-statfs -p445 $ip

showmount -e <ip>                           # List NFS shares
mount -t nfs <ip>:/<share> <dest-dir>       # Mount NFS share
```
