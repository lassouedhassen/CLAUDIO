# CLAUDIO — Official Website

**Different People. One Story. A Kinder World.**

The official website of **CLAUDIO**, a minimalist, hand-drawn animated comic series about
life, humanity, relationships, society and nature, following Claudio and his small dog Max.

> “Claudio doesn’t teach the world. The world teaches Claudio.”

A fast, dependency-free static site (HTML + CSS + JavaScript, no build step).

## Sections

- **Hero:** series title, tagline and an animated hand-drawn Claudio & Max
- **Core philosophy** quote
- **Meet Claudio** / **Meet Max:** the characters
- **The journey:** places, cultures and what people share
- **Themes:** love, friendship, family, kindness, peace, happiness, tolerance, nature, human behavior
- **Episodes:** the three-beat episode format (coming-soon state)
- **Visual style:** art direction and color palette
- **Follow:** YouTube, Instagram, TikTok, Facebook and newsletter
- **Contact:** collaborations, press and licensing

Also: light/dark theme, mobile menu, scroll animations (disabled for reduced-motion users),
accessible forms and a custom 404 page.

## Project structure

```
.
├── index.html          # Main page (character art is inline SVG in <defs>)
├── 404.html            # Not-found page
├── css/styles.css      # Styles; series palette & theme tokens at the top
├── js/main.js          # Settings (social links, email) + interactions
├── assets/             # Logo and favicon
└── .github/workflows/pages.yml   # GitHub Pages deployment
```

## Run locally

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customize

- **Social channels & email:** set `SOCIAL` and `CONTACT_EMAIL` at the top of `js/main.js`,
  and the email link in the Contact section of `index.html`. Empty social links show "Coming soon".
- **Colors:** the series palette (`--ink`, `--terracotta`, `--sun`, `--sage`, `--denim`, `--skin`)
  lives in `:root` in `css/styles.css`.
- **Character art:** the `#claudio` and `#max` SVG symbols in `index.html` are placeholder
  drawings. Swap them for the official artwork (SVG or PNG) when it's ready.
- **Forms:** the contact form opens the visitor's email app and the newsletter form only shows
  a confirmation. Connect them to a form service (e.g. Formspree) or your own API to collect submissions.

## Deploy

Pushing to `main` deploys via GitHub Actions. In the repository settings, set
**Pages → Build and deployment → Source** to **GitHub Actions**.
