/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F5F1",
        surface: "#FFFFFF",
        ink: "#151A21",
        "ink-muted": "#5B6572",
        border: "#E1E4E8",
        accent: {
          DEFAULT: "#0F6B62",
          soft: "#E3EFED",
          hover: "#0C554E",
        },
        status: {
          open: "#2B65D9",
          progress: "#B4790A",
          resolved: "#227A4E",
        },
        priority: {
          low: "#5B6572",
          medium: "#B4790A",
          high: "#C23B3B",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
