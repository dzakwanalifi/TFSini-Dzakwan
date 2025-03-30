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
  title: "TFSini - Info Pembayaran",
  description: "Kumpulan rekening dan e-wallet untuk kemudahan transfer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add suppressHydrationWarning to handle any minor text differences
    <html lang="id" suppressHydrationWarning className={fontSpaceGrotesk.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontSpaceGrotesk.className
        )}
      >
        {/* Simplify the provider props since they're now defined in the component */}
        <ThemeProvider>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
