import type { Metadata } from "next";
import { Space_Grotesk as FontSpaceGrotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"; 
import { Toaster } from "sonner"; 
import "./globals.css";

// Configure Space Grotesk with all necessary weights
const fontSpaceGrotesk = FontSpaceGrotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TFSini - Info Transfer",
  description: "Kumpulan rekening dan e-wallet biar gampang transfer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Using suppressHydrationWarning to silence warnings about class differences
    <html lang="id" suppressHydrationWarning className={cn(fontSpaceGrotesk.variable, "light")}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Script to prevent flash of wrong theme - use simple approach without manipulating classList */}
        <script 
          dangerouslySetInnerHTML={{ 
            __html: `
              (function() {
                try {
                  document.documentElement.dataset.theme = 'light';
                } catch (e) {}
              })()
            `
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontSpaceGrotesk.className
        )}
      >
        <ThemeProvider>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
