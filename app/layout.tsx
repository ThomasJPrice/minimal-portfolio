import type { Metadata } from "next";
import "./globals.css";
import { EB_Garamond } from "next/font/google";
import Navbar from "@/components/Navbar";
import KeyboardNav from "@/components/KeyboardNav";
import Footer from "@/components/Footer";
import { IncrementViews } from "@/components/IncrementViews";

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-eb-garamond',
  })

export const metadata: Metadata = {
  title: "Thomas Price",
  description: "I'm an aspiring Software Engineer with a strong passion for building web applications with great user experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`scroll-smooth ${garamond.variable} ${garamond.className} bg-[#faf9f6] text-[#111111] text-[18px] leading-[1.7] mx-4 md:m-0 pb-8 lowercase`}
      >
        <Navbar />
        {children}
        <Footer />

        <KeyboardNav />
        <IncrementViews />
      </body>
    </html>
  );
}
