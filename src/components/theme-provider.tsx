"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useEffect } from "react";

/**
 * Simple wrapper around next-themes ThemeProvider with default options
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    // Set light mode as default
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    
    // Add styling for toast in a safer way
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
      document.head.removeChild(style);
    };
  }, []);

  // Use next-themes forcedTheme for consistent rendering
  return (
    <NextThemesProvider 
      {...props} 
      forcedTheme="light" 
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}