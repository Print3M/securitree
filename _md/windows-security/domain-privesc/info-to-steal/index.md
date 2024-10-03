---
label: Information to steal
subLabel: (files, logs, processes, ...) 
---

# Information to steal

## Users and groups

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

## Operating System

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

## Processes and software

```powershell
# List 32-bit installed application
Get-ItemProperty "HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*" | select displayname

# List 64-bit installed applications
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*" | select displayname

# List running processes
Get-Process | select id,name,path,description
```

## PowerShell history

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

## Files to loot

```bash
C:\Windows\System32\drivers\etc\hosts       # /etc/hosts
C:\inetpub\logs\LogFiles\W3SVC1\            # IIS logs
C:\inetpub\wwwroot\web.config               # IIS config
C:\xampp\apache\logs\                       # XAMPP logs
C:\xampp\passwords.txt                      # XAMPP credentials
```

### Searching for interesting files

```powershell
# Find .txt and .ini XAMPP files
Get-ChildItem -Path C:\xampp -Include *.txt,*.ini -File -Recurse -ErrorAction SilentlyContinue

# Find interesting user's files
Get-ChildItem -Path C:\Users\ -Include *.txt,*.pdf,*.xls,*.xlsx,*.doc,*.docx,*.msg,*ini -File -Recurse -ErrorAction SilentlyContinue
```

### Password managers

One interesting type of file is password manager databases. Probably the most popular is KeePass with `.kdbx` extension. From such a file you can then extract the hash (`keepass2john`) and crack it offline.

```powershell
# Find .kdbx files
Get-ChildItem -Path C:\ -Include *.kdbx -File -Recurse -ErrorAction SilentlyContinue
```
