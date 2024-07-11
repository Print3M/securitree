---
label: NetBIOS
disabled: true
---

# Recon of NetBIOS (139)

TODO:

- Information gathering

## Automated enumeration

```bash
# Enumerate with SMB, RPC and NetBIOS
enum4linux-ng -A $ip
enum4linux-ng -A $ip -u $user -p $pass
```
