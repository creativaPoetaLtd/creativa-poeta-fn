/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "320px",
      md: "768px",
      phone: "360px",
      ipod: "768px",
      sumsung: "412px",
      iphone: "414px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
      "": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
      landscape: { raw: "(min-height: 360px) and (orientation: landscape)" },
    },
    extend: {
      keyframes: {
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        typewriter: 'typewriter 2s steps(30, end)',
      },
    },
  },
  plugins: [],
};

const styles = `
@keyframes blink {
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 0.75s step-end infinite;
}
`;