import FaderView from '../../components/faderView'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import {roboto} from '..'




export default function DollPage(){

    
    const [dollImgName, setDollImgName] = useState('/doll_imgs/a222.png')
    
    const [busto,setBusto] = useState(2)
    const [cintura,setCintura] = useState(2)
    const [quadril,setQuadril] = useState(2)
   
    const router = useRouter()
    const imc = router.query.imc
    const categoria = router.query.categoria
    const encodedImgUrl = router.query.encodedImgUrl
    // console.log('imc inside doll page', imc)
    // console.log(encodedImgUrl, 'encoded inside doll page', categoria,'categoria')


    useEffect(()=>{
        changeDollImg(busto,cintura,quadril)
    },[busto,cintura,quadril])
   
    const changeDollImg = (busto: number, cintura: number, quadril: number) =>{
        setDollImgName(`/doll_imgs/w${busto}${cintura}${quadril}.png`) 
    }

    return (<><title>Ajuste</title>
    
    <main className={`${roboto.className} flex rounded-lg  bg-white`}>
        
        <div className=" flex-col ">
            <div className=' brightness-110 justify-startobject-contain object-center'>
        <Image className="object-cover object-top h-[27.5rem] mt-2" width={500} height={500} alt={'a manequin that changes its sizes'} src={dollImgName}/>
            </div>
    
        </div>
        <div className='flex'>
        <div className='flex flex-col max-w-[17.125rem] p-2 rounded-lg shadow-md bg-opacity-100  '>
        <h1 className="text-gray-800 pl-2 pt-3 text-2xl font-medium">
            Ajuste conforme o formato do seu corpo
        </h1>
        <p className='text-sm text-black px-2 pb-2'>Esta será uma representação aproximada do seu corpo, ajuste se necessário</p>
        {/* we can do some logic here to define what can i pass through */}
        {categoria!=='Calça'?
        <FaderView title='Busto' faderValue={busto} setFaderValue={(a:any)=>setBusto(a)} 
        ></FaderView> : null
        }
        <FaderView title='Cintura' faderValue={cintura} setFaderValue={(b:any)=>setCintura(b)}
        ></FaderView>
        <FaderView title='Quadril' faderValue={quadril} setFaderValue={(c:any)=>setQuadril(c)}
        ></FaderView>
        <button id='doll_submit' className="rounded-lg bg-black shadow-lg py-2 my-4 text-white  " onClick={()=>router.push({pathname:'/result/resultPage', query:{dollImg:dollImgName, encodedImgUrl:encodedImgUrl,doll:true, imc:imc, busto:busto, cintura:cintura, quadril:quadril, categoria:categoria}})}>PRÓXIMO</button>

    </div>
            
        </div>
    </main>
    </>)
}