/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,vue,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
