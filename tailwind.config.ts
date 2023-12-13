import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-green": {
          mg: "#0D5C3D",
          "mg-100": "#99D98C",
          "mg-200": "#76C893",
          "mg-300": "#009E60",
        },
        "cod-gray": {
          cg: "#1A1A1A",
          "cg-50": "#F8F9FA",
          "cg-100": "#E9ECEF",
          "cg-200": "#DEE2E6",
          "cg-300": "#CED4DA",
          "cg-400": "#6C757D",
          "cg-500": "#495057",
          "cg-600": "#343A40",
        },
        "green-g": {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
        },
        "yellow-y": {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        "red-r": {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
        },
        overlay: "rgba(26, 26, 26, 0.3)",
        offwhite: "#FBFBFBFB",
        "light-green-shade": "#0D5C3D0D",
      },
      fontSize: {
        "H1-03": [
          "81px",
          {
            lineHeight: "96px",
            fontWeight: "600",
            letterSpacing: "-4%",
          },
        ],
        "H2-03": [
          "54px",
          {
            lineHeight: "72px",
            fontWeight: "600",
            letterSpacing: "-4%",
          },
        ],
        "H3-03": [
          "36px",
          {
            lineHeight: "48px",
            fontWeight: "500",
            letterSpacing: "-2%",
          },
        ],
        "H4-03": [
          "24px",
          {
            lineHeight: "36px",
            fontWeight: "500",
            letterSpacing: "-2%",
          },
        ],

        "H5-03": [
          "20px",
          {
            lineHeight: "30px",
            fontWeight: "500",
          },
        ],
        "H6-03": [
          "11px",
          {
            lineHeight: "19px",
            fontWeight: "500",
          },
        ],

        "LP-03": [
          "24px",
          {
            lineHeight: "36px",
            fontWeight: "500",
          },
        ],
        "MP-03": [
          "20px",
          {
            lineHeight: "30px",
            fontWeight: "500",
          },
        ],
        "SP-03": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        "BC-03": [
          "14px",
          {
            lineHeight: "21px",
            fontWeight: "500",
          },
        ],
        "SC-03": [
          "12px",
          {
            lineHeight: "20px",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
