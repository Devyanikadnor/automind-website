# Automind — Premium Technology Startup Website

A premium, modern, fully responsive static website for **Automind** — a technology company offering **Software Testing**, **Web Development**, and **Graphic Designing** services. Built with pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step, ready for GitHub Pages.

## Features

- **Dark mode by default** with a light mode toggle (persisted in localStorage)
- **Glassmorphism UI** with soft gradients and animated glowing backgrounds
- **Sticky navigation** with mobile menu and active link tracking
- **Scroll progress indicator** and **back-to-top** button
- **Scroll-triggered reveal animations** via IntersectionObserver
- **Animated counters** for statistics
- **Typing effect** in the hero
- **Floating technology icons** with mouse parallax
- **Animated tech marquee** (HTML, CSS, JS, React, Git, GitHub, Docker, AWS, Jenkins, Kubernetes, Selenium, Playwright, Cypress, Postman, JMeter, Figma)
- **Accordion FAQ**, **portfolio filter**, **pricing comparison table**
- **Contact form** with validation and toast notifications
- **WhatsApp float button**
- **SEO**: meta tags, Open Graph, Twitter Cards, JSON-LD structured data, canonical URLs, sitemap.xml, robots.txt
- **Accessible**: semantic HTML, ARIA labels, skip link, focus styles, reduced-motion support
- **Responsive**: mobile-first, tested from 320px to 1440px+

## Project Structure

```
.
├── index.html          # Home — all 12 sections
├── about.html          # About — story, values, mission, team
├── services.html       # Services — detailed breakdowns
├── portfolio.html      # Portfolio — filterable grid
├── pricing.html        # Pricing — plans + comparison table + FAQ
├── contact.html        # Contact — form, info, map, social
├── css/
│   ├── variables.css   # Design tokens (colors, spacing, typography)
│   ├── base.css        # Reset, typography, utilities
│   ├── components.css  # Buttons, cards, forms, accordion, etc.
│   ├── layout.css      # Header, nav, footer, overlays
│   └── sections.css    # Hero, services, portfolio, pricing, etc.
├── js/
│   └── main.js         # All interactivity (loader, nav, theme, animations, form)
├── assets/
│   ├── favicon.svg
│   ├── og-image.svg
│   └── manifest.webmanifest
├── images/             # (placeholder for future raster images)
├── robots.txt
├── sitemap.xml
└── README.md
```

## Local Development

No build step required. Use any static file server:

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node (npx)
npx serve

# Option 3: VS Code Live Server extension
```

Then open `http://localhost:8000` in your browser.

## Deploy to GitHub Pages

1. **Create a new GitHub repository** (e.g., `automind` or `your-username.github.io`).

2. **Push the project files** to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Automind website"
   git branch -M main
   git remote add origin https://github.com/your-username/automind.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select the **`main`** branch and **`/ (root)`** folder
   - Click **Save**

4. **Wait 1-2 minutes** for the build to complete. Your site will be live at:
   ```
   https://your-username.github.io/automind/
   ```

### Using a custom domain (optional)

1. In your repo, go to **Settings** → **Pages** → **Custom domain**
2. Enter your domain (e.g., `automind.com`) and click **Save**
3. Configure DNS with your domain provider:
   - **Apex domain**: Add A records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **Subdomain** (e.g., `www`): Add a CNAME record pointing to `your-username.github.io`

### Updating the canonical URL

Before deploying, update the canonical URLs and sitemap entries in the HTML files and `sitemap.xml` to match your actual domain. Search for `https://automindtech.github.io/` and replace with your domain.

## Customization

### Colors
Edit CSS custom properties in `css/variables.css`:
```css
:root {
  --color-primary: #2563EB;
  --color-accent: #06B6D4;
  --bg-base: #020617;
  /* ... */
}
```

### Content
All content is in the HTML files — no CMS, no data files. Edit text directly in `index.html`, `about.html`, etc.

### Company name
Search and replace `Automind` across all HTML files to update the company name if needed.

### Contact form
The form is front-end only (shows a success toast). To receive submissions, integrate with:
- [Formspree](https://formspree.io/) — easiest, free tier
- [Netlify Forms](https://docs.netlify.com/forms/setup/) — if hosting on Netlify
- A Supabase Edge Function — for full backend control

## Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari / Chrome 90+

## Performance

- No JavaScript frameworks or build step
- CSS split into small, cacheable modules
- IntersectionObserver for lazy animations
- System font fallbacks + Google Fonts with `preconnect`
- SVG icons (no icon font, no image requests)
- Lighthouse target: 95+ across all categories

## License

MIT — free to use, modify, and distribute for personal and commercial projects.
