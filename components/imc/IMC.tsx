
import {useRouter} from 'next/router'
import { useEffect, useState} from 'react'
import { roboto } from '@/pages'

export default function Imc(props: { img: string}){
    
    const router = useRouter()
    const categoria = router.query.categoria
    const [altura,setAltura] = useState<number>(0)
    const [peso,setPeso] = useState<number>(0)
    const [idade,setIdade] = useState<number>(0)

    const [colorAnimation, setColorAnimation] = useState<string>('bg-white text-black')

    useEffect(()=>{
        // console.log(altura,peso,idade)
        if(altura > alturaMax || peso > pesoMax || idade >idadeMax || altura<alturaMin || peso<pesoMin || idade<idadeMin) return setColorAnimation('bg-white animation-bounce text-black')
           else setColorAnimation('bg-black animation-bounce text-white')
    },[altura,peso,idade])

    const imcCalc = (alt:number, p:number) =>{
        console.log(alt,'altura', p,'peso')
        const CmtoM = alt/100
        const altResult = CmtoM*CmtoM
        const result = p/altResult
        // console.log('o resultado do imc calc é', result)
        return result
      }

    const alturaMin = 100
    const alturaMax = 250
    const pesoMin = 40
    const pesoMax = 300
    const idadeMin = 14
    const idadeMax = 118

      const submitFunction = () =>{
        console.log(altura,peso,idade)
        if(altura === 0 || peso === 0 || idade === 0){
        return  setColorAnimation('bg-red-500 animate-pulse')
        }
        else if(altura > alturaMax || peso > pesoMax || idade >idadeMax || altura<alturaMin || peso<pesoMin || idade<idadeMin){
            return setColorAnimation('bg-red-500 animate-pulse')
        }
        else{
            setColorAnimation('bg-black animate-pulse')
            return router.push({pathname:'/doll/DollPage', query:{imc:imcCalc(altura, peso), idade:idade, encodedImgUrl:props.img, categoria:categoria}})        } 
      }

    
    return (
        <div className={`${roboto.className} bg-white max-w-[100%] ml-4 flex flex-col rounded-lg outline-3 shadow-xl`}>
       
    <div className="flex flex-col">
        <p className={` text-[1.7rem] text-center text-black py-5 px-2`}>
            Bem vindo ao Provador Virtual
        </p>
        <p className="px-5 text-black">Preencha os dados e te mostraremos como essa roupa veste no seu corpo</p>
        <div className="flex flex-col px-6 my-2">
                
        <label className='text-black'>Altura(cm)</label>
        <input className="py-1 px-2 w-32 bg-gray-100 text-black" min={100} max={220} type='text' pattern='\d*' maxLength={3} onChange={(e)=>{
            setAltura(Number(e.target.value))
        }}></input>
        <label className='text-black'>Peso(kg)</label>
        <input className="py-1 px-2 w-32 bg-gray-100 text-black" min={40} max={250} type='text' pattern='\d*' maxLength={3} onChange={(e)=> {
            setPeso(Number(e.target.value))
            }}></input>
        <label className='text-black'>Idade</label>
        <input className="py-1 px-2 w-32 bg-gray-100 text-black" min={16} max={120} type='text' pattern='\d*' maxLength={3} onChange={(e)=>{
            setIdade(Number(e.target.value))
            }}></input>
        {/* <div>A idade influencia no formato do corpo</div> */}
            </div>
            
    </div>
        <div className="flex flex-col justify-center bg-green">
        <input type={"submit"} className={`rounded-lg delay-500 transition-all duration-1000 ${colorAnimation} shadow-xl py-2 mx-6 my-5 cursor-pointer`} onClick={()=>submitFunction()} value="Próximo"/>
        </div>
        </div>)
}

