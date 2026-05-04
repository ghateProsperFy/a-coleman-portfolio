import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

export const metadata = {
  title: "H.Studio — Harvey Specter",
  description:
    "H.Studio is a full-service creative studio creating beautiful digital experiences and products.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
