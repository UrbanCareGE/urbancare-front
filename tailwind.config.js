/* eslint-disable */
/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

const shorthands = plugin(function ({ addUtilities }) {
  addUtilities({
    '.global-centered': {
      position: 'fixed',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      'flex-direction': 'row',
      'flex-grow': 1,
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
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
        sm: '640px', // large phones
        md: '768px', // tablets
        lg: '1024px', // laptops
        xl: '1280px', // desktops
        '2xl': '1536px', // large desktops

        // Max-width - "this size and DOWN"
        'max-sm': { max: '639px' }, // only mobile
        'max-md': { max: '767px' }, // mobile + small tablets
        'max-lg': { max: '1023px' }, // below laptop
        'max-xl': { max: '1279px' }, // below desktop
      },
      colors: {
        /*
         * COLOR USAGE QUICK REFERENCE:
         * ────────────────────────────────────────────────────────────────
         * bg-primary          → Primary buttons, main CTAs
         * bg-primary-container → Soft primary backgrounds (badges, chips)
         * text-primary        → Primary button text (usually white)
         *
         * bg-secondary        → Secondary/cancel buttons
         * bg-secondary-container → Soft grey backgrounds
         *
         * bg-tertiary         → Purple accent buttons, special features
         * bg-tertiary-container → Soft purple backgrounds for badges/tags
         * text-tertiary       → Purple accent text
         *
         * bg-surface          → Card backgrounds
         * bg-surface-elevated → Modal/dropdown backgrounds
         * bg-surface-variant  → Sidebar, secondary panels
         *
         * text-text-primary   → Main body text
         * text-text-secondary → Subtitles, less important text
         * text-text-tertiary  → Hints, placeholders
         *
         * bg-success/error/warning/info → State feedback colors
         * ────────────────────────────────────────────────────────────────
         */
        // PRIMARY (Blue) - Main actions, links, CTAs
        // Use: bg-primary, text-primary-foreground, hover:bg-primary-hover
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          active: 'rgb(var(--color-primary-active) / <alpha-value>)',
          foreground: 'rgb(var(--color-primary-foreground) / <alpha-value>)',
          container: {
            DEFAULT: 'rgb(var(--color-primary-container) / <alpha-value>)',
            foreground:
              'rgb(var(--color-primary-container-foreground) / <alpha-value>)',
          },
        },
        // SECONDARY (Grey) - Cancel buttons, less important actions
        // Use: bg-secondary, text-secondary-foreground, hover:bg-secondary-hover
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          hover: 'rgb(var(--color-secondary-hover) / <alpha-value>)',
          active: 'rgb(var(--color-secondary-active) / <alpha-value>)',
          foreground: 'rgb(var(--color-secondary-foreground) / <alpha-value>)',
          container: {
            DEFAULT: 'rgb(var(--color-secondary-container) / <alpha-value>)',
            foreground:
              'rgb(var(--color-secondary-container-foreground) / <alpha-value>)',
          },
        },
        // TERTIARY (Purple) - Accent, badges, tags, special features
        // Use: bg-tertiary, text-tertiary, bg-tertiary-container
        tertiary: {
          DEFAULT: 'rgb(var(--color-tertiary) / <alpha-value>)',
          dark: 'rgb(var(--color-tertiary-dark) / <alpha-value>)',
          light: 'rgb(var(--color-tertiary-light) / <alpha-value>)',
          hover: 'rgb(var(--color-tertiary-hover) / <alpha-value>)',
          active: 'rgb(var(--color-tertiary-active) / <alpha-value>)',
          foreground: 'rgb(var(--color-tertiary-foreground) / <alpha-value>)',
          container: {
            DEFAULT: 'rgb(var(--color-tertiary-container) / <alpha-value>)',
            foreground:
              'rgb(var(--color-tertiary-container-foreground) / <alpha-value>)',
          },
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
          foreground: 'rgb(var(--color-accent-foreground) / <alpha-value>)',
        },
        // SURFACE - Card/panel backgrounds
        // surface: cards | elevated: modals/dropdowns | variant: sidebars
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          elevated: 'rgb(var(--color-surface-elevated) / <alpha-value>)',
          variant: 'rgb(var(--color-surface-variant) / <alpha-value>)',
          container: 'rgb(var(--color-surface-container) / <alpha-value>)',
          'container-high':
            'rgb(var(--color-surface-container-high) / <alpha-value>)',
          secondary: 'rgb(var(--color-surface-secondary) / <alpha-value>)',
          hover: 'rgb(var(--color-surface-hover) / <alpha-value>)',
        },
        // BACKGROUND - Page/app background
        background: {
          DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          secondary: 'rgb(var(--color-background-secondary) / <alpha-value>)',
          hover: 'rgb(var(--color-background-hover) / <alpha-value>)',
        },
        // TEXT COLORS
        // primary: main text | secondary: subtitles | tertiary: hints
        foreground: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
          disabled: 'rgb(var(--color-text-disabled) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          light: 'rgb(var(--color-border-light) / <alpha-value>)',
          medium: 'rgb(var(--color-border-medium) / <alpha-value>)',
          strong: 'rgb(var(--color-border-strong) / <alpha-value>)',
          hover: 'rgb(var(--color-border-hover) / <alpha-value>)',
          focus: 'rgb(var(--color-border-focus) / <alpha-value>)',
          error: 'rgb(var(--color-border-error) / <alpha-value>)',
        },
        // STATE COLORS - Feedback & status indicators
        // success: completed actions, confirmations
        success: {
          DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
          hover: 'rgb(var(--color-success-hover) / <alpha-value>)',
          foreground: 'rgb(var(--color-success-foreground) / <alpha-value>)',
          background: 'rgb(var(--color-success-background) / <alpha-value>)',
          container: {
            DEFAULT: 'rgb(var(--color-success-container) / <alpha-value>)',
            foreground:
              'rgb(var(--color-success-container-foreground) / <alpha-value>)',
          },
        },
        // error: errors, deletions, destructive actions
        error: {
          DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
          hover: 'rgb(var(--color-error-hover) / <alpha-value>)',
          foreground: 'rgb(var(--color-error-foreground) / <alpha-value>)',
          background: 'rgb(var(--color-error-background) / <alpha-value>)',
          container: {
            DEFAULT: 'rgb(var(--color-error-container) / <alpha-value>)',
            foreground:
              'rgb(var(--color-error-container-foreground) / <alpha-value>)',
          },
        },
        // warning: caution, pending, requires attention
        warning: {
          DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
          hover: 'rgb(var(--color-warning-hover) / <alpha-value>)',
          foreground: 'rgb(var(--color-warning-foreground) / <alpha-value>)',
          background: 'rgb(var(--color-warning-background) / <alpha-value>)',
          container: {
            DEFAULT: 'rgb(var(--color-warning-container) / <alpha-value>)',
            foreground:
              'rgb(var(--color-warning-container-foreground) / <alpha-value>)',
          },
        },
        // info: tips, help, informational messages
        info: {
          DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
          hover: 'rgb(var(--color-info-hover) / <alpha-value>)',
          foreground: 'rgb(var(--color-info-foreground) / <alpha-value>)',
          background: 'rgb(var(--color-info-background) / <alpha-value>)',
          container: {
            DEFAULT: 'rgb(var(--color-info-container) / <alpha-value>)',
            foreground:
              'rgb(var(--color-info-container-foreground) / <alpha-value>)',
          },
        },
        icon: {
          DEFAULT: 'rgb(var(--color-icon) / <alpha-value>)',
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          error: 'rgb(var(--color-error) / <alpha-value>)',
        },
        tooltip: {
          DEFAULT: '#1F1F1F',
        },
        hover: 'rgb(var(--color-hover) / <alpha-value>)',
        active: 'rgb(var(--color-active) / <alpha-value>)',
        'focus-ring': 'rgb(var(--color-focus-ring) / <alpha-value>)',
        disabled: 'rgb(var(--color-disabled) / <alpha-value>)',
        'disabled-foreground':
          'rgb(var(--color-disabled-foreground) / <alpha-value>)',
        input: {
          DEFAULT: 'rgb(var(--color-input-background) / <alpha-value>)',
          background: 'rgb(var(--color-input-background) / <alpha-value>)',
          'background-hover':
            'rgb(var(--color-input-background-hover) / <alpha-value>)',
          'background-disabled':
            'rgb(var(--color-input-background-disabled) / <alpha-value>)',
          border: 'rgb(var(--color-input-border) / <alpha-value>)',
          'border-hover':
            'rgb(var(--color-input-border-hover) / <alpha-value>)',
          'border-focus':
            'rgb(var(--color-input-border-focus) / <alpha-value>)',
          'border-error':
            'rgb(var(--color-input-border-error) / <alpha-value>)',
          text: 'rgb(var(--color-input-text) / <alpha-value>)',
          placeholder: 'rgb(var(--color-input-placeholder) / <alpha-value>)',
          'ring-focus': 'rgb(var(--color-input-focus-ring) / <alpha-value>)',
          'ring-error': 'rgb(var(--color-input-error-ring) / <alpha-value>)',
        },
        shadow: 'rgb(var(--color-shadow) / <alpha-value>)',
        overlay: 'rgb(var(--color-overlay) / <alpha-value>)',
        scrim: 'var(--color-scrim)',
        inversePrimary: 'var(--color-inverse-primary)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        panel: 'var(--panel-radius)',
      },
      keyframes: {
        'slide-in-from-right': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'caret-blink': {
          '0%,70%,100%': {
            opacity: '1',
          },
          '20%,50%': {
            opacity: '0',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        panelSlideUp: {
          '0%': {
            transform: 'translateY(10%)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        slideDown: {
          '0%': {
            transform: 'translateY(0)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: 1,
          },
        },
        fadeOut: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-3px)',
          },
        },
        marquee: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
        shine: {
          '0%': {
            backgroundPosition: '100%',
          },
          '100%': {
            backgroundPosition: '-100%',
          },
        },
        shimmer: {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
        'star-movement-bottom': {
          '0%': {
            transform: 'translate(0%, 0%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translate(-100%, 0%)',
            opacity: '0',
          },
        },
        'star-movement-top': {
          '0%': {
            transform: 'translate(0%, 0%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translate(100%, 0%)',
            opacity: '0',
          },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
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
        'star-movement-bottom':
          'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
        'cell-ripple':
          'cell-ripple var(--duration,200ms) ease-out var(--delay,0ms) 1',
        scroll:
          'scroll var(--animation-duration, 60s) var(--animation-direction, forwards) linear infinite',
      },
      fontFamily: {
        sans: [
          'FiraGO',
          'Noto Sans Georgian',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        georgian: ['FiraGO', 'Noto Sans Georgian', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
      lineHeight: {
        'tight-georgian': '1.2',
        'normal-georgian': '1.3',
        'relaxed-georgian': '1.4',
      },
      fontSize: {
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '6rem',
        '8xl': '12rem',
        '9xl': '16rem',
        '10xl': '20rem',
      },
      iconSize: {},
    },
  },
  plugins: [require('tailwindcss-animate'), shorthands],
};
