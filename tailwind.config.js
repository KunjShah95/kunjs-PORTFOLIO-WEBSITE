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
                sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
                display: ['"Fraunces"', 'Georgia', 'serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                'none': '0',
                'sm': '2px',
                'DEFAULT': '4px',
                'surgical': '1px',
                'full': '9999px',
            },
            colors: {
                bg: "rgb(var(--bg-main) / <alpha-value>)",
                surface: "rgb(var(--surface-main) / <alpha-value>)",
                surfaceHighlight: "rgb(var(--surface-highlight) / <alpha-value>)",
                border: "rgb(var(--border-main) / <alpha-value>)",
                primary: "rgb(var(--primary-rgb) / <alpha-value>)",
                secondary: "rgb(var(--secondary-rgb) / <alpha-value>)",
                accent: "rgb(var(--primary-rgb) / <alpha-value>)",
                muted: "rgb(var(--txt-muted) / <alpha-value>)",
                txt: "rgb(var(--txt-main) / <alpha-value>)",
                txtDim: "rgb(var(--txt-dim) / <alpha-value>)",
                // Vaporwave specific colors
                'neon-pink': 'rgb(255 20 147 / <alpha-value>)',
                'neon-purple': 'rgb(186 85 211 / <alpha-value>)',
                'neon-cyan': 'rgb(0 255 255 / <alpha-value>)',
                'neon-teal': 'rgb(0 128 128 / <alpha-value>)',
                'vapor-bg': 'rgb(10 0 30 / <alpha-value>)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'subtle-grid': 'linear-gradient(to right, rgb(var(--border-main)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--border-main)) 1px, transparent 1px)',
                'academic-dots': 'radial-gradient(rgb(var(--border-main)) 1px, transparent 1px)',
                'vapor-sun': 'linear-gradient(180deg, rgb(var(--neon-pink)) 0%, rgb(var(--neon-purple)) 30%, rgb(var(--neon-cyan)) 70%, rgb(var(--neon-teal)) 100%)',
                'vapor-horizontal': 'linear-gradient(90deg, rgb(var(--neon-pink)) 0%, rgb(var(--neon-purple)) 50%, rgb(var(--neon-cyan)) 100%)',
                'vapor-vertical': 'linear-gradient(180deg, rgb(var(--neon-pink)) 0%, rgb(var(--neon-purple)) 50%, rgb(var(--neon-cyan)) 100%)',
                'retro-grid': 'linear-gradient(to right, rgb(var(--primary-rgb) / 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--secondary-rgb) / 0.3) 1px, transparent 1px)',
            },
            boxShadow: {
                'neon': '0 0 5px rgb(var(--primary-rgb) / 0.5), 0 0 10px rgb(var(--primary-rgb) / 0.3), 0 0 20px rgb(var(--primary-rgb) / 0.2)',
                'neon-cyan': '0 0 5px rgb(var(--neon-cyan) / 0.5), 0 0 10px rgb(var(--neon-cyan) / 0.3), 0 0 20px rgb(var(--neon-cyan) / 0.2)',
                'retro': '0 4px 20px rgb(var(--primary-rgb) / 0.3), 0 0 40px rgb(var(--primary-rgb) / 0.1)',
            },
            animation: {
                'glitch': 'glitch 2s infinite',
                'glitch-rotate': 'glitch-rotate 3s infinite',
                'retro-scan': 'retro-scan 8s linear infinite',
                'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
                'vapor-float': 'vapor-float 6s ease-in-out infinite',
                'vapor-glide': 'vapor-glide 8s ease-in-out infinite',
                'vapor-bounce': 'vapor-bounce 3s ease-in-out infinite',
                'scan': 'scan 8s linear infinite',
                'reveal': 'reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'beam': 'beam 5s ease-in-out infinite',
                'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 10s ease-in-out infinite',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                },
                'glitch-rotate': {
                    '0%, 90%, 100%': { transform: 'translate(0) rotate(0deg)' },
                    '91%': { transform: 'translate(-2px, 1px) rotate(-1deg)' },
                    '92%': { transform: 'translate(2px, -1px) rotate(1deg)' },
                    '93%': { transform: 'translate(-1px, -1px) rotate(0deg)' },
                    '94%': { transform: 'translate(1px, 1px) rotate(-1deg)' },
                },
                'retro-scan': {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '0% 100%' },
                },
                'neon-pulse': {
                    '0%, 100%': {
                        textShadow: '0 0 5px rgb(var(--primary-rgb)), 0 0 10px rgb(var(--primary-rgb)), 0 0 20px rgb(var(--primary-rgb))',
                    },
                    '50%': {
                        textShadow: '0 0 10px rgb(var(--primary-rgb)), 0 0 20px rgb(var(--primary-rgb)), 0 0 40px rgb(var(--primary-rgb)), 0 0 80px rgb(var(--primary-rgb))',
                    },
                },
                'vapor-float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'vapor-glide': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(10px)' },
                    '75%': { transform: 'translateX(-10px)' },
                },
                'vapor-bounce': {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-10px) scale(1.05)' },
                },
                scan: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '0% 100%' },
                },
                reveal: {
                    '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
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
                    '50%': { transform: 'translateY(-20px)' }
                }
            }
        },
    },
    plugins: [],
}