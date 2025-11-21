import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gregory Golonka ",
  description: "Portfolio of personal projects.",
  openGraph: {
    title: "Gregory Golonka",
    description: "Portfolio of personal projects.",
    url: "https://gtgolonka.com",
    siteName: "Gregory Golonka Portfolio",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavBar />
        {children}
        <Analytics/>
        
      </body>
    </html>
  );
}
