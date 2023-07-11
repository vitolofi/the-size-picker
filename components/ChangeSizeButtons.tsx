import { useRouter } from "next/router"
import { useEffect, useState } from "react"


;
export default function ChangeSizeButtons (props:any){

    const [selectedSize,setSelectedSize]=useState<any>()

    const allSizesNames = ['PP', 'P', 'M', 'G', 'GG', 'XG']
    const allPossibleCategorias = ['Blusa', 'Calça', 'Vestido']
    const resultNameCategorias = ['sizeTop', 'sizeBottom', 'sizeWhole']
    const allPossibleSizes = [props.baseSize.sizeTop, props.baseSize.sizeBottom, props.baseSize.sizeWhole]

    const router = useRouter()

    const categoria = router.query.categoria

    useEffect(()=>{
        if(!selectedSize){
            //set correct size to category
            const detectCategoria = () =>{
                allPossibleCategorias.forEach((v,i,arr)=>{
                    if(categoria===v){
                        setSelectedSize(allPossibleSizes[i])
                      
                    }
                })
               }
            
            detectCategoria()
            
        }
       })


    const changeSize = (index:number) =>{
        // console.log(index)
        setSelectedSize(allSizesNames[index])
        props.changeSize(index)
    }


return(<div className="grid grid-cols-3 gap-2 ml-1 p-1 ">
   
    {allSizesNames.map((v,i,arr)=>{
      if(selectedSize===v){
        if(props.preferedSize === v){
        return <div className="flex flex-col">
            <div className="absolute h-[1rem] ">
            <img className="bg-white rounded-full relative  h-[1rem]" src="/1008958.png"/>
            </div>
            
        <button id="recommended" key={i} className="rounded-lg bg-black text-white shadow-lg py-2 mx-2 px-2">{v}</button>
        </div>
        // ! é o recomendado 
            }
        else
        return <div className="flex flex-col"><button id="non_recomended" key={i} className="rounded-lg bg-black text-white shadow-lg py-2 mx-2 px-2">{v}</button></div>
      }
         else if(props.preferedSize === v){
            return <div className="flex flex-col" >
                <div className="absolute h-[1rem]">
                <img className="bg-white rounded-full relative  h-[1rem]" src="/1008958.png"/>
                </div>
                
            <button key={i} id="back_to_recommended" className="rounded-lg bg-white shadow-lg py-2 mx-2 text-black px-2" onClick={()=>changeSize(i)}>{v}</button>
            </div>
         }
         
         else return <div className="flex flex-col"><button key={i} id="non_recomended" className="rounded-lg bg-white shadow-lg py-2 mx-2 text-black px-2" onClick={()=>changeSize(i)}>{v}</button></div>
      })}

</div>) 
}

