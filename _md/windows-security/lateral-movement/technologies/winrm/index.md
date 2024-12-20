---
label: WinRM
subLabel: (winrs, PS Remoting)  
---

# WinRM (Windows Remote Managament) for Lateral Movement

> **Requirements**:
>
> * Credentials (password, NT hash, Kerberos TGT) of a member of the local **Administrators** or **Remote Management Users** group on the target machine.
> * WinRM enabled on target host (enabled by default on Windows Server, disabled by default on client Windows).
> * WinRM allowed on firewall (allowed by default).

WinRM is enabled by default on Windows Server 2012 and above. It's disabled by default on client Windows. All of the WinRM communication is over a single port (5985/TCP for HTTP, 5986/TCP for HTTPS).  Logon via WinRM is of the **Network type** (no reusable credentials). However, in Windows built-in tooling there's a way to delegate credentials to established session (below). By default, if you want to use WinRM, you need to be a **local administrator** on the target machine.

Linux:

```bash
# Using password
evil-winrm -i $host -u "$domain\\$user" -p $password

# Using NT hash
evil-winrm -i $host -u "$domain\\$user" -H $nt_hash

# TODO: Using Kerberos TGT
```

Windows ([winrs](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/winrs)):

> **IMPORTANT**: Using `winrs` the `-r` parameter must be provided as **hostname**, not an IP address.  

```powershell
# Using password
winrs -r:$hostname -u:$domain\$username -p:$password "cmd.exe"

# Using Kerberos TGT (in-memory)
winrs -r:$hostname "cmd.exe"
```

{/*TODO: winrs /allowdelegate*/}

## PowerShell Remoting

Powershell has built-in ability to run commands remotely on different machines - so-called PowerShell Remoting feature. It's achived using WinRM protocol under the hood. It's commonly used in enterprise management tasks so it's not very suspicious.

Windows:

```powershell
# Using password
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force;
$credentials = New-Object System.Management.Automation.PSCredential $username, $securePassword;
Enter-PSSession -Computername $host -Credential $credentials

# Using Kerberos TGT (in-memory)
Enter-PSSession -ComputerName $host
```

{/*TODO: Powershell Remoting with CredSSP*/}

## Enable WinRM with PowerShell

If you have administrative access to the machine (e.g. via SmbExec or RDP) you can activate WinRM with PowerShell.

```powershell
# All configuration at once (it might take a while)
Enable-PSRemoting
```

## Resources

* [Doctor Scripto, *Enable PowerShell "Second-Hop" Functionality with CredSSP*](https://devblogs.microsoft.com/scripting/enable-powershell-second-hop-functionality-with-credssp/)
* [Microsoft, *Making the second hop in PowerShell Remoting*](https://learn.microsoft.com/en-us/powershell/scripting/learn/remoting/ps-remoting-second-hop?view=powershell-7.4)
