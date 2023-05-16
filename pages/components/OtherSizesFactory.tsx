import { useRouter } from "next/router"



export default function OtherSizesFactory (props:any){

    const allSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG']

    const PP = { busto: { min: 75, med: 80.5, max: 86 }, cintura: { min: 65, med: 67.5, max: 70 }, quadril: { min: 92, med: 95, max: 98 } }
    const P = { busto: { min: 87, med: 91.5, max: 96 }, cintura: { min: 70, med: 73, max: 76 }, quadril: { min: 99, med: 102, max: 105 } }
    const M = { busto: { min: 97, med: 99.5, max: 102 }, cintura: { min: 77, med: 79, max: 81 }, quadril: { min: 106, med: 108.5, max: 111 } }
    const G = { busto: { min: 103, med: 106, max: 109 }, cintura: { min: 82, med: 84.5, max: 87 }, quadril: { min: 112, med: 115, max: 118 } }
    const GG = { busto: { min: 110, med: 114.5, max: 119 }, cintura: { min: 88, med: 90.5, max: 93 }, quadril: { min: 119, med: 121.5, max: 124 } }
    const XG = { busto: { min: 120, med: 125, max: 130 }, cintura: { min: 94, med: 96.5, max: 99 }, quadril: { min: 125, med: 127.5, max: 130 } }


    const allDescriptions = ['Largo', 'Folgado', 'Levemente Folgado', 'Ideal', 'Levemente justo', 'Justo', 'Apertado']



   
   const router = useRouter()


   const sizeFactory = () =>{

   }

   const tryAnotherSize = () =>{
    
   }
   const changeSize = () =>{
    //setter props.setSize(newSize)
   }
   
   
   
   return(<div className="flex">
   
          {allSizes.map((v,i,arr)=>{
            
                return <button key={i} className="rounded-lg bg-gray-50 shadow-lg py-2 mx-2">{v}</button>
            })} 
   
   </div>) 
}