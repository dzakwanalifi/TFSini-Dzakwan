import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme'; // Import defaultTheme

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Use Space Grotesk for everything, but maintain the font class distinctions
        sans: ["var(--font-space-grotesk)", ...defaultTheme.fontFamily.sans],
        // Also use Space Grotesk for mono, but with different styling
        mono: ["var(--font-space-grotesk)", ...defaultTheme.fontFamily.mono],
        // Specific weights for headings if needed
        heading: ["var(--font-space-grotesk)", ...defaultTheme.fontFamily.sans],
      },
      
      // Add some additional font-weight utility classes
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // ... existing keyframes and animations
    },
  },
  // Remove dependency on tailwindcss-animate until you can install it
  plugins: [],
} satisfies Config;

export default config;
