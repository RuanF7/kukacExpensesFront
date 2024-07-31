import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: "#313131",
        fullBlack: "#000",
        orange: "#de330c",
        peach: "#f56342",
      },
      backgroundImage: {
        pageBg: "url('/images/darkbg.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
