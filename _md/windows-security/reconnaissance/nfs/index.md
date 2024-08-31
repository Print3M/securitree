---
label: NFS
---

# Recon of Network File System (2049)

```bash
# List RPC services (NFS included)
rpcinfo -p $ip

# Metasploit
scanner/nfs/nfsmount

# Automated scan
nmap --script nfs-ls,nfs-showmount,nfs-statfs -p445 $ip

# List NFS shares
showmount -e $ip 

# Mount NFS share to the local filesystem
mount -t nfs $ip:/$share $dest_dir          
```
