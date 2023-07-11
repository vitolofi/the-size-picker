
import { Inter,Roboto } from 'next/font/google'




export const inter = Inter({ subsets: ['latin'] })
export const roboto = Roboto({ subsets:['latin'], weight:'100'})

export default function Home() { 

  const allColors = ['-red-500', '-yellow-500', '-[#a7d047]', '-green-500','-[#e9d941]', '-yellow-500','-red-500']
  return (<div className='bg-red-500'>

  <title>Testes</title>
    <main
      className={`flex-col  items-center justify-between p-24`}>
        

    <div className={`${roboto.className} text-[3rem]`}>THE SIZE PICKER</div> 
      <div className={`${roboto.className} mb-20`}> This one Works ! with size factory!</div>

     
    

<a href='http://192.168.0.11:3000/https%3A%2F%2Fimages.tcdn.com.br%2Fimg%2Fimg_prod%2F1133807%2Fkimono_viscolinho_liso_areia_311_1_59456bf3285febb367c1828d0c6be290_20230404150411.jpg?categoria=Blusa'>Blusa</a>
<a href="http://192.168.0.11:3000/https%3A%2F%2Fimages.tcdn.com.br%2Fimg%2Fimg_prod%2F1133807%2Fkimono_viscolinho_liso_areia_311_1_59456bf3285febb367c1828d0c6be290_20230404150411.jpg?categoria=Cal%C3%A7a">Calça</a>
<a href="http://192.168.0.11:3000/https%3A%2F%2Fimages.tcdn.com.br%2Fimg%2Fimg_prod%2F1133807%2Fkimono_viscolinho_liso_areia_311_1_59456bf3285febb367c1828d0c6be290_20230404150411.jpg?categoria=Vestido">Vestido</a>
      <div>color testing
        {/* <div className='bg-green-300'>Camisa ta top</div> */}
        <div className='bg-green-500'>green500</div>
        <div className="bg-[#a7d047]">a</div>
        <div className="bg-[#e9d941]">b</div>
        <div className='bg-yellow-500'>ajustar as main divs</div>
        <div className='bg-red-500'>editar medidas mobile ta ruim</div>


        <div> 
        <svg className='relative left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg"  >
<path className={`stroke-green-500 shadow-lg outline-1 `} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>

<svg className='relative left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg"  >
<path className={`stroke-[#a7d047] shadow-lg outline-1 `} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
<svg className='relative left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg"  >
<path className={`stroke-[#e9d941] shadow-lg outline-1 `} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>

<svg className='relative left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg"  >
<path className={`stroke-yellow-500 shadow-lg outline-1 `} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
<svg className='relative left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg"  >
<path className={`stroke-red-500 shadow-lg outline-1 `} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
        </div>
      </div>
      
    </main>
        </div>
  )
}