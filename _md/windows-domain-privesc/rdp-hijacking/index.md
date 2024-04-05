---
label: RDP Hijacking
---

# RDP Session Hijacking

> **Requirements**
>
> Compromised SYSTEM user on Windows machine.
> Established RDP sessions of potential victims.

With `NT AUTHORITY/SYSTEM` privileges, we are able to **take over the RDP session of any other user logged on to our system without providing any credentials**. This attack can lead to the hijacking of a domain admin session.

**There is a difference between logging off and disconnecting from RDP.** If the user logs out, the RDP session is closed and it's over. If a user disconnects by, for example, closing an RDP window (a very common case), his session is still present on the system and he can return to it. With RDP Hijacking, we hunt for those disconnected (but still logged-in) sessions that we can take over.

It is also possible to take over the user's active session, (i.e. the one he is currently working on) but typically a user is notified when someone else is trying to steal their session.

```powershell
# List all sessions with IDs
query user

# NOTE: State: DISC is the one we're looking for.

# Switch to session by ID
tscon $id
```

## References

* [Red Team Notes 2.0, _RDP Hijacking_](https://dmcxblue.gitbook.io/red-team-notes-2-0/red-team-techniques/lateral-movement/t1563-remote-service-session-hijacking/rdp-hijacking)
