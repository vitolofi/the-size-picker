import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import { SettingsProvider, Settings, useSettings } from "@/components/Context/SettingsProvider";

const settings: Settings = {
  allPossibleCategories: ['Blusa', 'Calça', 'Vestido'],
  imcRanges: [14, 20, 23.5, 28.7, 30, 32.5, 35.5],
  allSizesNames: ["PP", "P", "M", "G", "GG", "XG"],
  allDescriptions: [
    "Largo",
    "Folgado",
    "Levemente Justo",
    "Ideal",
    "Levemente Folgado",
    "Justo",
    "Apertado",
  ],
  allColors: [
    "-red-400",
    "-yellow-400",
    "-[#a7d047]",
    "-green-500",
    "-[#e9d941]",
    "-yellow-500",
    "-red-500",
  ],
  allSizes: {
    PP: {
      busto: { min: 71, med: 73, max: 75 },
      cintura: { min: 70, med: 72, max: 74 },
      quadril: { min: 87, med: 89, max: 91 },
    },
    P: {
      busto: { min: 76, med: 78, max: 80 },
      cintura: { min: 75, med: 77, max: 79 },
      quadril: { min: 92, med: 94, max: 96 },
    },
    M: {
      busto: { min: 81, med: 83, max: 85 },
      cintura: { min: 80, med: 82, max: 84 },
      quadril: { min: 97, med: 99, max: 101 },
    },
    G: {
      busto: { min: 86, med: 88, max: 90 },
      cintura: { min: 85, med: 87, max: 89 },
      quadril: { min: 102, med: 104, max: 106 },
    },
    GG: {
      busto: { min: 91, med: 93, max: 95 },
      cintura: { min: 90, med: 92, max: 94 },
      quadril: { min: 107, med: 109, max: 112 },
    },
    XG: {
      busto: { min: 96, med: 98.5, max: 101 },
      cintura: { min: 95, med: 97.5, max: 100 },
      quadril: { min: 111, med: 113, max: 115 },
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

    <meta id="myViewport" name="viewport" content="width=380"/>
<Script id="viewportFunction">{`
  window.onload = function () {
    var mvp = document.getElementById('myViewport');
    mvp.setAttribute('content','width=580');
}
  `}
</Script> 
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
