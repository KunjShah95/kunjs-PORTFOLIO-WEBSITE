/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper:     'rgb(var(--bg-paper) / <alpha-value>)',
        elevated:  'rgb(var(--bg-elevated) / <alpha-value>)',
        sunken:    'rgb(var(--bg-sunken) / <alpha-value>)',
        inverse:   'rgb(var(--bg-inverse) / <alpha-value>)',

        ink: {
          DEFAULT: 'rgb(var(--ink-primary) / <alpha-value>)',
          primary: 'rgb(var(--ink-primary) / <alpha-value>)',
          secondary: 'rgb(var(--ink-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--ink-tertiary) / <alpha-value>)',
          quaternary: 'rgb(var(--ink-quaternary) / <alpha-value>)',
          inverse: 'rgb(var(--ink-inverse) / <alpha-value>)',
        },

        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)',
          ink: 'rgb(var(--accent-ink) / <alpha-value>)',
        },

        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        danger:  'rgb(var(--danger) / <alpha-value>)',
        live:    'rgb(var(--live) / <alpha-value>)',

        rule:        'rgb(var(--rule) / <alpha-value>)',
        'rule-strong': 'rgb(var(--rule-strong) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Instrument Serif"', '"Times New Roman"', 'serif'],
        body:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'monospace'],
        sans:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif:   ['"Instrument Serif"', '"Times New Roman"', 'serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '12px',
        lg: '12px',
        xl: '12px',
        '2xl': '12px',
        '3xl': '12px',
        full: '9999px',
      },
      maxWidth: {
        prose: '68ch',
        manifest: '1440px',
      },
      letterSpacing: {
        kicker: '0.12em',
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        fast: '180ms',
        base: '320ms',
        slow: '600ms',
      },
    },
  },
  plugins: [],
}
