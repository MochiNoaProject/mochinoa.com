import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  include: ["./components/**/*.{ts,tsx,js,jsx}", "./app/**/*.{ts,tsx,js,jsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      keyframes: {
        down: {
          "0%": {
            translate: "0px -200px",
          },
          "100%": {
            translate: "0px 200px",
          },
        },
        rumble: {
          "0%": {
            rotate: "2deg",
          },
          "100%": {
            rotate: "-2deg",
          },
        },
        fadeInOut: {
          "0%": {
            opacity: 0,
          },
          "10%": {
            opacity: 1,
          },
          "80%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
    },
  },
  // The output directory for your css system
  outdir: "styled-system",
});
