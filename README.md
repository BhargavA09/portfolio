# bhargav.dev — Portfolio

Personal portfolio site for **Bhargav Patel**, Full-Stack Software Engineer (Windsor, ON).

## What's here

Plain static files — no build step:

- `index.html` — **"The Trek"**: an immersive 3D Himalayan walk-through (Three.js r160 via pinned CDN import map). Scroll = walk forward along a winding mountain path through 5 base camps (About, Skills, Projects, Experience, Contact), each with 3D props (tents, signposts, prayer flags) and an HTML overlay card with the real portfolio content. Procedural low-poly terrain, snowfall, drifting clouds, gradient sunset sky, camera bob + mouse parallax.
- `classic.html` — the full v2 single-page site (hero, about, skills, featured projects + case-study modals, GitHub stats, experience timeline, education, contact form), preserved as-is. Linked from the trek HUD as "Classic view".
- `styles.css` / `script.js` — dark "trading desk" theme (emerald/cyan on near-black) and interactions for `classic.html` only. The trek (`index.html`) is self-contained (inline CSS + module script).
- `resume.pdf` — downloadable resume, rendered verbatim from `Bhargav_Patel_Resume_ATS.md` via `hidden_files/render_resume.py` (regenerate with: `python3 hidden_files/render_resume.py files/Bhargav_Patel_Resume_ATS.md ~/workspace/portfolio-site/resume.pdf` from the goal workspace)

Every fact on the page comes from Bhargav's verified resume/projects. No lorem ipsum.

### Trek details
- Scroll position maps to trek progress (900vh scroll track); camera lerps smoothly along the path.
- Camp cards auto-open near each base camp; HUD progress dots jump to camps.
- Perf: pixelRatio capped (2 desktop / 1.5 mobile), reduced particles + terrain on mobile, rendering pauses when tab hidden.
- If WebGL is unavailable or the Three.js CDN fails to load, a graceful fallback links to `classic.html`.
- Test hooks (not linked anywhere): `?t=0.5` sets scroll position, `?nostart=1` skips the start overlay, `?card=projects` forces a camp card.

## Deploy to Vercel

**Option A — Vercel dashboard (fastest):**
1. Push this folder to a GitHub repo (e.g. `BhargavA09/portfolio`)
2. Vercel → Add New → Project → import the repo
3. Framework preset: **Other**. No build command, no output directory needed — `index.html` at root is served as-is.

**Option B — Vercel CLI:**
```bash
cd ~/workspace/portfolio-site
npx vercel --prod
```

## Local preview

```bash
cd ~/workspace/portfolio-site
python3 -m http.server 8080
# open http://localhost:8080
```
