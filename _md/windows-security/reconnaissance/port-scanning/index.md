---
label: Port Scanning
---

# Port Scanning

```bash
nmap
    192.168.0.1-255         # Scan range of IPs
    -iL $file               # Hosts from file
    -p $ports               # Specify ports (range: 1-1000, single: 1,2,3)
    --top-ports=20          # Scan 20 most common ports
    -O                      # Enable OS detection
    -sV                     # Enable service version discovery
    -sC                     # Enable predefined set of common enum scripts
    --script $script        # Enable specific enum scripts
    -Pn                     # Disable ping before port scan
    -oG $file               # Save grepable output to a file
    -vv                     # Maximum output verbosity

    # Types of scans
    -sT                     # TCP CONNECT scan (default)
    -sS                     # TCP SYN scan (fastest)
    -sU                     # UDP scan
    -sP                     # PING scan (host discovery)
    -sn                     # Host discovery only (without any port scan)

    # Speed
    -T4                     # Fast scanning (more detectable)
    --max-retries 3         # Maximum number of retries per port

# Common snippet
sudo nmap -sS -p- -sV -sC -T4 --max-retries 3 -vv $ip

# List all nmap scripts
ls /usr/share/nmap/scripts/
```

All `nmap` enumeration scripts can be found at `/usr/share/nmap/scripts/` on Kali Linux. Execute them comma-separated with `nmap --script` parameter without the `.nse` suffix (e.g. `nmap --script smb-os-discovery,smb-enum-domains`).

Windows:

```powershell
# Scan single port
Test-NetConnection -Port $port $ip

# Scan multiple ports (1-1024)
1..1024 | % {echo ((New-Object Net.Sockets.TcpClient).Connect("$ip", $_)) "TCP port $_ is open"} 2>$null
```
