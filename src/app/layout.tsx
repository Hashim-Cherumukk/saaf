import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Saaf Couture | Premium Qamees & Perfumes",
  description: "Elegance in every detail.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <ThemeProvider>
          <SmoothScroll>
            <Navbar />
            <div className="flex-grow">{children}</div> {/* Wrap children to push footer down */}
            <Footer /> {/* Add this */}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}