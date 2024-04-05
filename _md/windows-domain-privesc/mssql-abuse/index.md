---
label: MSSQL Abuse
disabled: true
---

# MSSQL database abuse

## Trusted links

```powershell
# Enumerate SQL servers in the domain
Get-SQLInstanceDomain | Get-SQLServerInfo -Verbose

# Crawl database links automatically
Get-SQLServerLinkCrawl -Instance $sql_server_fqdn -Verbose
```
