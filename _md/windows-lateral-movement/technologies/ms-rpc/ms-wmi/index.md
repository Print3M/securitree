---
label: MS-WMI
subLabel: (WmiExec, wmic)
disabled: true
---

# MS-WMI: Windows Management Instrumentation Remote Protocol

> **Requirements**
>
> * Credentials (password, NT hash, Kerberos TGT) of a member of the local **Administrators** group on the target machine.
> * WMI allowed on firewall (by default: allowed on DC, disallowed on client machine)

Remote WMI is commonly used for network administration so it's quite common to see it unfiltered on an internal network.

The initial WMI communications use TCP port 135 and afterwards a random port is negotiated. Since WMI and RPC services are often used for remote administration and administration tools, it is common to see these ports open and unfiltered on internal networks.

```powershell
# Get WMI service status
Get-Service Winmgmt
```

* It works when firewall Windows Management Instrumentation exception enabled.
* Logon: Network
* Windows Server 2008 introduced an improved version of the Windows Firewall as enabled and running by default. As part of that default configuration, DCOM connections to a Windows 2008 server are blocked.

Linux:

```bash
# Using NT
impacket-wmiexec $domain/$user:$password@$host
```

Windows:

> **IMPORTANT**: Built-in `wmic` has not been available since Windows 11.

```powershell
# Using Kerberos TGT
wmic /authority:”kerberos:CORP\WIN8WORKSTATION” /node:172.16.48.83 process call create “stuff”
```

## Resources

* [Microsoft, _User Account Control and WMI_](https://learn.microsoft.com/en-us/windows/win32/wmisdk/user-account-control-and-wmi)
* [Crowdstrike, _Defense Against the Lateral Arts: Detecting and Preventing Impacket's Wmiexec_](https://www.crowdstrike.com/blog/how-to-detect-and-prevent-impackets-wmiexec/)
* [Philip Tsukerman, _Expanding Your WMI Lateral Movement Arsenal_](https://www.youtube.com/watch?v=RRc_3c5diC4)

## TODO

* WMI Event Subscription (lateral movement technique)