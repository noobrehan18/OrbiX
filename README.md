# 🌌 OrbiX - Interactive 3D Solar System Explorer

<div align="center">

![OrbiX Logo](https://img.shields.io/badge/OrbiX-Solar%20System%20Explorer-06b6d4?style=for-the-badge&logo=rocket)
![React](https://img.shields.io/badge/React-18.0+-61dafb?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-3D%20Graphics-000000?style=for-the-badge&logo=three.js)
![Vite](https://img.shields.io/badge/Vite-Fast%20Build-646cff?style=for-the-badge&logo=vite)

**Experience the wonders of our solar system in stunning 3D with interactive planets, real-time customization, and beautiful visual effects.**



</div>

---

## ✨ Features

### 🌟 **Core Experience**
- **Interactive 3D Solar System** - Explore all 8 planets plus the Sun in stunning 3D
- **Realistic Orbital Mechanics** - Accurate planet orbits, rotations, and distances
- **High-Quality Textures** - Detailed planet surfaces with realistic materials
- **Progressive Loading** - Smooth loading experience with beautiful animations

### 🎮 **Interactive Features**
- **Planet Information Panels** - Detailed facts, statistics, and "Did You Know?" sections
- **Camera Controls** - Smooth navigation with zoom, pan, and rotation
- **Quick Navigation** - Jump to any planet or overview with one click
- **Orbit Visualization** - Toggle orbit lines to see planetary paths

### 🎨 **Visual Effects**
- **Particle Systems** - Beautiful floating particles throughout space
- **Space Weather Effects** - Dynamic solar flares, cosmic rays, and atmospheric glow
- **Starfield Background** - Immersive space environment with thousands of stars
- **Glassmorphism UI** - Modern glass-like interface with backdrop blur effects

### 🛠️ **Customization Tools**
- **Interactive Playground** - Real-time customization of:
  - Planet sizes and orbits
  - Rotation and orbital speeds
  - Lighting and visual effects
  - Time scale and simulation speed
- **Planet Comparison Tool** - Compare up to 4 planets side-by-side
- **Space Weather Controller** - Toggle different space phenomena

### 🎓 **Educational Features**
- **Interactive Tutorial** - Step-by-step guide through all features
- **Educational Content** - Detailed information about each celestial body
- **Visual Learning** - 3D visualization of planetary relationships
- **Fun Facts** - Interesting trivia about each planet

### 🎵 **Audio Experience**
- **Ambient Space Sounds** - Immersive background audio
- **Audio Controls** - Mute/unmute functionality
- **Browser-Compatible** - Works with modern browser audio policies

---



## 🎮 How to Use

### Basic Navigation
- **Mouse Controls**: Click and drag to rotate, scroll to zoom, right-click to pan
- **Planet Interaction**: Click on any planet to view detailed information
- **Quick Access**: Use the navigation menu to jump to specific planets

### Advanced Features
- **Playground**: Click the rocket icon to open the customization panel
- **Comparison**: Use the chart icon to compare multiple planets
- **Tutorial**: Click the help icon for an interactive tour
- **Space Weather**: Toggle the lightning icon for visual effects

### Controls Overview
```
🎮 Navigation Controls
├── Left Click + Drag → Rotate view
├── Scroll Wheel → Zoom in/out
├── Right Click + Drag → Pan view
└── Click Planet → View information

🎛️ UI Controls
├── 🚀 Playground → Customization panel
├── 📊 Compare → Planet comparison tool
├── ❓ Tutorial → Interactive guide
├── ⚡ Weather → Space effects
├── 👁️ Orbits → Toggle orbit lines
├── 🔊 Audio → Toggle sound
└── 🧭 Navigate → Quick planet access
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Three.js** - 3D graphics and WebGL rendering
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Beautiful animations and transitions
- **Lucide React** - Beautiful icon library

### Build Tools
- **Vite** - Fast build tool and development server
- **PostCSS** - CSS processing
- **ESLint** - Code linting

### Audio
- **use-sound** - React hook for sound effects

---

## 📁 Project Structure

```
OrbiX/
├── public/
│   ├── sounds/          # Audio files
│   └── textures/        # Planet textures
├── src/
│   ├── components/      # New UI components
│   │   ├── NavigationMenu.jsx
│   │   ├── PlanetComparison.jsx
│   │   ├── ParticleEffects.jsx
│   │   ├── SpaceWeather.jsx
│   │   ├── TutorialSystem.jsx
│   │   └── WelcomeScreen.jsx
│   ├── planets/         # Planet components
│   │   ├── Sun.jsx
│   │   ├── Earth.jsx
│   │   ├── Mars.jsx
│   │   └── ...
│   ├── App.jsx          # Main app component
│   ├── Solar.jsx        # Solar system component
│   ├── planetData.js    # Planet information
│   └── main.jsx         # Entry point
├── package.json
└── README.md
```

---



## 🌟 Key Features in Detail

### Interactive 3D Environment
- **Realistic Scale**: Planets sized relative to each other
- **Accurate Orbits**: Real orbital periods and distances
- **Dynamic Lighting**: Realistic sun lighting and shadows
- **Smooth Performance**: Optimized for 60fps rendering

### Educational Content
Each planet includes:
- **Physical Properties**: Diameter, mass, gravity
- **Orbital Data**: Distance from sun, orbital period
- **Interesting Facts**: Unique characteristics and discoveries
- **Visual Information**: Surface features and composition

### Visual Effects
- **Particle Systems**: 2000+ animated particles
- **Space Weather**: 3 different effect types
- **Atmospheric Glow**: Realistic planet atmospheres
- **Dynamic Lighting**: Real-time lighting changes

---



