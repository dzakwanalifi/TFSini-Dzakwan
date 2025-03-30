"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * Simple wrapper around next-themes ThemeProvider with default options
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Skip any server-side DOM manipulation to avoid hydration issues
  const [mounted, setMounted] = React.useState(false);
  
  // Only attempt to manipulate DOM after component is mounted on client
  React.useEffect(() => {
    setMounted(true);
    
    // Toast styling
    const style = document.createElement('style');
    style.textContent = `
      [data-sonner-toast] {
        font-family: var(--font-space-grotesk), system-ui, sans-serif !important;
      }
      [data-sonner-toast][data-type="success"] {
        --border-color: rgba(16, 185, 129, 0.3) !important;
        border-color: var(--border-color) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}