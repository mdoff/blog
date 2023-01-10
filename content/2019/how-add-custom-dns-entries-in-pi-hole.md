---
title: How add custom DNS entries in pi-hole
date: 2019-10-13 18:20:11
tags: [raspberry, ssh, raspbian]
description: "Adding custom DNS entries in pi-hole in an easy way"
aliases:
  - /2019/how-add-custom-dns-entries-in-pi-hole
---

Currently UI does not provide this function, unless you have enabled DHCP server, then you can assign local ip addresses to custom domain names.

To have ability to add various custom names to DNS server I followed advice from [this comment](https://github.com/pi-hole/pi-hole/issues/975#issuecomment-281027117) on github.

I created file `/etc/dnsmasq.d/03-custom-dns-names.conf` and put there all my custom domains.

```
address=/server.lan/192.168.1.12
address=/smart-switch.lan/192.168.1.10
```

[Other comment](https://github.com/pi-hole/pi-hole/issues/975#issuecomment-524199173) suggested usage of command line tool, but solution with custom config file worked for me really great.
