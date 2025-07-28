import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/components/root/SessionWrapper";
import { ThemeProvider as NextThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Eco Voice",
    template: "%s | Eco Voice",
  },
  description: "Platform untuk mengisi survei kinerja para pelajar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans transition-colors ease-in-out transform duration-500`}>
         
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            <SessionWrapper>
          {children}
          </SessionWrapper>
        </NextThemeProvider>
      </body>
    </html>
  );
}
