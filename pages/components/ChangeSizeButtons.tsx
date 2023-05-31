import { useRouter } from "next/router"
import { useEffect, useState } from "react"


;
export default function ChangeSizeButtons (props:any){

    const [size,setSize]=useState<any>()

    const allSizesNames = ['PP', 'P', 'M', 'G', 'GG', 'XG']
    const allPossibleCategorias = ['Camisa', 'Calça', 'Vestidos']
    const resultNameCategorias = ['sizeTop', 'sizeBottom', 'sizeWhole']
    const allPossibleSizes = [props.baseSize.sizeTop, props.baseSize.sizeBottom, props.baseSize.sizeWhole]

    const router = useRouter()

    const categoria = router.query.categoria

    useEffect(()=>{
        if(!size){
            //set correct size to category
            const detectCategoria = () =>{
                allPossibleCategorias.forEach((v,i,arr)=>{
                    if(categoria===v){
                        setSize(allPossibleSizes[i])
                      
                    }
                })
               }
            
            detectCategoria()
            
        }
       })


    const changeSize = (index:number) =>{
        // console.log(index)
        setSize(allSizesNames[index])
        props.changeSize(index)
    }


return(<div className="flex mt-10">
   
    {allSizesNames.map((v,i,arr)=>{
      if(size===v){
        return <button key={i} className="rounded-lg bg-black text-white shadow-lg py-2 mx-2 px-2">{v}</button>
      }
         else return <button key={i} className="rounded-lg bg-white shadow-lg py-2 mx-2 text-black px-2" onClick={()=>changeSize(i)}>{v}</button>
      })}

</div>) 
}

