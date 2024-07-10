---
label: LDAP
---

# LDAP

To retrieve an AD object or sub-objects so-called [Distinguished Names (DN)](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ldap/distinguished-names) are used to identify the object.

> Raw LDAP queries can be difficult to understand. Here's a source on how to create your own: [_SpecterOps.io, An Introduction to Manual Active Directory Querying_](https://posts.specterops.io/an-introduction-to-manual-active-directory-querying-with-dsquery-and-ldapsearch-84943c13d7eb).

## Anonymous bind

Anonymous LDAP Binding allows a client to connect and search AD without logging in. Typically, a root DSE enumeration is allowed for anonymous connections. However, extended LDAP queries to AD without authentication should be disabled, as they represent a potentially serious threat and data leak.

```bash
# Enumerate root DSE
ldapsearch -H ldap://$ip:389/ -x -s base -b "" "(objectClass=*)" "*" +

# Get sub-objects of DN object
ldapsearch -H ldap://$ip:389/ -x -s sub -b "$object_DN" "(objectClass=*)" "*" +
```

## Authenticated bind

```bash

# Get sub-objects of DN object
ldapsearch -H ldap://$ip:389/ -x -D "$domain\\$user" -w $pass -s sub -b "$object_DN" "(objectClass=*)" "*" +
```

## Automatic scans

```bash
# Enumerate AD data via LDAP
nmap --script ldap-rootdse,ldap-search $ip
```
