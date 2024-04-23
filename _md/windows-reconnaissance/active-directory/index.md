---
label: Active Directory
disabled: true
---

# Reconnaissance of Active Directory environment

## AD graph visualization with BloodHound

Check out all SharpHound flags: [documentation](https://bloodhound.readthedocs.io/en/latest/data-collection/sharphound-all-flags.html).

Look for collectors compatible with your BloodHound version in `<BloodHound_path>/Collectors/*`.

Run data collector on Windows machine:

```powershell
# Run data collector
.\SharpHound.exe --CollectionMethods All --ZipFileName loot.zip
```

Start BloodHound on Linux:

```bash
# Neo4j DB must be working
sudo neo4j console
bloodhound
```

Click `Upload Data` button and select `.zip` file with the collected data.
