import { useRouter } from "next/router"
import {roboto} from '..'

export default function NotFound(){
    const router = useRouter()
    const encodedImgUrl = String(router.query.encodedImgUrl)
    const categoria = String(router.query.categoria)
    console.log('your size wasnot found page', router.query)
    // const encoded: string = encodedImgUrl as string
    return(<div className={`${roboto.className} flex flex-col w-[100%] bg-white`}>
        

        <h1 className='text-center text-black text-3xl my-5 px-10'>Ainda não temos um tamanho que vai te vestir legal :{'('}</h1>
        <p className='text-center text-black text-sm'>Infelizmente os valores inseridos não são compatíveis com a nossa tabela de medidas</p>
        <p className='text-end text-black text-xs mb-20 mx-6'>ou algo errado aconteceu...</p>
    <div className="flex flex-col">
        <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 mx-6 " onClick={()=>router.push({pathname:`/${encodeURIComponent(encodedImgUrl)}`, query:{categoria:categoria}})}>Reiniciar</button>
        
        {/* <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 mx-2 ">Fita Metrica</button> */}
        </div>
        </div>
        )
}