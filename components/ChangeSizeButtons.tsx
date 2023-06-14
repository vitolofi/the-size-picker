import { useRouter } from "next/router"
import { useEffect, useState } from "react"


;
export default function ChangeSizeButtons (props:any){

    const [selectedSize,setSelectedSize]=useState<any>()

    const allSizesNames = ['PP', 'P', 'M', 'G', 'GG', 'XG']
    const allPossibleCategorias = ['Camisa', 'Calça', 'Vestidos']
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


return(<div className="flex my-4 ml-1">
   
    {allSizesNames.map((v,i,arr)=>{
      if(selectedSize===v){
        if(props.preferedSize === v){
        return <><div>
            <div className="absolute h-[1rem] ">
            <img className="bg-white rounded-full relative  h-[1rem]" src="/1008958.png"/>
            </div>
            </div>
        <button key={i} className="rounded-lg bg-black text-white shadow-lg py-2 mx-2 px-2">{v}</button>
        </>
        // ! é o recomendado 
            }
        else
        return <button key={i} className="rounded-lg bg-black text-white shadow-lg py-2 mx-2 px-2">{v}</button>
      }
         else if(props.preferedSize === v){
            return <><div>
                <div className="absolute h-[1rem]">
                <img className="bg-white rounded-full relative  h-[1rem]" src="/1008958.png"/>
                </div>
                </div>
            <button key={i} className="rounded-lg bg-white shadow-lg py-2 mx-2 text-black px-2" onClick={()=>changeSize(i)}>{v}</button>
            </>
         }
         
         else return <button key={i} className="rounded-lg bg-white shadow-lg py-2 mx-2 text-black px-2" onClick={()=>changeSize(i)}>{v}</button>
      })}

</div>) 
}

