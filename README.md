# Network Admin Guide

Interactive troubleshooting guide for common network problems, organized by OSI layers. Built as a final project for Computer Networks course at Manisa Celal Bayar University.

**[Live Demo](https://zexy2.github.io/network-admin-guide/)** | [TR/EN bilingual]

## What's this?

A web-based guide covering 10 real-world network issues that network admins deal with regularly. Each problem includes:
- Explanation of the issue
- Step-by-step troubleshooting
- Cisco Packet Tracer simulation files
- Interactive demos for some problems

The whole thing runs in the browser - just HTML, CSS, and JavaScript with GSAP for animations.

## Problems Covered

| # | Problem | OSI Layer |
|---|---------|-----------|
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

Some problems have interactive simulators (VLAN, routing, TCP, SSH terminal, encoding tester, SSL handshake visualization).

## Running Locally

```bash
git clone https://github.com/zexy2/network-admin-guide.git
cd network-admin-guide
open index.html
```

No build step needed. GSAP and fonts load from CDN.

## Project Structure

```
├── index.html           # Landing page
├── css/style.css        # All styling
├── js/main.js           # GSAP animations, language switching
├── problems/            # Each problem has its own folder
│   └── problem_XX/
│       ├── description.html
│       ├── description-en.html
│       ├── solution.html
│       ├── solution-en.html
│       └── packet_tracer/
├── Cisco_Packet_Tracer/ # All .pkt files organized by problem
└── images/
```

## Tech

- HTML5/CSS3/JS (vanilla)
- GSAP + ScrollTrigger for animations
- Custom cursor, particle effects, scroll-triggered reveals
- CSS variables for theming
- LocalStorage for language preference

## Notes

- Works best in Chrome/Firefox. Safari should be fine too.
- Language switching is persistent (TR/EN)
- Packet Tracer files require Cisco Packet Tracer to open
- The custom cursor is disabled on touch devices

## License

MIT
