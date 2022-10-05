/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,vue,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#41b883",
                ["info-content"]: "#41b883",
                ["primary-dark"]: "#34495e",
            },
            backgroundColor: {
                ["tr-dark"]: "rgba(0,0,0,0.5)",
            },
        },
    },
    plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
