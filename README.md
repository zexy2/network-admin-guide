# Network Admin Guide

Interactive troubleshooting guide for common network problems, organized by OSI layers. Final project for Computer Networks course at Manisa Celal Bayar University.

**Demo:** https://zexy2.github.io/network-admin-guide/

## Problems Covered

| # | Problem | Layer |
|---|---------|-------|
| 1 | Fiber optic cable breaks | Physical |
| 2 | VLAN configuration errors | Data Link |
| 3 | STP loop problems | Data Link |
| 4 | OSPF neighbor issues | Network |
| 5 | DHCP conflicts | Network |
| 6 | Static routing mistakes | Network |
| 7 | TCP timeouts | Transport |
| 8 | SSH session problems | Session |
| 9 | Character encoding issues | Presentation |
| 10 | HTTP/HTTPS troubleshooting | Application |

Some problems have interactive simulators.

## Running

```bash
git clone https://github.com/zexy2/network-admin-guide.git
open index.html
```

No build step needed. GSAP and fonts load from CDN.

## Structure

```
 index.html
 css/style.css
 js/main.js
 problems/           # Each problem folder
 Cisco_Packet_Tracer/  # .pkt files
```

## Tech

- Vanilla HTML/CSS/JS
- GSAP + ScrollTrigger for animations
- Bilingual (TR/EN)

## License

MIT
