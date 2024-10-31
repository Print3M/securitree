---
label: SNMP
---

# Recon of SNMP (UDP: 161 / 162)

The _Simple Network Management Protocol_ (SNMP) is not well-understood by many network administrators. This might result in **SNMP misconfigurations and significant information leaks**. It's based on UDP.

> **NOTE**: The commonly used SNMP versions `1`, `2`, and `2c` offer no traffic encryption. SNMP information and credentials can be easily intercepted over a local network.

**The SNMP _Management Information Base_ (MIB) is a database** containing information usually related to network management. It's organized like a tree, with branches that represent different organizations or network functions. The leaves of the tree (final endpoints) correspond to specific variable values that can then be read by an external user. [Here's the IBM explanation of MIB tree](https://www.ibm.com/docs/en/aix/7.2?topic=management-information-base).

## SNMP Discovery

```bash
sudo nmap -sU -p161,162,10161,10162 -vv 192.168.193.145

# Scan a subnet for SNMP services 
onesixtyone 192.168.1.1/24
```

## Brute-force community string

SNMP have weak authentication schemes and are commonly left configured with default public and private community strings. **The community string is a sort of a password effectively**. `public` is the most common read-only _community string_. `private` is the most common admin _community string_. **Different community strings can give different levels of access via SNMP.**

[SecLists have pretty good wordlists](https://github.com/danielmiessler/SecLists/tree/master/Discovery/SNMP) for SNMP community string bruteforcing.

```bash
# Discover SNMP on hosts and bruteforce community string
onesixtyone -c $wordlist_file -i $hosts_file
```

## Enumerate SNMP data

> **NOTE**: MIB might contain hex values. Use `snmpwalk` with `-Oa` param to translate any hex string into ASCII.

```bash
# Enumerate MIB data
snmpwalk -v 1 -c $community_string $ip

# Extended data
snmpwalk -v 1 -c $community_string $ip -m +

# Nice-looking enumeration
snmp-check $ip -c $community_string   
```

## Interesting MIB OIDs

_OID_ stands for _Object ID_ and it's unique identifier (key) of value in a MIB tree.

```bash
snmpwalk -v 1 -c $community_string $ip $oid

# Interesting OIDs (Windows)
1.3.6.1.4.1.77.1.2.25       # Users
1.3.6.1.2.1.25.4.2.1.2      # Running processes
1.3.6.1.2.1.25.6.3.1.2      # Installed software
1.3.6.1.2.1.6.13.1.3        # TCP listening ports
```
