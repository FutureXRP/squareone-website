import type { Config } from 'tailwindcss'

// Brand tokens. Run `npm run palette` once the four logo PNGs are in
// public/logos/ and replace the sq1, elc, and med values with the extracted
// colors. See CONFIRM.md.
//
// brand.int is deliberately NOT extracted from a logo. It is the Interactive
// app's navy (#182740, its theme-color) so the handoff between the two sites
// reads as one property. Its full token set lives in the app's lib/theme.ts.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1.25rem', screens: { xl: '1120px' } },
    extend: {
      colors: {
        brand: {
          sq1: '#05528F', // umbrella mark blue (read from supplied logo; confirm with `npm run palette` on sq1.png)
          navy: '#0E2140', // umbrella mark navy
          elc: '#1A6AB6', // ELC wordmark blue (read from supplied logo)
          med: '#1163AE', // Medical mark blue (read from supplied logo)
          int: '#182740', // Interactive app navy, fixed
        },
        ink: '#2A2724',
        muted: '#5E5852',
        line: '#E6E1DB',
        paper: '#FFFFFF',
        tint: '#F5F7FA',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        'accent-hover': 'var(--accent-hover)',
        'accent-soft': 'var(--accent-soft)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      // 16px base, 1.25 ratio
      fontSize: {
        sm: ['0.8rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.25rem', { lineHeight: '1.5' }],
        xl: ['1.5625rem', { lineHeight: '1.3' }],
        '2xl': ['1.953rem', { lineHeight: '1.2' }],
        '3xl': ['2.441rem', { lineHeight: '1.15' }],
        '4xl': ['3.052rem', { lineHeight: '1.1' }],
      },
      maxWidth: { content: '1120px', prose: '38rem' },
      spacing: { section: '6rem', 'section-sm': '3.5rem' },
    },
  },
  plugins: [],
}

export default config
