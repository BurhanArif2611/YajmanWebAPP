import type { Config } from "tailwindcss";
import theme from "./theme";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme,
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
