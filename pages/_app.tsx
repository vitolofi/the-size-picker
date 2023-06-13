import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { Head } from 'next/document'

export default function App({ Component, pageProps }: AppProps) {
  return <>

  <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4R1WETXQ5E"></Script>
<Script>{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-4R1WETXQ5E', {page_path:window.location.pathname});
  `
  }
</Script>
  <Component {...pageProps} />
  </>

}
