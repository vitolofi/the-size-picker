

import { useEffect, useState } from "react"

export default function FaderView(props:any){
   
    const faderVal = props.faderValue
   
    const setFaderVal = props.setFaderValue
    const [buttonAnimation, setButtonAnimation] = useState<string>(`relative right-14 top-3 bg-green-700 shadow-md rounded-full p-2`)
    // const [buttonAnimation, setButtonAnimation] = useState()

   
    
    const animateThumb = (from:any, to:any) =>{
        console.log('animation of ', props.title, ' thumb goes from', from,' to', to)
        if(to === 0){
            const translateX = 'right-14'
            setButtonAnimation(`relative top-3 bg-green-700 shadow-md rounded-full p-2 duration-150 delay-250 ${translateX}`)
            return
        }
        if(to === 1){
            const translateX = 'right-7'
            setButtonAnimation(`relative top-3 bg-green-700 shadow-md rounded-full p-2 duration-150 delay-250 ${translateX}`)
            return
        }
        if(to === 2){
            const translateX = 'right-0'
            setButtonAnimation(`relative top-3 bg-green-700 shadow-md rounded-full p-2 duration-150 delay-250 ${translateX}`)
            return
        }
        if(to === 3){
            const translateX = 'translate-x-7'
            setButtonAnimation(`relative top-3 bg-green-700 shadow-md rounded-full p-2 duration-150 delay-250 ${translateX}`)
            return
        }
        if(to === 4){
            const translateX = 'translate-x-[3.5rem]'
            setButtonAnimation(`relative top-3 bg-green-700 shadow-md rounded-full p-2 duration-150 delay-250 ${translateX}`)
            return
        }
    }
    
    useEffect(()=>{
        animateThumb(0,faderVal)
    })
    

        return(
        <div className="flex flex-col">
    
        <h1 className="p-2">{props.title}</h1>
    <hr className="relative ml-[85px] mr-[89px] top-[29px] shadow-md border-black"></hr>

    <div className="flex justify-around p-2 bg-gray-200 rounded-md shadow-md">
    <div className="absolute">
        <div id="thumb" className={buttonAnimation}></div>
        </div>

        <button className="p-2 px-4 mx-2 bg-white rounded-lg shadow-lg"onClick={()=>{
            if(faderVal === 0) return
            
            props.setFaderValue(props.faderValue-1)
            animateThumb(faderVal,faderVal-1)}}>-</button>

        <div className="flex items-center px-2">

      
        <button className="px-3" onClick={()=>{
            animateThumb(faderVal,0)
            setFaderVal(0)
        }}>|
        </button>
                   
         <button className="px-3" onClick={()=>{
            animateThumb(faderVal,1)
            setFaderVal(1)
        }}>|</button>
         <button className="px-3" onClick={()=>{
             animateThumb(faderVal,2)
             setFaderVal(2)
            }}>|</button>
         
         <button className="px-3" onClick={()=>{
             animateThumb(faderVal,3)
             setFaderVal(3)
            }}>|</button>
         <button className="px-3" onClick={()=>{
             animateThumb(faderVal,4)
             setFaderVal(4)
            }}>|</button>
            </div>
        <button className="p-2 px-4 rounded-lg shadow-lg bg-white mx-2" onClick={()=>{
            if(faderVal === 4) return
            setFaderVal(faderVal+1)
            animateThumb(faderVal,faderVal+1)
        }}>+</button>
    </div>
    </div>)
}