---
label: MOTW
---

# Mark Of The Web (MOTW)

MOTW officially stands for _Zone Identifier Alternate Data Stream_.

When downloading a file, software (with MOTW-support) creates an Alternative Data Stream (ADS - some kind of NTFS file attribute) named `Zone.Identifier` and adds a `ZoneId` to this stream in order to indicate from which zone the file originates. Nowadays all major software on the Windows platform that deals with attachments or downloads files generates a `Zone.Identifier` ADS, including Edge, Outlook, Chrome, FireFox, etc.

```powershell
# Show Zone.Identifier stream of a file
Get-Content $file -Stream Zone.Identifier
```

The following `ZoneId` values may be used in a `Zone.Identifier` ADS:

1. Local computer
2. Local intranet
3. Trusted sites
4. Internet
5. Restricted sites

The information from the Zone Identifier is used by Windows, MS Office and various other programs to trigger security features, e.g. disable some functionalities or show a popup with warning. The actual behavior depends on the specific software implementation.

Based on MOTW, Windows blocks the execution of Office VBA macros downloaded from the internet.  

## References

* [Outflank, _Mark-of-the-Web from a Red Team’s Perspective_](https://www.outflank.nl/blog/2020/03/30/mark-of-the-web-from-a-red-teams-perspective/)
