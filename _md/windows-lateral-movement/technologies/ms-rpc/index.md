---
label: MS-RPC
---

# Microsoft Remote Procedure Call (MS-RPC) for Lateral Movement

MS-RPC supports a number of interfaces through which the administrator is able to perform various tasks on the system remotely. For example, some of them can create processes and execute administrator commands. We can use this for lateral movement.

There are two basic methods of interacting with RPC interfaces (each interface can support a different method):

- `ncacn_ip_tcp` - access via TCP ports. These protocols (e.g. MS-WMI) use dynamically assigned or pre-defined ports to communicate with them. Usually, **they are handled by firewall separately** and **filtered by default**.
- `ncacn_np` - access via named pipes via SMB `IPC$` share. These protocols (e.g. MS-SCMR) usually are not handled by firewall separately because they use standard SMB named pipes. By default they are not filtered but there is no access to them if SMB is filtered.

## Allow SMB on firewall with PowerShell

To use RPC protocols based on named pipes `IPC$` SMB share must be visible from the network. By default on a Windows client, the firewall blocks incoming SMB connections. We can change this if we have administrative access to the machine.

```powershell
# Allow SMB on firewall
Get-NetFirewallRule -DisplayGroup "File and Printer Sharing" | Where-Object {$_.Name -like "*SMB-In*"} | Enable-NetFirewallRule
```

> **NOTICE**: Windows automatically allows SMB access through the firewall if you share at least one folder.

## References

- [ZetoNetworks.com, _Stopping Lateral Movement via the RPC Firewall_](https://zeronetworks.com/blog/stopping-lateral-movement-via-the-rpc-firewall)
- [jsecurity101, _MSRPC-to-ATTACK_](https://github.com/jsecurity101/MSRPC-to-ATTACK)
