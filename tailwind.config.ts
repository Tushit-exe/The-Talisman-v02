import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // A hair warmer than pure white — used for body copy so long
        // paragraphs read as considered prose rather than flat gray text.
        paper: '#f2ece1',
        // Pulled from the reference footage's gold cable-tip highlights —
        // the one accent color on the page, used sparingly (badge marks,
        // active states, CTA glow) so the site isn't pure grayscale.
        gold: '#c9a057',
      },
      dropShadow: {
        // Tighter, darker halo than a typical soft shadow — the footage runs
        // lighter than the design spec assumed, so text needs a harder edge
        // to stay legible over bright frames, not just a soft glow.
        md: '0 2px 6px rgba(0,0,0,0.65)',
        lg: '0 3px 10px rgba(0,0,0,0.7)',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
} satisfies Config
