import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export default function OtherSizesFactory (props:any){

  console.log(props.baseSize.editBusto,'editbusto')
    const allSizesNames = ['PP', 'P', 'M', 'G', 'GG', 'XG']

    const [size,setSize] = useState<string>('')

    const PP = { busto: { min: 75, med: 80.5, max: 86 }, cintura: { min: 65, med: 67.5, max: 70 }, quadril: { min: 92, med: 95, max: 98 } }
    const P = { busto: { min: 87, med: 91.5, max: 96 }, cintura: { min: 70, med: 73, max: 76 }, quadril: { min: 99, med: 102, max: 105 } }
    const M = { busto: { min: 97, med: 99.5, max: 102 }, cintura: { min: 77, med: 79, max: 81 }, quadril: { min: 106, med: 108.5, max: 111 } }
    const G = { busto: { min: 103, med: 106, max: 109 }, cintura: { min: 82, med: 84.5, max: 87 }, quadril: { min: 112, med: 115, max: 118 } }
    const GG = { busto: { min: 110, med: 114.5, max: 119 }, cintura: { min: 88, med: 90.5, max: 93 }, quadril: { min: 119, med: 121.5, max: 124 } }
    const XG = { busto: { min: 120, med: 125, max: 130 }, cintura: { min: 94, med: 96.5, max: 99 }, quadril: { min: 125, med: 127.5, max: 130 } }
    const allSizes = [PP,P,M,G,GG,XG]

    const allPossibleCategorias = ['Camisa', 'Calça', 'Vestidos']
    const resultNameCategorias = ['sizeTop', 'sizeBottom', 'sizeWhole']
    const allPossibleSizes = [props.baseSize.sizeTop, props.baseSize.sizeBottom, props.baseSize.sizeWhole]
    const allDescriptions = ['Largo', 'Folgado', 'Levemente Folgado', 'Ideal', 'Levemente justo', 'Justo', 'Apertado']
    const allColors = ['stroke-red-500', 'stroke-yellow-500', 'stroke-green-300', 'stroke-green-500','stroke-green-300', 'stroke-yellow-500','stroke-red-500']
   
    const router = useRouter()

    const categoria = router.query.categoria



    const sizeFactory = () =>{


   }
   //this was just an experiment
   const changeSize = (from: any, to: any) =>{
    //setter props.setSize(newSize)
    console.log('changing size from',from ,'to', to)
    console.log('index of from :', allSizesNames.indexOf(from),'index of to :' ,allSizesNames.indexOf(to) )
    const baseSize = props.baseSize
    console.log('this is baseSize', baseSize)

    const sizeDifference = allSizesNames.indexOf(to) - allSizesNames.indexOf(from)
    console.log('this is the size difference?', sizeDifference)
    

    baseSize.bustoDescription = baseSize.bustoDescription-sizeDifference*2 
    baseSize.cinturaDescription = baseSize.cinturaDescription-sizeDifference*2 
    baseSize.quadrilDescription = baseSize.quadrilDescription-sizeDifference*2 
    allPossibleCategorias.forEach((v,i,arr)=>{
        if(categoria===v){
            baseSize[resultNameCategorias[i]] = to
        }
    })
    

    setSize(to) //just animation

    // console.log('this is baseSize after changes', baseSize)
    // (sizeTop:string,sizeBottom:string,sizeWhole:string,bustoCm:number,cinturaCm:number,quadrilCm:number,bustoDescription:string,bustoColor:string,cinturaDescription:string,cinturaColor:string,quadrilDescription:string,quadrilColor:string) 
   
            //if any of those values are negative, set them to 0
            //if any of those values are bigger than 7 and smaller than 14, set them to 7
            for (const key in baseSize) {
                if (baseSize.hasOwnProperty(key)) {
                //   console.log(`${key}: ${baseSize[key]}`);
                  if(baseSize[key] && baseSize[key]>7 && baseSize[key]<16){
                    baseSize[key]=7
                  }
                  if(baseSize[key] && baseSize[key]<0){
                    baseSize[key]=0
                  }
                  // console.log(`${key}: ${baseSize[key]}`);
                }
              }
              console.log('after the bugfix with the indexes of description and color, now baseSize is like this')
              const indexOfFutureSize = allSizesNames.indexOf(to)
              baseSize.editBusto = allSizes[indexOfFutureSize].busto.med
              baseSize.editCintura = allSizes[indexOfFutureSize].cintura.med
              baseSize.editQuadril = allSizes[indexOfFutureSize].quadril.med
              console.log(baseSize, indexOfFutureSize,'indexofnextsize')
            
              const result = [baseSize.sizeTop,baseSize.sizeBottom,baseSize.sizeWhole,baseSize.editBusto,baseSize.editCintura,baseSize.editQuadril,allDescriptions[baseSize.bustoDescription], allColors[baseSize.bustoDescription], allDescriptions[baseSize.cinturaDescription], allColors[baseSize.cinturaDescription], allDescriptions[baseSize.quadrilDescription],allColors[baseSize.quadrilDescription]]
              //(sizeTop:string,sizeBottom:string,sizeWhole:string,bustoCm:number,cinturaCm:number,quadrilCm:number,bustoDescription:string,bustoColor:string,cinturaDescription:string,cinturaColor:string,quadrilDescription:string,quadrilColor:string)
              console.log(...result, 'this is the result of all')
              props.setter(...result)
        
  

   }



   
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
   
   
   return(<div className="flex">
   
          {allSizesNames.map((v,i,arr)=>{
            if(size===v) return <button key={i} className="rounded-lg bg-gray-50 shadow-lg py-2 mx-2">{v}</button>
               else return <button key={i} className="rounded-lg bg-gray-200 shadow-lg py-2 mx-2" onClick={()=>changeSize(size,v)}>{v}</button>
            })}
   
   </div>) 
}
// na verdade, neste arquivo eu terei que pegar os tamanhos e indexes que vieram no baseSize, e fazer a fabrica me gerar todos os outros tamanhos/indexes já certos
//quando eu clicar no botão a fabrica vai só me entregar(via props.setter) o tamanho que eu pedi, e que ela já fez previamente, quando carregou os dados do baseSize
//pq?
//pq se mudar loucamente os botões ele vai bugar entre os valores, se pensarmos so a alteração aritimetica...
//então