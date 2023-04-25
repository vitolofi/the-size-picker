import { useRouter } from "next/router"


export default function NotFound(){
    const router = useRouter()
    const encodedImgUrl = router.query.encodedImgUrl
    console.log('your size wasnot found page', router.query)
    // const encoded: string = encodedImgUrl as string
    return(<div className="flex flex-col">
        <h1>Ainda não encontramos seu tamanho</h1>
        <p>ou algo deu errado</p>
    <div className="flex flex-col">
        {/* <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={()=>router.push({pathname:`/${encodeURIComponent(encoded)}`})}>Reiniciar</button> */}
        
        {/* <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 ">Fita Metrica</button> */}
        </div>
        </div>)
}