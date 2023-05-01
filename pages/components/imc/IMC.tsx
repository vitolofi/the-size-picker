
import {useRouter} from 'next/router'
import { useEffect, useState} from 'react'

export default function Imc(props: { img: string }){

    const router = useRouter()
    const [altura,setAltura] = useState<number>(0)
    const [peso,setPeso] = useState<number>(0)
    const [idade,setIdade] = useState<number>(0)

    const [colorAnimation, setColorAnimation] = useState<string>('bg-gray-300')

    useEffect(()=>{
        // console.log(altura,'altura',peso,'peso',idade,'idade')
        if(altura === 0 || peso === 0 || idade === 0) return
           else setColorAnimation('bg-gray-50')
    },[altura,peso,idade])

    const imcCalc = (alt:number, p:number) =>{
        console.log(alt,'altura', p,'peso')
        const CmtoM = alt/100
        const altResult = CmtoM*CmtoM
        const result = p/altResult
        console.log('o resultado do imc calc é', result)
        return result
      }

    const alturaMin = 100
    const alturaMax = 250
    const pesoMin = 40
    const pesoMax = 300
    const idadeMin = 15
    const idadeMax = 118

      const submitFunction = () =>{
        console.log(altura,peso,idade)
       if(altura === 0 || peso === 0 || idade === 0){
        return void setColorAnimation('bg-gray-200 animate-pulse')
        }
        if(altura > alturaMax || peso > pesoMax || idade >idadeMax){
            return void setColorAnimation('bg-gray-200 animate-pulse')
        }
        else return void router.push({pathname:'/doll/DollPage', query:{imc:imcCalc(altura, peso), idade:idade, encodedImgUrl:props.img}})
      }

    
    return (
        <div className="bg-gray-200 w-52 ml-4 py-4 rounded-md">
       
    <div className="flex flex-col">

        <h1 className="text-gray-800 pl-3 py-2 font-medium text-xl">
            Descubra Seu Tamanho
        </h1>
        <div className="flex flex-col pl-6 my-6 pb-2">
                
        <label>Altura(cm)</label>
        <input className="py-1 w-32" min={100} max={220} type='text' pattern='\d*' maxLength={3} onChange={(e)=>{
            const stringer = e.target.value
            const num = +stringer
            // testar alturas e peso provaveis
            if(num<alturaMax && num>alturaMin){
                setAltura(num) 
            } 
        }}></input>
        <label>Peso(kg)</label>
        <input className="py-1 w-32" min={40} max={250} type='text' pattern='\d*' maxLength={3} onChange={(e)=> {
            const stringer = e.target.value
            const num = +stringer
            if(num<pesoMax && num>pesoMin){
                setPeso(num)
            } 
            }}></input>
        <label>Idade</label>
        <input className="py-1 w-32" min={16} max={120} type='text' pattern='\d*' maxLength={3} onChange={(e)=>{
            const stringer = e.target.value
            const num = +stringer
            if(num<idadeMax && num>idadeMin){
                setIdade(num)
            }
            }}></input>
        {/* <div>A idade influencia no formato do corpo</div> */}
            </div>
            
    </div>
        <div className="flex flex-col justify-center">
        <input type={"submit"} className={`rounded-lg delay-500 transition-all duration-1000 ${colorAnimation} shadow-lg py-2 my-2 mx-4 cursor-pointer`} onClick={()=>submitFunction()} value="Próximo"/>
        </div>
        </div>)
}
// redirecta pra pagina do boneco 3d
