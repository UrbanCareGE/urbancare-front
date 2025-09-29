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

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './src/**/*.{js,ts,jsx,tsx,html}',
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    prefix: '',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    container: 'var(--color-temp)',
                    on: 'var(--color-on-primary)',
                    onContainer: 'var(--color-on-primary-container)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    container: 'var(--color-secondary-container)',
                    on: 'var(--color-on-secondary)',
                    onContainer: 'var(--color-on-secondary-container)',
                },
                tertiary: {
                    DEFAULT: 'var(--color-tertiary)',
                    container: 'var(--color-tertiary-container)',
                    on: 'var(--color-on-tertiary)',
                    onContainer: 'var(--color-on-tertiary-container)',
                },
                text: {
                    disabled: 'var(--color-text-disabled)',
                    placeholder: 'var(--color-grey-500)',
                    inverse: 'var(--color-text-inverse)',
                },
                success: {
                    DEFAULT: 'var(--color-success)',
                    container: 'var(--color-success-container)',
                    on: 'var(--color-on-success)',
                    onContainer: 'var(--color-on-success-container)',
                },
                info: {
                    DEFAULT: 'var(--color-info)',
                    container: 'var(--color-info-container)',
                    on: 'var(--color-on-info)',
                    onContainer: 'var(--color-on-info-container)',
                },
                warning: {
                    DEFAULT: 'var(--color-warning)',
                    container: 'var(--color-warning-container)',
                    on: 'var(--color-on-warning)',
                    onContainer: 'var(--color-on-warning-container)',
                },
                error: {
                    DEFAULT: 'var(--color-red-500)',
                    container: 'var(--color-error-container)',
                    on: 'var(--color-on-error)',
                    onContainer: 'var(--color-on-error-container)',
                },
                background: {
                    DEFAULT: 'var(--color-background)',
                    on: 'var(--color-on-background)',
                },
                surface: {
                    DEFAULT: 'var(--color-surface)',
                    on: 'var(--color-on-surface)',
                    variant: 'var(--color-surface-variant)',
                    onVariant: 'var(--color-on-surface-variant)',
                    inverse: 'var(--color-inverse-surface)',
                    inverseOn: 'var(--color-inverse-on-surface)',
                    tint: 'var(--color-surface-tint)',
                },
                outline: {
                    DEFAULT: 'var(--color-grey-300)',
                    variant: 'var(--color-outline-variant)',
                },
                shadow: 'var(--color-shadow)',
                scrim: 'var(--color-scrim)',
                inversePrimary: 'var(--color-inverse-primary)',

                /* Custom extensions */
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