import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
// import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import  { Toaster } from 'react-hot-toast';
import GoogleOAuthProvide from "@/components/GoogleOAuthProvider";

export const metadata: Metadata = {
  title: "Voice App",
  description: "Voice App is a voice recognition app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        ><GoogleOAuthProvide>
         

          {children}
          <Toaster />
          </GoogleOAuthProvide>

        </ThemeProvider>
      </body>
    </html>
  );
}