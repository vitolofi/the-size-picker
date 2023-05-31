import Image from 'next/image'
import { Inter,Roboto } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })
export const roboto = Roboto({ subsets:['latin'], weight:'100'})

export default function Home() { 
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
    <div className={`${roboto.className} text-[3rem]`}>THE SIZE PICKER</div> 
      <div className={`${roboto.className} mb-20`}> This one Works ! with size factory!</div>
    </main>
  )
}