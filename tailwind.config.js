/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#60a5fa", // blue-400
          DEFAULT: "#3b82f6", // blue-500
          dark: "#2563eb", // blue-600
        },
        secondary: "#10B981",
        dark: {
          lighter: "#f3f0e9", // Updated for light mode background
          DEFAULT: "#3b3a27", // Updated for light mode text
          darker: "#3b3a27", // Updated for light mode text
        },
        light: {
          lighter: "#3b3a27", // Updated for dark mode text
          DEFAULT: "#f3f0e9", // Updated for dark mode background
          darker: "#f3f0e9", // Updated for dark mode background
        },
        claude: {
          primary: "#6C63FF",
          secondary: "#8E33FF",
          surface: {
            light: "#f3f0e9", // Updated for light mode background
            dark: "#282826", // Updated for dark mode text
          },
          text: {
            light: {
              primary: "#3b3a27", // Updated for light mode text
              secondary: "#595959",
            },
            dark: {
              primary: "#f3f0e9", // Updated for dark mode background
              secondary: "#A3A3A3",
            },
          },
          border: {
            light: "#E5E5E5",
            dark: "#2D2D2D",
          },
          background: {
            light: "#f3f0e9", // Updated for light mode background
            dark: "#282826", // Updated for dark mode text
          },
        },
        "claude-text-light-primary": "#1a1a1a",
        "claude-text-light-secondary": "#4a4a4a",
        "claude-text-light-tertiary": "#717171",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Söhne", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace", "SF Mono"],
        greeting: ["__copernicus_669e4a"],
        content: ["__styreneB_5d855b"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-slow": "bounce 3s infinite",
        gradient: "gradient 15s ease infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.claude-text-light-secondary"),
            h1: {
              color: theme("colors.claude-text-light-primary"),
            },
            h2: {
              color: theme("colors.claude-text-light-primary"),
            },
            code: {
              color: theme("colors.claude-text-light-primary"),
              backgroundColor: "#f5f2eb",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
