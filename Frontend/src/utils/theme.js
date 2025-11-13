// src/utils/theme.js
export const theme = {
    fonts: {
        primary: "'Poppins', sans-serif",
    },
    colors: {
        light: {
            primary: '#2d6a4f',      // Forest Green
            secondary: '#40916c',    // Sage
            accent: '#74c69d',       // Mint
            background: '#ffffff',
            surface: '#f8faf9',
            text: {
                primary: '#1b4332',
                secondary: '#40916c',
            },
            border: '#95d5b2',
        },
        dark: {
            primary: '#778a35',      // Olive
            secondary: '#d1e2c4',    // Sage Green
            accent: '#ebebe8',       // Pewter
            background: '#31352e',   // Olive Green
            surface: '#3b4136',      // Slightly lighter Olive Green
            text: {
                primary: '#d1e2c4',
                secondary: '#b7c4a7',
            },
            border: '#778a35',
        },
    },
};

export const createCssVariables = (isDark = false) => {
    const mode = isDark ? 'dark' : 'light';
    const colors = theme.colors[mode];

    return {
        '--font-primary': theme.fonts.primary,
        '--color-primary': colors.primary,
        '--color-secondary': colors.secondary,
        '--color-accent': colors.accent,
        '--color-background': colors.background,
        '--color-surface': colors.surface,
        '--color-text-primary': colors.text.primary,
        '--color-text-secondary': colors.text.secondary,
        '--color-border': colors.border,
    };
};