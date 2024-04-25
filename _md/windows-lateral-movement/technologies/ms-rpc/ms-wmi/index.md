---
label: MS-WMI
subLabel: (WmiExec)
---

# MS-WMI: Windows Management Instrumentation Remote Protocol

> **Requirements**
>
> * Credentials (password, NT hash, Kerberos TGT) of a member of the local **Administrators** group on the target machine.
> * WMI allowed on firewall (by default: allowed on server, filtered on client machine).

WMI protocol is commonly used for remote machine administration tasks. WMI is accessed via negotiated TCP port (not a named pipe). It is separately handled by firewall rule. Logon via WMI is of the **Network type** (no reusable credentials).

Linux:

```bash
# Using password
impacket-wmiexec $domain/$user:$password@$host

# Using NT hash
impacket-wmiexec -hashes :$nt_hash $domain/$user@$host

# Using Kerberos TGT
export KRB5CCNAME=$tgt_ccache_file
impacket-wmiexec $hostname -k -no-pass -dc-ip $dc_ip
```

Windows:

> **IMPORTANT**: Built-in `wmic` has not been available since Windows 11.

WMI is very powerful. It can manage processes, services and scheduled tasks. Here I will show only a very basic use to create a process on a remote host. Note that firing this command will not return output. We need to save the output to a file and download it through another channel (e.g. via SMB).

```powershell
# Using password
wmic /user:$domain\$user /password:$password /node:$host process call create "cmd.exe /c whoami.exe > C:\output.txt"

# Using Kerberos TGT (in-memory)
wmic /node:$host process call create $command
```

Keep in mind that there is a lof of techniques for executing code on a remote host using WMI and new ones are being discovered all the time.

## Enable WMI

```powershell
# Enable firewall rules
netsh advfirewall firewall set rule group="windows management instrumentation (wmi)" new enable=yes
```

## Resources

* [Microsoft, _User Account Control and WMI_](https://learn.microsoft.com/en-us/windows/win32/wmisdk/user-account-control-and-wmi)
* [Crowdstrike, _Defense Against the Lateral Arts: Detecting and Preventing Impacket's Wmiexec_](https://www.crowdstrike.com/blog/how-to-detect-and-prevent-impackets-wmiexec/)
* [Philip Tsukerman, _Expanding Your WMI Lateral Movement Arsenal_](https://www.youtube.com/watch?v=RRc_3c5diC4)
* [Raj Chandel, _Lateral Movement: WMI_](https://www.hackingarticles.in/lateral-movement-wmi/)
