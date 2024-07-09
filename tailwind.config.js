/** @type {import('tailwindcss').Config} */

const rem0_10 = { ...Array.from(Array(11)).map((_, i) => `${i / 10}rem`) };
const rem0_100 = { ...Array.from(Array(101)).map((_, i) => `${i / 10}rem`) };
const rem0_800 = { ...Array.from(Array(801)).map((_, i) => `${i / 10}rem`) };

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            borderWidth: rem0_10,
            borderRadius: rem0_100,
            fontSize: rem0_100,
            lineHeight: rem0_100,
            minWidth: rem0_800,
            minHeight: rem0_800,
            spacing: rem0_800,
            screens: {
                tablet: { max: '1199px' },
                mobile: { max: '767px' },
            },
        },
    },
    plugins: [],
};
