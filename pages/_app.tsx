import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import { SettingsProvider, Settings, useSettings } from "@/components/Context/SettingsProvider";

const settings: Settings = {
  allPossibleCategories: ['Blusa', 'Calca', 'Vestido'],
  imcRanges: [14, 20, 23.5, 28.7, 30, 32.5, 35.5],
  allSizesNames: ["PP", "P", "M", "G", "GG", "XG"],
  allDescriptions: [
    "Largo",
    "Folgado",
    "Levemente folgado",
    "Ideal",
    "Levemente Justo",
    "Justo",
    "Apertado",
  ],
  allColors: [
    "-red-500",
    "-yellow-500",
    "-[#a7d047]",
    "-green-500",
    "-[#e9d941]",
    "-yellow-500",
    "-red-500",
  ],
  allSizes: {
    PP: {
      busto: { min: 75, med: 80.5, max: 86 },
      cintura: { min: 65, med: 67.5, max: 70 },
      quadril: { min: 92, med: 95, max: 98 },
    },
    P: {
      busto: { min: 87, med: 91.5, max: 96 },
      cintura: { min: 70, med: 73, max: 76 },
      quadril: { min: 99, med: 102, max: 105 },
    },
    M: {
      busto: { min: 97, med: 99.5, max: 102 },
      cintura: { min: 77, med: 79, max: 81 },
      quadril: { min: 106, med: 108.5, max: 111 },
    },
    G: {
      busto: { min: 103, med: 106, max: 109 },
      cintura: { min: 82, med: 84.5, max: 87 },
      quadril: { min: 112, med: 115, max: 118 },
    },
    GG: {
      busto: { min: 110, med: 114.5, max: 119 },
      cintura: { min: 88, med: 90.5, max: 93 },
      quadril: { min: 119, med: 121.5, max: 124 },
    },
    XG: {
      busto: { min: 120, med: 125, max: 130 },
      cintura: { min: 94, med: 96.5, max: 99 },
      quadril: { min: 125, med: 127.5, max: 130 },
    }
  },
  alturaMin: 100,
  alturaMax: 250,
  pesoMin: 40,
  pesoMax: 300,
  idadeMin: 14,
  idadeMax: 118,
}


export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className="flex flex-col">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=0.5"
      ></meta>
      <Script
        id="google_analytics0"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-4R1WETXQ5E"
      ></Script>
      <Script id="google_analytics1">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-4R1WETXQ5E', {page_path:window.location.pathname});
  `}
      </Script>
      {/* <!-- Google Tag Manager --> */}
      <Script id="googletagmanager">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WQ8DS8'); console.warn('tagmanagerrr');`}</Script>
      {/* <!-- End Google Tag Manager --> */}
      <SettingsProvider initialSettings={settings}>
       <Component {...pageProps} />
      </SettingsProvider>
    </div>
  );
}
