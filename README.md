# Claudio — Official Website

The official website for **Claudio**: a fast, responsive, dependency-free static site.

## Features

- Responsive layout (mobile menu, fluid typography)
- Light / dark theme (follows system, remembers the visitor's choice)
- Sections: hero, features, how it works, testimonials, pricing (monthly/yearly toggle), FAQ, contact, newsletter
- Scroll-reveal animations and animated counters (respect `prefers-reduced-motion`)
- Accessible: skip link, semantic landmarks, keyboard-friendly, ARIA live form feedback
- Custom 404 page and GitHub Pages deploy workflow

## Project structure

```
.
├── index.html          # Main page
├── 404.html            # Not-found page
├── css/styles.css      # All styles (design tokens at the top)
├── js/main.js          # Interactions (menu, theme, forms, animations)
├── assets/             # Logo and favicon
└── .github/workflows/pages.yml   # GitHub Pages deployment
```

## Run locally

No build step is needed. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customize

- **Copy & sections:** edit `index.html`.
- **Colors & spacing:** edit the CSS variables in `:root` at the top of `css/styles.css`.
- **Contact email:** replace `hello@claudio.example` in `index.html` and `js/main.js`.
  The contact form currently opens the visitor's mail client; swap in a form service
  (e.g. Formspree) or your own API endpoint when you have a backend.

## Deploy

Pushing to `main` deploys via GitHub Actions. In the repository settings, set
**Pages → Build and deployment → Source** to **GitHub Actions**.
