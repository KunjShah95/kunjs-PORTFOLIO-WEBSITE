/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Inter"', 'system-ui', 'sans-serif'],
                display: ['"Cal Sans"', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                'none': '0',
                'sm': '2px',
                'DEFAULT': '4px',
                'md': '6px',
                'lg': '8px',
                'xl': '12px',
                '2xl': '16px',
                'full': '9999px',
            },
            colors: {
                bg: "rgb(var(--bg-main) / <alpha-value>)",
                surface: "rgb(var(--surface-main) / <alpha-value>)",
                surfaceHighlight: "rgb(var(--surface-highlight) / <alpha-value>)",
                border: "rgb(var(--border-main) / <alpha-value>)",
                primary: "rgb(var(--primary-rgb) / <alpha-value>)",
                secondary: "rgb(var(--secondary-rgb) / <alpha-value>)",
                accent: "rgb(var(--accent-rgb) / <alpha-value>)",
                muted: "rgb(var(--txt-muted) / <alpha-value>)",
                txt: "rgb(var(--txt-main) / <alpha-value>)",
                txtDim: "rgb(var(--txt-dim) / <alpha-value>)",
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'subtle-grid': 'linear-gradient(to right, rgb(var(--border-main) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--border-main) / 0.5) 1px, transparent 1px)',
                'academic-dots': 'radial-gradient(rgb(var(--border-main)) 1px, transparent 1px)',
            },
            boxShadow: {
                'glow': '0 0 20px rgb(var(--primary-rgb) / 0.15), 0 0 40px rgb(var(--primary-rgb) / 0.05)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
            animation: {
                'reveal': 'reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'beam': 'beam 5s ease-in-out infinite',
                'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 10s ease-in-out infinite',
                'border-spin': 'border-spin 4s linear infinite',
            },
            keyframes: {
                reveal: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                beam: {
                    '0%': { transform: 'translateX(-100%)' },
                    '50%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'border-spin': {
                    '100%': { transform: 'rotate(360deg)' },
                }
            }
        },
    },
    plugins: [],
}