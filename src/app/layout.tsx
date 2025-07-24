import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingAnimation from "@/components/LoadingAnimation";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Reflect Architects",
  description: "Modern architectural design and consultation services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <LoadingAnimation>
          <Navbar />
          {/* --- MODIFIED --- */}
          {/* This main element will grow to fill the space between Navbar and Footer */}
          <main className="flex-grow overflow-hidden">
            {children}
          </main>
          {/* --- END MODIFIED --- */}
          <Footer />
        </LoadingAnimation>
      </body>
    </html>
  );
}