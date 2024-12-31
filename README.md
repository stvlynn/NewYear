# New Year Countdown 2024

[![Test your yearly Kanji](https://img.shields.io/badge/Test_your_yearly_Kanji-black?logo=x&style=flat-square)](https://kanji.twi.am)

A beautiful New Year countdown webpage featuring a dynamic 3D globe background, inspired by GitHub's globe visualization.

## Features

- **Interactive 3D Globe**: A mesmerizing globe visualization with glowing effects
- **Dynamic Arcs**: Animated arcs connecting major cities across the globe
- **Digital Clock**: Seven-segment display style countdown timer
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and modern interface with a dark theme

## Tech Stack

- **Framework**: Vue 3 with TypeScript
- **Build Tool**: Vite
- **3D Rendering**: Three.js + ThreeGlobe
- **Styling**: TailwindCSS
- **Font**: DSEG7 (Seven-segment display font)

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/stvlynn/NewYear.git
cd NewYear
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Customization

### Globe Settings
You can customize the globe appearance in `GlobeBackground.vue`:
- Adjust globe size by modifying camera distance
- Change colors of the globe and arcs
- Modify arc animation speed and frequency
- Adjust glow effect intensity

### Timer Settings
Customize the countdown display in `CountdownTimer.vue`:
- Change font size and colors
- Adjust glow effects
- Modify layout and spacing

## License

MIT License - feel free to use this project for your own New Year countdown!

## Acknowledgments

- Inspired by [GitHub Globe](https://github.blog/2020-12-21-how-we-built-the-github-globe/)
- Uses [Three.js](https://threejs.org/) for 3D rendering
- [ThreeGlobe](https://github.com/vasturiano/three-globe) for globe visualization
- [DSEG Font](https://github.com/keshikan/DSEG) for the digital display

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/stvlynn/NewYear/issues).

---

Made with by [Steven](https://github.com/stvlynn)
