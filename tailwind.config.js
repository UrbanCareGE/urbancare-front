/* eslint-disable */
/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

const shorthands = plugin(function ({addUtilities}) {
    addUtilities({
        '.global-centered': {
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            'flex-direction': 'row',
            'flex-grow': 1,
        }
    })
})

module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './src/**/*.{js,ts,jsx,tsx,html}',
    ],
    prefix: '',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    light: 'var(--color-primary-light)',
                    dark: 'var(--color-material-green-500)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    light: 'var(--color-secondary-light)',
                    dark: 'var(--color-secondary-dark)',
                },
                background: {
                    light: 'var(--color-grey-near-black)',
                    dark: 'var(--color-grey-near-black)',
                },
                surface: {
                    light: 'var(--color-background-light)',
                    dark: 'var(--color-grey-absolute-black)',
                },
                header: {
                    light: 'var(--color-card-light)',
                    dark: 'var(--color-grey-absolute-black)',
                    DEFAULT: 'var(--color-grey-absolute-black)',
                },
                footer: {
                    light: 'var(--color-card-light)',
                    dark: 'var(--color-grey-absolute-black)',
                    DEFAULT: 'var(--color-grey-absolute-black)',
                },
                border: {
                    primary: {
                        light: 'var(--color-card-light)',
                        dark: 'var(--color-grey-darker)',
                        DEFAULT: 'var(--color-grey-darker)',
                    },
                    secondary: {
                        light: 'var(--color-grey-coal)',
                        dark: 'var(--color-grey-darker)',
                        DEFAULT: 'var(--color-grey-darker)',
                    },
                    hover: {
                        light: 'var(--color-card-light)',
                        dark: 'var(--color-ocean-depth)',
                        DEFAULT: 'var(--color-ocean-depth)',
                    },
                    muted: {
                        light: 'var(--color-card-light)',
                        dark: 'var(--color-stroke-dark)',
                        DEFAULT: 'var(--color-stroke-dark)',
                    },
                    accent: {
                        light: 'var(--color-ocean-deep-shadow)',
                        dark: 'var( --color-grey-darker)',
                        DEFAULT: 'var( --color-grey-darker)',
                    },
                },
                text: {
                    primary: {
                        light: 'var(--color-text-primary-light)',
                        dark: 'var(--color-text-primary-dark)',
                    },
                    secondary: {
                        light: 'var(--color-text-secondary-light)',
                        dark: 'var(--color-grey-darker)',
                    },
                },
                stroke: {
                    light: 'var(--color-stroke-light)',
                    dark: 'var(--color-stroke-dark)',
                },
                error: {
                    light: 'var(--color-error-light)',
                    dark: 'var(--color-error-dark)',
                },
                warning: {
                    light: 'var(--color-warning-light)',
                    dark: 'var(--color-warning-dark)',
                },
                success: {
                    light: 'var(--color-success-light)',
                    dark: 'var(--color-success-dark)',
                },
                info: {
                    light: 'var(--color-info-light)',
                    dark: 'var(--color-info-dark)',
                },
                sidebar: {
                    DEFAULT: 'var(--sidebar-background)',
                    foreground: 'var(--sidebar-foreground)',
                    primary: 'var(--sidebar-primary)',
                    'primary-foreground': 'var(--sidebar-primary-foreground)',
                    accent: 'var(--sidebar-accent)',
                    'accent-foreground': 'var(--sidebar-accent-foreground)',
                    border: 'var(--sidebar-border)',
                    ring: 'var(--sidebar-ring)',
                },
                foreground: 'var(--foreground)',
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                input: {
                    DEFAULT: 'var(--color-grey-dark)',
                    light: 'var(--color-grey-dark)',
                    dark: 'var(--color-grey-dark)',
                },
                ring: 'var(--color-primary-dark)',
                chart: {
                    '1': 'var(--chart-1)',
                    '2': 'var(--chart-2)',
                    '3': 'var(--chart-3)',
                    '4': 'var(--chart-4)',
                    '5': 'var(--chart-5)',
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'cell-ripple': {
                    '0%': {opacity: '0.4'},
                    '50%': {opacity: '0.8'},
                    '100%': {opacity: '0.4'},
                },
                'slide-in-from-right': {
                    '0%': {transform: 'translateX(100%)'},
                    '100%': {transform: 'translateX(0)'},
                },
                'caret-blink': {
                    '0%,70%,100%': {
                        opacity: '1'
                    },
                    '20%,50%': {
                        opacity: '0'
                    }
                },
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-(content)-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-(content)-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                slideUp: {
                    '0%': {transform: 'translateY(100%)', opacity: 0},
                    '100%': {transform: 'translateY(0)', opacity: 1},
                },
                slideDown: {
                    '0%': {transform: 'translateY(0)', opacity: 0},
                    '100%': {transform: 'translateY(100%)', opacity: 1},
                },
                fadeOut: {
                    '0%': {opacity: 1},
                    '100%': {opacity: 0},
                },
                float: {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-3px)'},
                },
                marquee: {
                    '0%': {transform: 'translateX(0%)'},
                    '100%': {transform: 'translateX(-50%)'},
                },
                shine: {
                    "0%": {backgroundPosition: "100%"},
                    "100%": {backgroundPosition: "-100%"},
                },
                shimmer: {
                    from: {
                        backgroundPosition: "0 0",
                    },
                    to: {
                        backgroundPosition: "-200% 0",
                    },
                },
                'star-movement-bottom': {
                    '0%': {transform: 'translate(0%, 0%)', opacity: '1'},
                    '100%': {transform: 'translate(-100%, 0%)', opacity: '0'},
                },
                'star-movement-top': {
                    '0%': {transform: 'translate(0%, 0%)', opacity: '1'},
                    '100%': {transform: 'translate(100%, 0%)', opacity: '0'},
                },
                scroll: {
                    to: {
                        transform: 'translate(calc(-50% - 0.5rem))',
                    },
                },
            },
            animation: {
                'shimmer': "shimmer 2s linear infinite",
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'caret-blink': 'caret-blink 1.25s ease-out infinite',
                'slide-up': 'slideUp 0.3s ease-in-out',
                'slide-down': 'slideUp 0.3s ease-in-out',
                'fade-out': 'fadeOut 0.3s ease-in-out',
                'float': 'float 1s ease-linear infinite',
                'marquee': 'marquee 20s linear infinite',
                'shine': 'shine linear infinite',
                'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
                'star-movement-top': 'star-movement-top linear infinite alternate',
                'cell-ripple': 'cell-ripple var(--duration,200ms) ease-out var(--delay,0ms) 1',
                'scroll': 'scroll var(--animation-duration, 60s) var(--animation-direction, forwards) linear infinite',
            },
            fontFamily: {
                poppins: [
                    'Poppins',
                    'sans-serif'
                ],
                roboto: ['var(--font-roboto)', 'sans-serif'],
            },
            fontSize: {
                '4xl': '2.25rem', // 36px
                '5xl': '3rem',    // 48px
                '6xl': '4rem',    // 48px
                '7xl': '6rem',    // 4
                '8xl': '12rem',    //
                '9xl': '16rem',
                '10xl': '20rem',    // 48px
            },
        }
    },
    plugins: [
        require('tailwindcss-animate'),
        shorthands,
    ],
}