import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Orbitron, JetBrains_Mono, Caveat, Architects_Daughter, Qwigley } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-cyber-loaded",
});

const qwigley = Qwigley({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-qwigley-loaded",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat-loaded",
});

const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-architects-loaded",
});

export const metadata: Metadata = {
  title: "CYBORG | Robotics &  Automation Club | NIT Rourkela",
  description: "CYBORG is the premier student-run robotics and artificial intelligence division of SAC, NIT Rourkela. Bridging the gap between theory and hardware implementation.",
  keywords: ["CYBORG", "NIT Rourkela", "Robotics", "Artificial Intelligence", "Student Club", "autonomous systems", "deep learning", "bento grid portfolio", "hardware", "engineering", "NITR"],
  authors: [{ name: "CYBORG NITR" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${orbitron.variable} ${qwigley.variable} ${jetbrainsMono.variable} ${caveat.variable} ${architectsDaughter.variable}`}
    >
      <body className="text-[#211c2b] selection:bg-[#9a83db]/40 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
