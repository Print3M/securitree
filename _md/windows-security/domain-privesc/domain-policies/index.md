---
label: Group Policies
---

# Group Policies (GPO)

It is always a good idea to check SYSVOL domain shares (they are available by default). By default, the SYSVOL folder is mapped to `%SystemRoot%\SYSVOL\Sysvol\<domain_name>` on the domain controller and every domain user has access to it.

There might be interesting domain policies or old backup policies readable in shares like `\\<machine>\sysvol\<domain>\Policies\`.  Old policies are common artifacts on domain shares as system administrators often forget them when implementing new policies. Old policies might be helpful for learning more about the current policies.

## GPP Password

The XML file with old policies might include encrypted passwords. Historically, system administrators often changed local workstation passwords through Group Policy Preferences (GPP). However, even though GPP-stored passwords are encrypted with AES-256, the private key for the encryption has been posted on MSDN so it's already compromised.

Interesting line within XML file might look like this:
`cpassword="+bsY0V3d4/KgX3VJdO/vyepPfAN1zMFTiQDApgR92JE"`

Kali:

```bash
# Decrypt GPP password
gpp-decrypt $encrypted_password
```

## GPO Abuse

In a situation where an ordinary domain user has broad permissions (e.g. `GenericWrite`) on a GPO that affects, for example, a Domain Admins group or other valuable object we are able to abuse that GPO using [SharpGPOAbuse.exe](https://github.com/FSecureLABS/SharpGPOAbuse).

> **NOTE**: This type of misconfiguration can be detected by BloodHound or scripts like PowerView.

Windows (example usage):

```powershell
# Abuse GPO (Add User to local Administrators)
./SharpGPOAbuse.exe --AddLocalAdmin --UserAccount $user --GPOName $gpo

# Update policies
gpupdate /force

# It might be necessary to logout and logon once again
```
