# The Talisman — landing page

React + TypeScript + Vite + Tailwind CSS + lucide-react. One-page, calm,
single-CTA capture page for an AI automation agency.

## Run it

```bash
npm install
npm run dev
```

This was scaffolded in a sandbox without registry access, so dependencies
have never actually been installed or compiled here — `npm install` is a
real first step, not a formality. If anything doesn't compile cleanly,
it's most likely a small version mismatch in `package.json`; bump the
offending package and it should resolve.

## Before you ship

- **Hero video** — drop `hero.mp4` and `hero-poster.jpg` into `/public`
  (see the note in that folder). The scroll-scrub background degrades
  gracefully to a plain dark background without them.
- **The one CTA** — every "Request an Automation Audit" button reads from
  `AUDIT_CTA_HREF` in `src/config.ts`, currently a placeholder `mailto:`.
  Point it at your real inbox, or swap it for a booking link (Calendly,
  Cal.com, a form) — you only have to change it in one place.
- **Credibility numbers** — `src/sections/Credibility.tsx` has three
  `[X]+` placeholders (years of experience, automations in production,
  industries served). Replace them with your real figures before this
  goes live; they're deliberately left as placeholders rather than
  invented numbers.
- **Brand name** — set to "the talisman" throughout (`src/config.ts`,
  page `<title>` in `index.html`). Update both if that changes.

## What carried over from the design spec vs. what changed

This page reuses the visual system from the original pixel-recreation
brief (Inter type, dark cinematic scroll-video hero, glass/frosted-panel
tokens, reveal-on-scroll animation, mono uppercase labels, CTA styles) —
but the content is entirely the new B2B automation-agency brief, and a
few things were adapted to fit:

- Extended from the original 2-section template to all 7 sections the
  content brief calls for (Hero, Who It's For / Not For, How It Works,
  Credibility, the Audit offer, What Happens Next, Final CTA), each
  built from the same design tokens.
- Renamed from the original demo brand to **The Talisman**.
- Dropped the specific "Talk with Mitha" founder photo/video asset from
  the original brief — inventing a named person and photo for a
  different, real business didn't seem right, so the hero's contact
  card uses a generic icon instead of a photo. Same for the hero video
  itself: the original pointed at another project's specific hosted
  video file, which isn't something to hot-link into a different site
  (also a practical problem — the scroll-scrub effect draws video
  frames to a `<canvas>`, which needs a same-origin or CORS-enabled
  video source to avoid the browser blocking the canvas as "tainted").
  Drop your own footage into `/public/hero.mp4` instead.
- Every CTA button — hero, section CTAs, nav, final section — points at
  the same single action, deliberately, per the brief's "single, calm
  CTA" goal. There's no secondary button anywhere on the page.
