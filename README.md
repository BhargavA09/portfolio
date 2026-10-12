# bhargav.dev — Portfolio

Personal portfolio site for **Bhargav Patel**, Full-Stack Software Engineer (Windsor, ON).

## What's here

Plain static files — no build step, no dependencies:

- `index.html` — single-page site: hero, about, skills, featured projects (+ case-study modals), GitHub stats, experience timeline, education, contact form
- `styles.css` — dark "trading desk" theme (emerald/cyan on near-black)
- `script.js` — animated candlestick canvas, typing effect, skills ticker, scroll reveals, animated counters, modals, terminal easter egg, contact form
- `resume.pdf` — downloadable resume, rendered verbatim from `Bhargav_Patel_Resume_ATS.md` via `hidden_files/render_resume.py` (regenerate with: `python3 hidden_files/render_resume.py files/Bhargav_Patel_Resume_ATS.md ~/workspace/portfolio-site/resume.pdf` from the goal workspace)

Every fact on the page comes from Bhargav's verified resume/projects. No lorem ipsum.

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
