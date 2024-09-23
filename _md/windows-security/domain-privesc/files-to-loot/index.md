---
label: Files to loot
---

# Files to loot

## Juicy files

```bash
C:\Windows\System32\drivers\etc\hosts       # /etc/hosts
C:\inetpub\logs\LogFiles\W3SVC1\            # IIS logs
C:\inetpub\wwwroot\web.config               # IIS config
C:\xampp\apache\logs\                       # XAMPP logs
C:\xampp\passwords.txt                      # XAMPP credentials
```

## Password managers

One interesting type of file is password manager databases. Probably the most popular is KeePass with `.kdbx` extension. From such a file you can then extract the hash (`keepass2john`) and crack it offline.

```powershell
# Find .kdbx files
Get-ChildItem -Path C:\ -Include *.kdbx -File -Recurse -ErrorAction SilentlyContinue
```
