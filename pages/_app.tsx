import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'


export default function App({ Component, pageProps }: AppProps) {
  return <div className='flex flex-col'>
     <meta name='viewport' content="width=device-width, initial-scale=0.5"></meta>
  <Script id='google_analytics0'async src="https://www.googletagmanager.com/gtag/js?id=G-4R1WETXQ5E"></Script>
<Script id='google_analytics1'>{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-4R1WETXQ5E', {page_path:window.location.pathname});
  `
  }
</Script>
{/* <!-- Google Tag Manager --> */}
<Script id='googletagmanager'>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WQ8DS8'); console.warn('tagmanagerrr');`}</Script>
{/* <!-- End Google Tag Manager --> */}
  <Component {...pageProps} />
  </div>

}
