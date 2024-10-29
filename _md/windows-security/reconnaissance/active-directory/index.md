---
label: Active Directory
---

# Recon of Active Directory environment

## BloodHound

BloodHound is a GUI program used to visualize relations between objects in the Active Directory domain. It can indicate potential attack paths, misconfigurations and weaknesses in the domain. It presents AD objects in the form of interactive graphs. It works based on the Neo4j database.

Start BloodHound on Linux:

```bash
# Neo4j DB must be working
sudo neo4j console
bloodhound
```

Click `Upload Data` button and select `.zip` file with the collected data.

If your project is not empty you have to clear the database:

1. Go to neo4j GUI: `http://localhost:7474/browser/`
2. Execute command: `MATCH (n) DETACH DELETE n`

> **IMPORTANT**: When you use collectors pay special attention to run all data collection methods!

## SharpHound

Check out all SharpHound flags: [documentation](https://bloodhound.readthedocs.io/en/latest/data-collection/sharphound-all-flags.html).

Look for collectors compatible with your BloodHound version in `<BloodHound_path>/Collectors/*`.

Run data collector on Windows machine:

```powershell
# Run data collector
.\SharpHound.exe --CollectionMethods All --ZipFileName loot.zip
```

## SharpHound alternatives

Collectors shipped with BloodHound were designed to run on Windows, but the community has written many of custom collectors that run from Linux.  

- [BloodHound.py](https://github.com/dirkjanm/BloodHound.py)

```bash
# Collect data and save to ZIP file
python -m bloodhound -u $user -p $pass -d $domain -dc $dc_fqdn -ns $dc_ip -c All --zip
```

{/*TODO: Raw Get-ADObject, Raw*/}
