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
            screens: {
                big: '1600px'
            },
            colors: {
                primary: {
                    DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
                    hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
                    active: 'rgb(var(--color-primary-active) / <alpha-value>)',
                    foreground: 'rgb(var(--color-primary-foreground) / <alpha-value>)'
                },
                secondary: {
                    DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
                    hover: 'rgb(var(--color-secondary-hover) / <alpha-value>)',
                    active: 'rgb(var(--color-secondary-active) / <alpha-value>)',
                    foreground: 'rgb(var(--color-secondary-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
                    hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
                    foreground: 'rgb(var(--color-accent-foreground) / <alpha-value>)'
                },
                surface: {
                    DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
                    secondary: 'rgb(var(--color-surface-secondary) / <alpha-value>)',
                    hover: 'rgb(var(--color-surface-hover) / <alpha-value>)'
                },
                background: {
                    DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
                    secondary: 'rgb(var(--color-background-secondary) / <alpha-value>)',
                    hover: 'rgb(var(--color-background-hover) / <alpha-value>)'
                },
                text: {
                    primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
                    tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
                    disabled: 'rgb(var(--color-text-disabled) / <alpha-value>)',
                    placeholder: 'rgb(var(--color-text-placeholder) / <alpha-value>)',
                    inverse: 'rgb(var(--color-text-inverse) / <alpha-value>)'
                },
                border: {
                    DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
                    hover: 'rgb(var(--color-border-hover) / <alpha-value>)',
                    focus: 'rgb(var(--color-border-focus) / <alpha-value>)',
                    error: 'rgb(var(--color-border-error) / <alpha-value>)'
                },
                success: {
                    DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
                    hover: 'rgb(var(--color-success-hover) / <alpha-value>)',
                    foreground: 'rgb(var(--color-success-foreground) / <alpha-value>)',
                    background: 'rgb(var(--color-success-background) / <alpha-value>)'
                },
                error: {
                    DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
                    hover: 'rgb(var(--color-error-hover) / <alpha-value>)',
                    foreground: 'rgb(var(--color-error-foreground) / <alpha-value>)',
                    background: 'rgb(var(--color-error-background) / <alpha-value>)'
                },
                warning: {
                    DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
                    hover: 'rgb(var(--color-warning-hover) / <alpha-value>)',
                    foreground: 'rgb(var(--color-warning-foreground) / <alpha-value>)',
                    background: 'rgb(var(--color-warning-background) / <alpha-value>)'
                },
                info: {
                    DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
                    hover: 'rgb(var(--color-info-hover) / <alpha-value>)',
                    foreground: 'rgb(var(--color-info-foreground) / <alpha-value>)',
                    background: 'rgb(var(--color-info-background) / <alpha-value>)'
                },
                icon: {
                    DEFAULT: 'rgb(var(--color-icon) / <alpha-value>)',
                    primary: 'rgb(var(--color-primary) / <alpha-value>)',
                    error: 'rgb(var(--color-error) / <alpha-value>)'
                },
                tooltip: {
                    DEFAULT: '#1F1F1F'
                },
                hover: 'rgb(var(--color-hover) / <alpha-value>)',
                active: 'rgb(var(--color-active) / <alpha-value>)',
                'focus-ring': 'rgb(var(--color-focus-ring) / <alpha-value>)',
                disabled: 'rgb(var(--color-disabled) / <alpha-value>)',
                'disabled-foreground': 'rgb(var(--color-disabled-foreground) / <alpha-value>)',
                input: {
                    DEFAULT: 'rgb(var(--color-input-background) / <alpha-value>)',
                    border: 'rgb(var(--color-input-border) / <alpha-value>)',
                    'border-hover': 'rgb(var(--color-input-border-hover) / <alpha-value>)',
                    'border-focus': 'rgb(var(--color-input-border-focus) / <alpha-value>)',
                    text: 'rgb(var(--color-input-text) / <alpha-value>)',
                    placeholder: 'rgb(var(--color-input-placeholder) / <alpha-value>)'
                },
                shadow: 'rgb(var(--color-shadow) / <alpha-value>)',
                overlay: 'rgb(var(--color-overlay) / <alpha-value>)',
                scrim: 'var(--color-scrim)',
                inversePrimary: 'var(--color-inverse-primary)',
                chart: {
                    '1': 'var(--chart-1)',
                    '2': 'var(--chart-2)',
                    '3': 'var(--chart-3)',
                    '4': 'var(--chart-4)',
                    '5': 'var(--chart-5)'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                panel: 'var(--panel-radius)'
            },
            keyframes: {
                'slide-in-from-right': {
                    '0%': {
                        transform: 'translateX(100%)'
                    },
                    '100%': {
                        transform: 'translateX(0)'
                    }
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
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                slideUp: {
                    '0%': {
                        transform: 'translateY(100%)',
                        opacity: 0
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: 1
                    }
                },
                panelSlideUp: {
                    '0%': {
                        transform: 'translateY(10%)',
                        opacity: 1
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: 1
                    }
                },
                slideDown: {
                    '0%': {
                        transform: 'translateY(0)',
                        opacity: 0
                    },
                    '100%': {
                        transform: 'translateY(100%)',
                        opacity: 1
                    }
                },
                fadeOut: {
                    '0%': {
                        opacity: 1
                    },
                    '100%': {
                        opacity: 0
                    }
                },
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0)'
                    },
                    '50%': {
                        transform: 'translateY(-3px)'
                    }
                },
                marquee: {
                    '0%': {
                        transform: 'translateX(0%)'
                    },
                    '100%': {
                        transform: 'translateX(-50%)'
                    }
                },
                shine: {
                    '0%': {
                        backgroundPosition: '100%'
                    },
                    '100%': {
                        backgroundPosition: '-100%'
                    }
                },
                shimmer: {
                    from: {
                        backgroundPosition: '0 0'
                    },
                    to: {
                        backgroundPosition: '-200% 0'
                    }
                },
                'star-movement-bottom': {
                    '0%': {
                        transform: 'translate(0%, 0%)',
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translate(-100%, 0%)',
                        opacity: '0'
                    }
                },
                'star-movement-top': {
                    '0%': {
                        transform: 'translate(0%, 0%)',
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translate(100%, 0%)',
                        opacity: '0'
                    }
                },
                scroll: {
                    to: {
                        transform: 'translate(calc(-50% - 0.5rem))'
                    }
                }
            },
            animation: {
                shimmer: 'shimmer 2s linear infinite',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'caret-blink': 'caret-blink 1.25s ease-out infinite',
                'slide-up': 'slideUp 0.5s ease-in-out',
                'panel-slide-up': 'panelSlideUp 0.5s ease-in-out',
                'slide-up-slow': 'slideUp 0.5s ease-in-out',
                'slide-down': 'slideUp 0.3s ease-in-out',
                'fade-out': 'fadeOut 0.3s ease-in-out',
                float: 'float 1s ease-linear infinite',
                marquee: 'marquee 20s linear infinite',
                shine: 'shine linear infinite',
                'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
                'star-movement-top': 'star-movement-top linear infinite alternate',
                'cell-ripple': 'cell-ripple var(--duration,200ms) ease-out var(--delay,0ms) 1',
                scroll: 'scroll var(--animation-duration, 60s) var(--animation-direction, forwards) linear infinite'
            },
            fontFamily: {
                // Set FiraGO as the default sans font
                sans: [
                    'FiraGO',
                    'Noto Sans Georgian',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'sans-serif'
                ],
                // Optional: Create a specific Georgian font utility
                georgian: [
                    'FiraGO',
                    'Noto Sans Georgian',
                    'sans-serif'
                ],
                lineHeight: {
                    'tight-georgian': '1.2',    // For buttons and compact text
                    'normal-georgian': '1.3',   // For body text
                    'relaxed-georgian': '1.4',  // For comfortable reading
                },
                poppins: [
                    'Poppins',
                    'sans-serif'
                ],
                roboto: [
                    'var(--font-roboto)',
                    'sans-serif'
                ],
                sans: [
                    'var(--font-inter)',
                    'sans-serif'
                ]
            },
            fontSize: {
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '4rem',
                '7xl': '6rem',
                '8xl': '12rem',
                '9xl': '16rem',
                '10xl': '20rem'
            },
            iconSize: {}
        }
    },
    plugins: [
        require('tailwindcss-animate'),
        shorthands,
    ],
}