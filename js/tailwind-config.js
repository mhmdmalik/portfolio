tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
                heading: ['Syne', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                // iOS-like palette
                primary: '#fbfbfd', // Apple off-white
                secondary: '#86868b', // Apple gray text
                accent: '#0066cc', // System Blue
                glass: {
                    light: 'rgba(255, 255, 255, 0.1)',
                    DEFAULT: 'rgba(255, 255, 255, 0.05)',
                    dark: 'rgba(0, 0, 0, 0.2)',
                },
                orb: {
                    purple: '#5e5ce6',
                    blue: '#0a84ff',
                    pink: '#ff375f',
                    mint: '#63e6e2'
                }
            },
            animation: {
                'float-slow': 'float 8s ease-in-out infinite',
                'float-medium': 'float 6s ease-in-out infinite reverse',
                'float-fast': 'float 4s ease-in-out infinite',
                'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'typing': 'typing 2s steps(20, end), blink .75s step-end infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-20px) scale(1.05)' },
                },
                typing: {
                    from: { width: '0' },
                    to: { width: '100%' },
                },
                blink: {
                    '0%, 100%': { borderColor: 'transparent' },
                    '50%': { borderColor: 'currentColor' },
                }
            }
        }
    }
}
