---
label: Pass the Key
---

# Pass the Key

```powershell
# Using password
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force;
$credentials = New-Object System.Management.Automation.PSCredential $username, $securePassword; New-Object System.Management.Automation.PSCredential $username, $securePassword; New-Object System.Management.Automation.PSCredential $username, $securePassword; New-Object System.Management.Automation.PSCredential $username, $securePassword; 
Enter-PSSession -Computername $host -Credential $credentials

# Using Kerberos TGT (in-memory)
Enter-PSSession -ComputerName $host
```