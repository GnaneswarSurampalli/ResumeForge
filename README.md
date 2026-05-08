# ResumeForge - Online Resume Builder

A sleek, dark-themed **Online Resume Builder** built with pure HTML, CSS, and JavaScript. Users can input their details, preview their resume in real-time, and download it as a PDF — all without any signup or backend.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Features

- **Landing Page** — Modern, dark-themed landing page with interactive navigation
- **Fixed Navbar** — Transparent by default, adds backdrop blur effect on scroll
- **Hamburger Menu** — Responsive mobile navigation with slide-in panel
- **Scroll Animations** — Fade-in reveal effects triggered on scroll using Intersection Observer
- **Stat Counter** — Animated number counters in the hero section
- **Geometric Decorations** — CSS-based circles, rings, lines, and dot grids for visual depth
- **Resume Builder** — Interactive form with real-time resume preview
- **3 Templates** — Modern (gradient header), Classic (centered), and Minimal (clean)
- **Dynamic Entries** — Add/remove multiple experience and education blocks
- **PDF Export** — Download resume as PDF using browser's print functionality
- **Fully Responsive** — Works on desktop, tablet, and mobile screens

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, animations, responsive design |
| JavaScript | Interactivity, DOM manipulation, live preview |

No frameworks, libraries, or build tools required.

---

## Project Structure

```
ResumeForge/
├── index.html        # Landing page (Home)
├── styles.css        # Landing page styles
├── script.js         # Landing page JavaScript
├── builder.html      # Resume builder page
├── builder.css       # Builder page styles
├── builder.js        # Builder logic and preview rendering
└── README.md         # Project documentation
```

---

## How to Run

### Option 1: Open directly
Simply double-click `index.html` in your file explorer. It will open in your default browser.

### Option 2: Local server (recommended)
```bash
# Navigate to the project folder
cd path/to/ResumeForge

# Start a local server using Python
python -m http.server 8080

# Open in browser
# Visit: http://localhost:8080
```

---

## Pages

### 1. Landing Page (`index.html`)
The main marketing page with four sections:
- **Hero** — Main heading, call-to-action buttons, and animated stats
- **Features** — Four feature cards highlighting key capabilities
- **How It Works** — Three-step guide with arrow connectors
- **Templates** — Preview cards for all three resume templates

### 2. Resume Builder (`builder.html`)
A split-panel interface where users build their resume:
- **Left Panel** — Input form with sections for personal info, experience, education, and skills
- **Right Panel** — Live resume preview that updates as the user types
- **Template Selector** — Dropdown to switch between Modern, Classic, and Minimal styles
- **PDF Download** — Uses `window.print()` with a print-specific CSS stylesheet

---

## Key Concepts Used

- **CSS Variables** — Centralized design tokens for colors, spacing, and transitions
- **CSS Grid & Flexbox** — Responsive layouts without any framework
- **CSS Animations** — Keyframe animations for entrance effects and micro-interactions
- **Intersection Observer API** — Triggers scroll-based animations efficiently
- **DOM Manipulation** — Dynamic HTML generation for experience/education entries
- **Event Listeners** — Real-time input tracking for live preview updates
- **Print Media Queries** — `@media print` to create clean PDF output

---

## Screenshots

### Landing Page
The hero section with gradient text, animated badge, and stat counters.

### Resume Builder
Split-panel layout with form inputs on the left and live preview on the right.

---

## Future Improvements

- [ ] Add more resume templates
- [ ] Allow custom color themes
- [ ] Save resume data to localStorage
- [ ] Add profile photo upload
- [ ] Export as DOCX format

---

## Author

Built as a web development project to demonstrate skills in HTML, CSS, and JavaScript.

---

## License

This project is open source and available for personal and educational use.
