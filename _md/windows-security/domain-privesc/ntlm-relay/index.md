---
label: NTLM Relay
disabled: true
---

# NTLM Relay

> **Requirements**:
>
> * LLMNR or NBT-NS is enabled
> * SMB signing is not required

We have access to `PC-01` as an unprivileged user, which means we cannot run Mimikatz to extract passwords. Using NTLM hash stealing we can obtain NTLMv2 Hash but it's to hard to crack. Let's assume the user is administrator on `PC-02`. Therefore, we can try to use the hash on another machine (without cracking it) in what is known as a **relay attack**. If the relayed authentication is from a user with local administrator privileges, we can use it to authenticate and then execute commands using e.g. PsExec or WMIExec.

Linux:

```bash
# Run NTLM Relay listener
impacket-ntlmrelayx -smb2support -t $target_ip -c $command
```

After setting up the listener, perform NTLM Hash Stealing to the attacker machine and the listener (`ntlmrelayx`) itself will forward the captured NTLMv2 Hash to the target, executing provided command (`-c`). You want this command to be probably a reverse shell or something like that.

## Resources

* [WarRoom, _Back To Basics: NTLM Relay_](https://warroom.rsmus.com/how-to-perform-ntlm-relay/)
