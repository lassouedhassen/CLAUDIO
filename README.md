# Claudio — Official Website

**Different People. One Story. A Kinder World.**

The official website of **CLAUDIO**, a minimalist, hand-drawn animated comic series about
life, humanity, relationships, society and nature, following Claudio and his small dog Max.

> “Claudio doesn’t teach the world. The world teaches Claudio.”

A fast, dependency-free static site (HTML + CSS + JavaScript, no build step).

## Sections

- **Hero:** the Claudio wordmark, tagline and the official Claudio & Max artwork
- **Core philosophy:** “Claudio doesn’t teach the world. The world teaches Claudio.”
- **Meet Claudio:** personality, character profile, poses and expressions sheets
- **Meet Max:** the silent companion
- **The journey:** sample scenes from the visual-style board
- **Episode 1: A Small Act, A Big Impact:** synopsis, storyboard frames, full storyboard
- **Episodes:** the five-beat structure, the eight planned episodes, format & distribution
- **Themes**, **Visual style** (palette), closing quote, **Follow**, **Contact**

Also: light/dark theme, mobile menu, scroll animations (disabled for reduced-motion users),
accessible forms, social share image and a custom 404 page.

## Artwork

All images in `assets/` are cropped from the hand-drawn identity board and the Episode 1
storyboard in the *CLAUDIO COMICS PROJECT* asset package:

| File | Source |
| --- | --- |
| `wordmark.png`, `wordmark-light.png`, `icon.png`, `favicon.png` | Claudio – A Brighter Tomorrow board |
| `img/claudio-hero.webp`, `img/claudio-poses.webp`, `img/claudio-expressions.webp`, `img/scene-*.webp` | Claudio – A Brighter Tomorrow board |
| `img/max-the-look.webp`, `img/ep1-*.webp`, `img/episode1-storyboard.webp` | Episode 1 storyboard |

Replace any of them with final production art using the same file names.

## Project structure

```
.
├── index.html          # Main page
├── 404.html            # Not-found page
├── css/styles.css      # Styles; series palette & theme tokens at the top
├── js/main.js          # Settings (social links, email) + interactions
├── assets/             # Wordmark, icons, share image, artwork (img/)
└── .github/workflows/pages.yml   # GitHub Pages deployment
```

## Run locally

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customize

- **Social channels & email:** set `SOCIAL` and `CONTACT_EMAIL` at the top of `js/main.js`.
  Empty social links show "Coming soon".
- **Colors:** the series palette (`--ink`, `--red`, `--sunset`, `--denim`, `--leaf`, `--brush`, `--paper`)
  lives in `:root` in `css/styles.css`.
- **Forms:** the contact form opens the visitor's email app and the newsletter form only shows
  a confirmation. Connect them to a form service (e.g. Formspree) or your own API to collect submissions.

## Deploy

Pushing to `main` deploys via GitHub Actions. In the repository settings, set
**Pages → Build and deployment → Source** to **GitHub Actions**.
