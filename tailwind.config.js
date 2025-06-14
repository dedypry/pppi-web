import { heroui } from '@heroui/react';
import tailwindScrollbar from "tailwind-scrollbar"
import lineClamp from '@tailwindcss/line-clamp';
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./resources/views/**/*.php', './resources/js/**/*.{js,ts,jsx,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
            },
            backgroundImage: {
                'black-fade': 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0.2) 100%)',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        lineClamp,
        tailwindScrollbar(),
        heroui({
            prefix: 'heroui', // prefix for themes variables
            defaultTheme: 'light', // default theme from the themes object
            defaultExtendTheme: 'light',
            themes: {
                light: {
                    colors: {
                        default: {
                            50: '#fafafa',
                            100: '#f2f2f3',
                            200: '#ebebec',
                            300: '#e3e3e6',
                            400: '#dcdcdf',
                            500: '#d4d4d8',
                            600: '#afafb2',
                            700: '#8a8a8c',
                            800: '#656567',
                            900: '#404041',
                            foreground: '#000',
                            DEFAULT: '#d4d4d8',
                        },
                        primary: {
                            50: '#e2f2e1',
                            100: '#b9e0b6',
                            200: '#90ce8c',
                            300: '#67bc62',
                            400: '#3eaa37',
                            500: '#15980d',
                            600: '#117d0b',
                            700: '#0e6308',
                            800: '#0a4806',
                            900: '#062e04',
                            foreground: '#FAF8F8',
                            DEFAULT: '#15980d',
                        },
                        secondary: {
                            50: '#f6f6f6',
                            100: '#e9e9ea',
                            200: '#dcdbde',
                            300: '#d0ced2',
                            400: '#c3c1c5',
                            500: '#b6b4b9',
                            600: '#969599',
                            700: '#767578',
                            800: '#565658',
                            900: '#373638',
                            foreground: '#000',
                            DEFAULT: '#b6b4b9',
                        },
                        success: {
                            50: '#e2f8ec',
                            100: '#b9efd1',
                            200: '#91e5b5',
                            300: '#68dc9a',
                            400: '#40d27f',
                            500: '#17c964',
                            600: '#13a653',
                            700: '#0f8341',
                            800: '#0b5f30',
                            900: '#073c1e',
                            foreground: '#000',
                            DEFAULT: '#17c964',
                        },
                        warning: {
                            50: '#fef4e4',
                            100: '#fce4bd',
                            200: '#fad497',
                            300: '#f9c571',
                            400: '#f7b54a',
                            500: '#f5a524',
                            600: '#ca881e',
                            700: '#9f6b17',
                            800: '#744e11',
                            900: '#4a320b',
                            foreground: '#000',
                            DEFAULT: '#f5a524',
                        },
                        danger: {
                            50: '#fee1eb',
                            100: '#fbb8cf',
                            200: '#f98eb3',
                            300: '#f76598',
                            400: '#f53b7c',
                            500: '#f31260',
                            600: '#c80f4f',
                            700: '#9e0c3e',
                            800: '#73092e',
                            900: '#49051d',
                            foreground: '#FAF8F8',
                            DEFAULT: '#f31260',
                        },
                        background: '#ffffff',
                        foreground: '#000000',
                        content1: {
                            DEFAULT: '#ffffff',
                            foreground: '#000',
                        },
                        content2: {
                            DEFAULT: '#f4f4f5',
                            foreground: '#000',
                        },
                        content3: {
                            DEFAULT: '#e4e4e7',
                            foreground: '#000',
                        },
                        content4: {
                            DEFAULT: '#d4d4d8',
                            foreground: '#000',
                        },
                        focus: '#006FEE',
                        overlay: '#000000',
                    },
                },
                dark: {
                    colors: {
                        default: {
                            50: '#0d0d0e',
                            100: '#19191c',
                            200: '#26262a',
                            300: '#323238',
                            400: '#3f3f46',
                            500: '#65656b',
                            600: '#8c8c90',
                            700: '#b2b2b5',
                            800: '#d9d9da',
                            900: '#ffffff',
                            foreground: '#fff',
                            DEFAULT: '#3f3f46',
                        },
                        primary: {
                            50: '#062e04',
                            100: '#0a4806',
                            200: '#0e6308',
                            300: '#117d0b',
                            400: '#15980d',
                            500: '#3eaa37',
                            600: '#67bc62',
                            700: '#90ce8c',
                            800: '#b9e0b6',
                            900: '#e2f2e1',
                            foreground: '#000',
                            DEFAULT: '#15980d',
                        },
                        secondary: {
                            50: '#373638',
                            100: '#565658',
                            200: '#767578',
                            300: '#969599',
                            400: '#b6b4b9',
                            500: '#c3c1c5',
                            600: '#d0ced2',
                            700: '#dcdbde',
                            800: '#e9e9ea',
                            900: '#f6f6f6',
                            foreground: '#000',
                            DEFAULT: '#b6b4b9',
                        },
                        success: {
                            50: '#073c1e',
                            100: '#0b5f30',
                            200: '#0f8341',
                            300: '#13a653',
                            400: '#17c964',
                            500: '#40d27f',
                            600: '#68dc9a',
                            700: '#91e5b5',
                            800: '#b9efd1',
                            900: '#e2f8ec',
                            foreground: '#000',
                            DEFAULT: '#17c964',
                        },
                        warning: {
                            50: '#4a320b',
                            100: '#744e11',
                            200: '#9f6b17',
                            300: '#ca881e',
                            400: '#f5a524',
                            500: '#f7b54a',
                            600: '#f9c571',
                            700: '#fad497',
                            800: '#fce4bd',
                            900: '#fef4e4',
                            foreground: '#000',
                            DEFAULT: '#f5a524',
                        },
                        danger: {
                            50: '#49051d',
                            100: '#73092e',
                            200: '#9e0c3e',
                            300: '#c80f4f',
                            400: '#f31260',
                            500: '#f53b7c',
                            600: '#f76598',
                            700: '#f98eb3',
                            800: '#fbb8cf',
                            900: '#fee1eb',
                            foreground: '#000',
                            DEFAULT: '#f31260',
                        },
                        background: '#000000',
                        foreground: '#ffffff',
                        content1: {
                            DEFAULT: '#18181b',
                            foreground: '#fff',
                        },
                        content2: {
                            DEFAULT: '#27272a',
                            foreground: '#fff',
                        },
                        content3: {
                            DEFAULT: '#3f3f46',
                            foreground: '#fff',
                        },
                        content4: {
                            DEFAULT: '#52525b',
                            foreground: '#fff',
                        },
                        focus: '#006FEE',
                        overlay: '#ffffff',
                    },
                },
            },
            layout: {
                disabledOpacity: '0.8',
                radius: {
                    small: '2px', // rounded-small
                    medium: '4px', // rounded-medium
                    large: '6px', // rounded-large
                },
                borderWidth: {
                    small: '1px', // border-small
                    medium: '1px', // border-medium
                    large: '2px', // border-large
                },
            },
        }),
    ],
};


