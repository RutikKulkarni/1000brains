import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Prof. Sameer Sahasrabudhe | 1000brains",
    template: "%s | 1000brains",
  },
  description:
    "Portfolio of Professor Sameer Sahasrabudhe — Designer, Film-maker, Animator, EdTech Researcher, Professor, Blogger, Speaker, Percussionist, Ideator & Calligrapher. 10 traits, 1 digital identity.",
  keywords: [
    "Sameer Sahasrabudhe",
    "1000brains",
    "IIT Gandhinagar",
    "EdTech",
    "Design",
    "Film-maker",
    "Professor of Practice",
    "MOOC",
    "NPTEL",
    "SWAYAM",
  ],
  authors: [{ name: "Prof. Sameer Sahasrabudhe" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "1000brains",
    title: "Prof. Sameer Sahasrabudhe | 1000brains",
    description:
      "10 traits, 1 digital identity — Designer, Film-maker, Animator, EdTech Researcher, Professor, Blogger, Speaker, Percussionist, Ideator & Calligrapher.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prof. Sameer Sahasrabudhe | 1000brains",
    description:
      "10 traits, 1 digital identity — Designer, Film-maker, Animator, EdTech Researcher, Professor & more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
