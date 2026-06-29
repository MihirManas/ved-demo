import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BootSequenceWrapper from "@/components/BootSequenceWrapper";
import FloatingActionButton from "@/components/FloatingActionButton";
import ParticleCanvas from "@/components/ParticleCanvas";
import Script from "next/script";
import TrackVisit from "@/components/TrackVisit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ved Upskilling - Master AI, Full Stack & Embedded Systems",
  description: "Elite curriculums engineered by industry veterans. Master Full Stack NodeJS, AI, and Embedded Systems through precision engineering and real-world execution.",
  verification: {
    google: "PLACEHOLDER_GOOGLE_SITE_VERIFICATION",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FA" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        
        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "PLACEHOLDER_CLARITY_ID");
          `}
        </Script>
        
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'PLACEHOLDER_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
        
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=PLACEHOLDER_GA4_ID`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'PLACEHOLDER_GA4_ID');
          `}
      </head>
      <body className={inter.className}>
        <TrackVisit />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BootSequenceWrapper>
            <div className="relative min-h-screen bg-[#F8F9FA] dark:bg-black text-gray-900 dark:text-white overflow-x-clip transition-colors duration-1000 ease-in-out">
              
              {/* Background Overlays */}
              <div className="fixed inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out z-0 bg-gradient-to-tr from-[#E6C875]/10 via-[#F8F9FA]/50 to-white/80 dark:opacity-0 opacity-100" />
              <div className="fixed inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out z-0 bg-gradient-to-tr from-[#E6C875]/5 via-black to-black/80 dark:opacity-100 opacity-0" />
              
              <ParticleCanvas />
              <Navbar />
              
              <main className="relative z-10 pt-24">
                {children}
              </main>

              <Footer />
              <FloatingActionButton />
            </div>
          </BootSequenceWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
