```markdown
# Bookstore Demo Layout

What I built
- A static HTML/CSS/JS demo that replicates the look from your screenshot:
  - Red promo bar at top
  - Teal header with search, account and cart
  - Category navigation strip
  - Banner carousel
  - New Arrivals horizontal product carousel with product cards, prices and discount badges

Files
- index.html — main markup
- styles.css — responsive styling and variables
- script.js — banner rotation, product rendering and carousel controls
- README.md — this file

Run locally
1. Save the files in a folder.
2. Open `index.html` in your browser. For a better dev experience, serve with a static server:
   - Python: `python -m http.server 8000`
   - Node: `npx http-server . -p 8000`
   Then open http://localhost:8000

Customization ideas (next)
- Replace placeholder images with real book cover URLs.
- Hook the product list to a JSON API or a backend.
- Add a proper cart UI and persistence (localStorage or backend).
- Improve banner to include arrows and swipe gestures for mobile.
- Add lazy loading and image optimization for performance.

License
- MIT — use and adapt however you like.
```
