# Durga Prasad — Portfolio

A modern, editorial-style personal portfolio website for **Durga Prasad**, Cybersecurity Engineer & Developer.

**Live Site:** [https://durgaaprasadch.github.io/mysite/](https://durgaaprasadch.github.io/mysite/)

---

## Features

- **Animated page loader** — color-sliced reveal with DP. monogram
- **Custom cursor** — orange dot + ring with parallax ring follow
- **Fixed glassmorphism nav** — blur on scroll, auto-hide on scroll-down, mobile hamburger
- **Hero section** — large editorial typography, sliced portrait art (8 fragments), floating orbit circles, parallax on mousemove
- **About section** — lead text with highlighted keywords, body copy, animated stat counters (15+ Projects, 5+ Years, 50+ Vulns)
- **Skills grid** — Security, Development, Infrastructure, Tools cards with hover slice accent
- **Projects list** — SentinelScan, CipherBoard, PipeGuard, NetPulse with editorial index numbers and mini art blocks
- **Experience timeline** — 3 roles with animated dot markers
- **Contact section** — large email link, GitHub / LinkedIn / Twitter social cards
- **Footer** — animated gradient slice, back-to-top button

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid/flex, keyframe animations, responsive breakpoints
- **Vanilla JavaScript (ES5+)** — IntersectionObserver, requestAnimationFrame, smooth scroll
- **Google Fonts** — Syne (headings) + Space Grotesk (body)
- **GitHub Actions** — automated deployment to GitHub Pages

## Local Development

```bash
# Clone the repository
git clone https://github.com/durgaaprasadch/mysite.git
cd mysite

# Open in your browser — no build step required
open index.html
# or serve with any static file server:
npx serve .
```

## Deployment

The site automatically deploys to GitHub Pages on every push to `main` via the workflow at `.github/workflows/deploy.yml`.

## License

[MIT](./LICENSE) © 2026 Durga Prasad