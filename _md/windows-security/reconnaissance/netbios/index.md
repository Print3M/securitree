---
label: NetBIOS
---

# Recon of NetBIOS (139)

```bash
# Scan subnet for NetBIOS hosts
nbtscan -r 192.168.0.0/24
```

## Automated enumeration

```bash
# Enumerate with SMB, RPC and NetBIOS
enum4linux-ng -A $ip
enum4linux-ng -A $ip -u $user -p $pass
```
