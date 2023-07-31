import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSettings } from "./Context/SettingsProvider";
import Image from "next/image";

export default function ChangeSizeButtons (props:any){

    
    
    const [selectedSize,setSelectedSize]=useState<any>()
    
    const [settings] = useSettings()
    const {allPossibleCategories, allSizesNames} = settings
    const resultNameCategorias = ['sizeTop', 'sizeBottom', 'sizeWhole']
    const allPossibleSizes = [props.baseSize.sizeTop, props.baseSize.sizeBottom, props.baseSize.sizeWhole]

    const router = useRouter()

    const categoria = router.query.categoria

    useEffect(()=>{
        if(!selectedSize){
            //set correct size to category
            const detectCategoria = () =>{
                allPossibleCategories.forEach((v,i,arr)=>{
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
        return <div key={i} className="flex flex-col">
            <div className="absolute h-[1rem] ">
            <Image className="bg-white rounded-full relative  h-[1rem]" width={17} height={16} src="/1008958.png" alt='check_mark_symbol'/>
            </div>
            
        <button id="recommended"  className="rounded-lg bg-black text-white shadow-lg py-2 mx-2 px-2">{v}</button>
        </div>
        // ! é o recomendado 
            }
        else
        return <div key={i} className="flex flex-col"><button id="non_recomended"  className="rounded-lg bg-black text-white shadow-lg py-2 mx-2 px-2">{v}</button></div>
      }
         else if(props.preferedSize === v){
            return <div key={i} className="flex flex-col" >
                <div className="absolute h-[1rem]">
                <Image width={17} height={16} className="bg-white rounded-full relative  h-[1rem]" src="/1008958.png" alt='check_mark_symbol'/>
                </div>
                
            <button  id="back_to_recommended" className="rounded-lg bg-white shadow-lg py-2 mx-2 text-black px-2" onClick={()=>changeSize(i)}>{v}</button>
            </div>
         }
         
         else return <div  key={i} className="flex flex-col"><button id="non_recomended" className="rounded-lg bg-white shadow-lg py-2 mx-2 text-black px-2" onClick={()=>changeSize(i)}>{v}</button></div>
      })}

</div>) 
}

