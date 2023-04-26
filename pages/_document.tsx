import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/> 
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap" rel="stylesheet"></link>
      </Head>

      <body className='bg-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
