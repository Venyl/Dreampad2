/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-900': '#0a0a0f',
                'primary-800': '#11111a',
                'primary-700': '#151520',
                'primary-600': '#191926',
                'primary-500': '#222233',
                'primary-400': '#2b2b40',
                'primary-300': '#33334d',
                'primary-200': '#3b3b59',
                'primary-100': '#434366',
                'primary-50': '#8787cc',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            },
            boxShadow: {
                neoShadow: '.2em .2em 0px 0px #0a0a0f',
            },
            animation: {
                'fade-in': 'fade-in 1.5s ease-in forwards',
            },
        },
    },
    plugins: [],
};
