import FaderView from '../components/faderView'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'




export default function DollPage(){

    
    const [dollImgName, setDollImgName] = useState('/imgs_lela/010101.jpeg')
    
    const [busto,setBusto] = useState(2)
    const [cintura,setCintura] = useState(2)
    const [quadril,setQuadril] = useState(2)
   
    const router = useRouter()
    const imc = router.query.imc
    const encodedImgUrl = router.query.encodedImgUrl
    console.log('imc inside doll page', imc)
    console.log(encodedImgUrl, 'encoded inside doll page')

    // useEffect(()=>{
    //     checkIMC(imc)
    // })
    useEffect(()=>{
        changeDollImg(busto,cintura,quadril)
    },[busto,cintura,quadril])
   
    const changeDollImg = (busto: number, cintura: number, quadril: number) =>{
        setDollImgName(`/imgs_lela/0${busto+1}0${cintura+1}0${quadril+1}.jpeg`) 
    }

    return (<div className="p-4 m-2 flex outline-1 rounded-lg shadow-md justify-between items-center">
        <div className="flex shadow-none mr-2">
        <img src={dollImgName}></img>
        </div>
        <div className='flex'>
        <div className='flex flex-col p-2 bg-gray-100 rounded-lg shadow-sm'>
        <h1 className="text-gray-800 pl-3 pt-5 pb-5 font-medium text-xl">
            Descubra Seu Tamanho
        </h1>
        <FaderView title='Busto' faderValue={busto} setFaderValue={(a:any)=>setBusto(a)}
        ></FaderView>
        <FaderView title='Cintura' faderValue={cintura} setFaderValue={(b:any)=>setCintura(b)}
        ></FaderView>
        <FaderView title='Quadril' faderValue={quadril} setFaderValue={(c:any)=>setQuadril(c)}
        ></FaderView>
        <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-4 mt-10 " onClick={()=>router.push({pathname:'/result/resultPage', query:{dollImg:dollImgName, encodedImgUrl:encodedImgUrl,doll:true, imc:imc, busto:busto, cintura:cintura, quadril:quadril}})}>PRÓXIMO</button>

    </div>
            
        </div>
    </div>)
}