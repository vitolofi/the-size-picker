import FaderView from '../components/faderView'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import {roboto} from '..'




export default function DollPage(){

    
    const [dollImgName, setDollImgName] = useState('/imgs_lela/010101.jpeg')
    
    const [busto,setBusto] = useState(2)
    const [cintura,setCintura] = useState(2)
    const [quadril,setQuadril] = useState(2)
   
    const router = useRouter()
    const imc = router.query.imc
    const categoria = router.query.categoria
    const encodedImgUrl = router.query.encodedImgUrl
    console.log('imc inside doll page', imc)
    console.log(encodedImgUrl, 'encoded inside doll page')


    useEffect(()=>{
        changeDollImg(busto,cintura,quadril)
    },[busto,cintura,quadril])
   
    const changeDollImg = (busto: number, cintura: number, quadril: number) =>{
        setDollImgName(`/imgs_lela/0${busto+1}0${cintura+1}0${quadril+1}.jpeg`) 
    }

    return (<div className={`${roboto.className} flex outline-1 rounded-lg shadow-md justify-between items-center bg-white`}>
        <div className="flex shadow-none mr-2">
            <div className='flex min-w-[10rem] max-w-[13rem]'>
        <Image width={600} height={1600} priority={true} alt={'a manequin that changes its sizes'} src={dollImgName}/>
            </div>
        </div>
        <div className='flex'>
        <div className='flex flex-col p-2 bg-white rounded-lg shadow-sm'>
        <h1 className="text-gray-800 pl-3 pt-5 pb-5 text-xl font-medium">
            Ajuste conforme o formato do seu corpo
        </h1>
        {/* we can do some logic here to define what can i pass through */}
        <FaderView title='Busto' faderValue={busto} setFaderValue={(a:any)=>setBusto(a)} 
        ></FaderView>
        <FaderView title='Cintura' faderValue={cintura} setFaderValue={(b:any)=>setCintura(b)}
        ></FaderView>
        <FaderView title='Quadril' faderValue={quadril} setFaderValue={(c:any)=>setQuadril(c)}
        ></FaderView>
        <button className="rounded-lg bg-black shadow-lg py-2 my-4 mt-10 text-white  " onClick={()=>router.push({pathname:'/result/resultPage', query:{dollImg:dollImgName, encodedImgUrl:encodedImgUrl,doll:true, imc:imc, busto:busto, cintura:cintura, quadril:quadril, categoria:categoria}})}>PRÓXIMO</button>

    </div>
            
        </div>
    </div>)
}