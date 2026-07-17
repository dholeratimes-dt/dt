import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingIcons from "./components/Floating";
import ScrollToTop from "./components/ScrollToTop";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />

        {/* ── Google Tag Manager ── */}
        <GoogleTagManager gtmId="GTM-NLL6M3PL" />

        <meta
          name="google-site-verification"
          content="w4B8pqZZDySMLUmxZYsGxeKSCsTI_aHk-myN3iKS3CU"
        />

        <Script          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18098009906"
        />
        <Script />
        <Script type="text/javascript">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','AW-18098009906');
           `}
        </Script>
      </head>

      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLL6M3PL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ScrollToTop />
        <Navbar />

        <div className="pt-20">{children}</div>

        <FloatingIcons />
        <Footer />
      </body>
    </html>
  );
}
