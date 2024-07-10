---
label: SNMP
disabled: true
---

# SNMP

`public` is common default "public string" for SNMP service.

```powershell
snmp-check <ip> -c <pub-string>             # Nice-looking enumeration      
snmpwalk -v <ver> -c <pub-string> <ip> -m + # Enumerate MIB data
[...] NET-SNMP-EXTEND-MBI::nsExtendObjects  # Detect SNMP extend
```