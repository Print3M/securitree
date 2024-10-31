---
label: Information to steal
subLabel: (files, logs, processes, ...) 
---

# Information to steal

## Local machine

### Users and groups

```powershell
# Show current user
whoami /all

# List local users
Get-LocalUser
net user

# Show user's groups
Get-LocalUser $user
net user $user

# List local groups
Get-LocalGroup
net localgroup

# List members of local group
Get-LocalGroupMember $group
net localhroup $group 
```

### Operating System

```powershell
# Show basic info about OS
systeminfo

# Show network interfaces
ipconfig /all

# Show local routing table
route print

# List TCP ports
netstat
  -a                                        # List listening ports only
  -b                                        # Show assigned binary
  -n                                        # Do not resolve IP
  -o                                        # Show PID
```

### Processes and software

```powershell
# List 32-bit installed application
Get-ItemProperty "HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*" | select displayname

# List 64-bit installed applications
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*" | select displayname

# List installed software
wmic product get name,version,vendor

# List running processes
Get-Process | select id,name,path,description
```

> **IMPORTANT**: The installed software may save sensitive data in logs, configuration files or the Windows registry. Look closely. Password managers, SSH clients (e.g. Putty), FTP clients, RDP clients often store credentials somewhere.

### Services

```powershell
# Get list of running services
Get-CimInstance -ClassName win32_service | Select Name,State,PathName | Where-Object {$_.State -like 'Running'}

# Check ACLs of a file
icacls $path
```

### PowerShell history

```powershell
# List history of PowerShell
Get-History
```

Most Administrators use the `Clear-History` to clear the PowerShell history. But this cmdlet is only clearing PowerShell's own history, which can be retrieved with Get-History. Starting with PowerShell v5, a module named `PSReadline` is included, which is used for line-editing and command history functionality. Interestingly, Clear-History does not clear the command history recorded by PSReadline. PSReadline history can be retrieved.

```powershell
# Get path of PSReadline history file
(Get-PSReadlineOption).HistorySavePath
```

Another interesting command is `Start-Transcript` which starts a PowerShell Transcription and basically dumps everything executed in a PowerShell session to a file. This command contains the path where the transcript file is stored. This transcription file can be also read but there's no easy way to get its path.

There's also a feature called `Script Block Logging`. If enabled, it generates events with PowerShell commands of ID 4104.

```powershell
# Dump PowerShell logging events to file
Get-WinEvent Microsoft-Windows-PowerShell/Operational | Where-Object Id -eq 4104 | %{ $_.ToXml() } | Out-File $output_path
```

### Files to loot

```powershell
C:\Users\$user\Desktop                      # Desktop
C:\Users\$user\Downloads                    # Downloads
C:\Users\$user\Desktop                      # Documents

C:\Windows\System32\drivers\etc\hosts       # /etc/hosts
C:\inetpub\logs\LogFiles\W3SVC1\            # IIS logs
C:\inetpub\wwwroot\web.config               # IIS config
C:\xampp\apache\logs\                       # XAMPP logs
C:\xampp\passwords.txt                      # XAMPP credentials
```

### Searching for interesting files

```powershell
# Find .txt and .ini XAMPP files
Get-ChildItem -Path C:\xampp -Include *.txt,*.ini,*.log -File -Recurse -ErrorAction SilentlyContinue

# Find interesting user's files
Get-ChildItem -Path C:\Users\ -Include *.log,*.txt,*.pdf,*.xls,*.xlsx,*.doc,*.docx,*.msg,*ini -File -Recurse -ErrorAction SilentlyContinue
```

### Password managers

One interesting type of file is password manager databases. Probably the most popular is KeePass with `.kdbx` extension. From such a file you can then extract the hash (`keepass2john`) and crack it offline.

```powershell
# Find .kdbx files
Get-ChildItem -Path C:\ -Include *.kdbx -File -Recurse -ErrorAction SilentlyContinue
```

### Automated scanning

There are plenty of tools to automate enumeration and security scanning:

- [WinPeas](https://github.com/peass-ng/PEASS-ng/tree/master)
- [Seatbelt](https://github.com/GhostPack/Seatbelt)

## Active Directory

### Users and groups

Built-in options:

```powershell
# List domain users
net user /domain

# Show info about domain user
net user $user /domain

# Show account password policies
net accounts

# List domain groups
net group /domain

# Show info about domain group
net group $group /domain
```

It's also possible to execute raw LDAP query using `LDAPSearch` but it might be difficult.

> Raw LDAP queries can be difficult to understand. Here's a source on how to create your own: [_SpecterOps.io, An Introduction to Manual Active Directory Querying_](https://posts.specterops.io/an-introduction-to-manual-active-directory-querying-with-dsquery-and-ldapsearch-84943c13d7eb).

```powershell
LDAPSearch -LDAPQuery "$query"
```

Extensions:

Advanced PowerShell cmdlets like `Get-ADUser` are only installed by default on domain controllers as part of the Remote Server Administration Tools (RSAT). RSAT is very rarely present on clients in a domain and we must have administrative privileges to install them. If the RSAT is present, execute `import-module ActiveDirectory` to load the AD module to PS session.

However, we can download Active Directory module files from GitHub ([link](https://github.com/samratashok/ADModule)) and load them into the current session without administrator privileges.

```powershell
# Load Active Directory module
Import-Module C:\path\Microsoft.ActiveDirectory.Management.dll
Import-Module C:\path\ActiveDirectory\ActiveDirectory.psd1

# Try if everything works
Get-ADDomain
```

Another popular option is the `PowerView` ([link](https://github.com/PowerShellMafia/PowerSploit/blob/master/Recon/PowerView.ps1)) PowerShell script, which includes many useful functions to execute AD enumeration.

```powershell
# Import PowerView module
Import-Module .\PowerView.ps1

# Verify
Get-NetDomain -Verbose
```

### User sessions

Obtain information which user is logged in to which computer using `NetSessionEnum` WinAPI function. Most probably regular domain users are not able to execute this function anymore on Windows 11.

PowerShell (PowerView):

```powershell
# Enumerate user sessions on machine
Get-NetSession -ComputerName $machine_name -Verbose
```

Another option is to use [PsLoggedOn](https://learn.microsoft.com/en-us/sysinternals/downloads/psloggedon) executable from `SysInternals Suite`. It works calling `Remote Registry` service (via RPC named pipes) on a target machine. The Remote Registry service has not been enabled by default since Windows 8, but system administrators may enable it for administrative tasks. It is enabled by default on later Windows Servers such as Server 2012, 2016, 2019, 2022.

```powershell
.\PsLoggedon.exe \\$machine_name
```

### Machines

PowerShell (PowerView):

```powershell
# List domain machines and operating systems 
Get-NetComputer | select dnshostname,operatingsystem,operatingsystemversion
```

### Service accounts and Service Principal Name (SPN)

Information about SPNs is stored in AD, it is present on the domain controller. Since service accounts are used to run services, we can assume that they have more privileges than regular domain user accounts. To enumerate SPNs in the domain, we have multiple options. One of them is usage of built-in Windows tool:

```powershell
# Find SPN linked to a user
setspn -L $domain_user

# Find SPN linked to a machine
setspn -L $machine
```

PowerShell (PowerView):

```powershell
# Enumerate service users and SPNs
Get-NetUser -SPN | select samaccountname,serviceprincipalname
```

### Domain shares

PowerShell (PowerView):

```powershell
# Find all shares in the domain
Find-DomainShare -Verbose

# Find only accessible shares
Find-DomainShare -CheckShareAccess -Verbose

# List share content
ls \\$machine\$dir\
```
