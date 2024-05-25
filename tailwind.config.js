import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                'sans': ['sans-serif'],
                'serif': ['ui-serif', 'Georgia'],
                'mono': ['ui-monospace', 'SFMono-Regular'],
                'monasans': ['Mona Sans', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
