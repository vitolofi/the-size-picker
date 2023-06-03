import Image from 'next/image'
import { Inter,Roboto } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })
export const roboto = Roboto({ subsets:['latin'], weight:'100'})

export default function Home() { 
  return (
    <main
      className={`flex-col  items-center justify-between p-24`}>
 
       

     
    <div className={`${roboto.className} text-[3rem]`}>THE SIZE PICKER</div> 
      <div className={`${roboto.className} mb-20`}> This one Works ! with size factory!</div>

      <div>falta configurar medidas exatas de calça e vestido e mais design</div>


      <div>color testing
        <div className='bg-green-300'>green300</div>
        <div className='bg-green-500'>green500</div>
        <div className='bg-red-500'>red</div>
        <div className='bg-yellow-500'>yellow</div>
        <div>

        <svg className='relative left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg"  >
<path className={`stroke-green-500 shadow-lg outline-1 opacity-25`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
<svg className='relative left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg"  >
<path className={`stroke-green-300 shadow-lg outline-1 opacity-25`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
        <svg className='relative left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg"  >
<path className={`stroke-red-500 shadow-lg outline-1 opacity-25`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
        <svg className='relative left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg"  >
<path className={`stroke-yellow-500 shadow-lg outline-1 opacity-25`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
        </div>
      </div>
      
    </main>
  )
}