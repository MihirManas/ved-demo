import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ved Upskilling - Master AI, Full Stack & Embedded Systems",
  description: "Elite training programs for software and hardware engineers. Build your proof of competence with industry experts.",
  keywords: ["AI Internship Program", "Data Science Internship", "Python Internship", "Web Development Internship", "Placement Assistance", "Career Accelerator"],
  authors: [{ name: "Ved Upskilling" }],
  openGraph: {
    title: "Ved Upskilling - Master AI, Full Stack & Embedded Systems",
    description: "Elite training programs for software and hardware engineers.",
    type: "website",
    locale: "en_US",
    url: "https://vedupskilling.com",
    siteName: "Ved Upskilling",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ved Upskilling",
    description: "Master AI, Full Stack & Embedded Systems",
  },
  alternates: {
    canonical: "https://vedupskilling.com",
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
};

import Analytics from "@/components/Analytics";
import FloatingWhatsApp from "@/components/ui/floating-whatsapp";
import SchemaMarkup from "@/components/SchemaMarkup";
import VedTracker from "@/components/VedTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaMarkup 
          type="Organization"
          data={{
            name: "Ved Upskilling",
            url: "https://vedupskilling.com",
            logo: "https://vedupskilling.com/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-9876543210",
              contactType: "admissions"
            }
          }}
        />
        <SchemaMarkup 
          type="WebSite"
          data={{
            name: "Ved Upskilling",
            url: "https://vedupskilling.com"
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <FloatingWhatsApp />
        </ThemeProvider>
        <VedTracker />
        <Analytics />
      </body>
    </html>
  );
}
