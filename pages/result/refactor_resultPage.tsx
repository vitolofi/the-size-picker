import { useRouter } from "next/router"
import {useEffect,useState } from "react"
import OtherSizesFactory from '../components/OtherSizesFactory'
import SugarBustoSVG from '../components/sugar/SugarBusto'
import SugarCinturaSVG from '../components/sugar/SugarCintura'
import SugarQuadrilSVG from '../components/sugar/SugarQuadril'
export default function refactor_ResultPage(){


    const router = useRouter()
    
    const encodedImgUrl = String(router.query.encodedImgUrl)
    const categoria = String(router.query.categoria)
    const edit = router.query.edit
    const doll = router.query.doll
    

    
    const [sizeTop, setSizeTop] = useState<string>('')
    const [sizeBottom, setSizeBottom] = useState<string>('')
    const [sizeWhole, setSizeWhole] = useState<string>('')




    
    const [bustoDescription, setBustoDescription] = useState<string>('')
    const [bustoColor, setBustoColor] = useState<string>('')
    const [editBusto, setEditBusto] = useState<string | number>()
    const [cinturaDescription, setCinturaDescription] = useState<string>('')
    const [editCintura, setEditCintura] = useState<string | number>()
    const [cinturaColor, setCinturaColor] = useState<string>('')
    const [quadrilDescription, setQuadrilDescription] = useState<string>('')
    const [editQuadril, setEditQuadril] = useState<string | number>()
    const [quadrilColor, setQuadrilColor] = useState<string>('')
    
  
    const imc = Number(router.query.imc)
    const bustoDoll = Number(router.query.busto)
    const cinturaDoll = Number(router.query.cintura)
    const quadrilDoll = Number(router.query.quadril)





    const allPossibleCategorias = ['Camisa', 'Calça', 'Vestidos']
    const sizes = [sizeTop,sizeBottom,sizeWhole]
    const functionsDollObj = [(imc: number,busto: number,cintura: number,quadril: number)=> chooseBestCamisaDoll(imc,busto,cintura,quadril), (imc: number,busto: number,cintura: number,quadril: number)=> chooseBestCalçaDoll(imc,busto,cintura,quadril), (imc: number,busto: number,cintura: number,quadril: number)=>chooseBestVestidoDoll(imc,busto,cintura,quadril) ]
    

    const imcRanges = [14,20,23.5,28.7,30,32.5,35.5]
    const allSizesNames = ['PP', 'P', 'M', 'G', 'GG', 'XG']
    const allDescriptions = ['Largo', 'Folgado', 'Levemente folgado', 'Ideal', 'Levemente Justo', 'Justo', 'Apertado']
    const allColors = ['stroke-red-500', 'stroke-yellow-500', 'stroke-green-300', 'stroke-green-500','stroke-green-300', 'stroke-yellow-500','stroke-red-500']

    const PP = { busto: { min: 75, med: 80.5, max: 86 }, cintura: { min: 65, med: 67.5, max: 70 }, quadril: { min: 92, med: 95, max: 98 } }
    const P = { busto: { min: 87, med: 91.5, max: 96 }, cintura: { min: 70, med: 73, max: 76 }, quadril: { min: 99, med: 102, max: 105 } }
    const M = { busto: { min: 97, med: 99.5, max: 102 }, cintura: { min: 77, med: 79, max: 81 }, quadril: { min: 106, med: 108.5, max: 111 } }
    const G = { busto: { min: 103, med: 106, max: 109 }, cintura: { min: 82, med: 84.5, max: 87 }, quadril: { min: 112, med: 115, max: 118 } }
    const GG = { busto: { min: 110, med: 114.5, max: 119 }, cintura: { min: 88, med: 90.5, max: 93 }, quadril: { min: 119, med: 121.5, max: 124 } }
    const XG = { busto: { min: 120, med: 125, max: 130 }, cintura: { min: 94, med: 96.5, max: 99 }, quadril: { min: 125, med: 127.5, max: 130 } }
    const allSizes = [PP,P,M,G,GG,XG]
    
    const factoryInfo = {
        sizeTop,
        sizeBottom,
        sizeWhole,
        bustoDescription:allDescriptions.indexOf(bustoDescription),
        cinturaDescription:allDescriptions.indexOf(cinturaDescription),
        quadrilDescription:allDescriptions.indexOf(quadrilDescription),
        editBusto,
        editCintura,
        editQuadril,
    }
    const imcCheck = (imc:number) =>{
        if (imc < 14 || imc > 35.5) {
            router.push({ pathname: '/medidas/NotFound', query: { encodedImgUrl: encodedImgUrl } })
            //go to the Nao encontramos seu tamanho por favor -> Editar Medidas
        }
        
    }
    //doll
    const chooseBestCamisaDoll = (imc:number,busto:number,cintura:number,quadril:number) =>{
        
        imcCheck(imc)
        console.log('inside chooseBestCamisa')
        const setSizePlusOne = (sizePlusOne:string,apxBusto:number,apxCintura:number,apxQuadril:number) =>{
            setBustoDescription(allDescriptions[busto-2])
            setBustoColor(allColors[busto-2])
            setEditBusto(apxBusto)
            setCinturaDescription(allDescriptions[cintura])
            setCinturaColor(allColors[cintura])
            setEditCintura(apxCintura)
            setQuadrilDescription(allDescriptions[quadril])
            setQuadrilColor(allColors[quadril])
            setEditQuadril(apxQuadril)
            setSizeTop(sizePlusOne)
            return
        }
        const setSizeMinusOne = (sizeMinusOne:string,apxBusto:number,apxCintura:number,apxQuadril:number) =>{
            setBustoDescription(allDescriptions[busto+5])
            setBustoColor(allColors[busto+5])
            setEditBusto(apxBusto)
            setCinturaDescription(allDescriptions[cintura+2])
            setCinturaColor(allColors[cintura+2])
            setEditCintura(apxCintura)
            setQuadrilDescription(allDescriptions[quadril+2])
            setQuadrilColor(allColors[quadril+2])
            setEditQuadril(apxQuadril)
            setSizeTop(sizeMinusOne)
            return
        }

        imcRanges.forEach((v,i,arr)=>{
             //PP
         if(i===0){
            // console.log('your size is PP')
             const bustos = [allSizes[i].busto.min, allSizes[i].busto.min+1, allSizes[i].busto.med+1, allSizes[i].busto.max, allSizes[i+1].busto.min]
             const quadris = [allSizes[i].quadril.min, allSizes[i].quadril.min+1, allSizes[i].quadril.med+1, allSizes[i].quadril.max, allSizes[i+1].quadril.min]
             const cinturas = [allSizes[i].cintura.min, allSizes[i].cintura.min+1, allSizes[i].cintura.med+1, allSizes[i].cintura.max, allSizes[i+1].cintura.min]
             
             const blockValue = i
             const defaultSize = allSizesNames[blockValue]
             const sizePlusOne = allSizesNames[blockValue + 1]
            //  console.warn('is 0?')
            //  console.warn(busto, typeof busto,' busto log warn')
             
             if (busto>0 && busto<4) {
                 setBustoDescription(allDescriptions[busto+1])
                 setBustoColor(allColors[busto+1])
                 setSizeTop(defaultSize)
                 setEditBusto(bustos[blockValue+busto])
             }
        
             if (busto == 4) {
                return setSizePlusOne(sizePlusOne,bustos[blockValue+busto],cinturas[blockValue+cintura],quadris[blockValue+quadril])
             }
             
                setCinturaDescription(allDescriptions[cintura+1])
                setCinturaColor(allColors[cintura+1])
                setEditCintura(cinturas[cintura])
                setQuadrilDescription(allDescriptions[quadril+1])
                setQuadrilColor(allColors[quadril+1])
                setEditQuadril(quadris[quadril])
                return        
         }
         //XG
         if(i==arr.length){
            const blockValue = i
            const defaultSize = allSizesNames[blockValue]
            const sizeMinusOne = allSizesNames[blockValue - 1]
            const bustos = [allSizes[blockValue-1].busto.max,allSizes[blockValue].busto.min,allSizes[blockValue].busto.med-1,allSizes[blockValue].busto.med+1, allSizes[blockValue].busto.max]
            const cinturas = [allSizes[blockValue-1].cintura.max,allSizes[blockValue].cintura.min,allSizes[blockValue].cintura.med-1,allSizes[blockValue].cintura.med+1, allSizes[blockValue].cintura.max]
            const quadris = [allSizes[blockValue-1].quadril.max,allSizes[blockValue].quadril.min,allSizes[blockValue].quadril.med-1,allSizes[blockValue].quadril.med+1, allSizes[blockValue].quadril.max]
            if (busto == 0) {
                return setSizeMinusOne(sizeMinusOne, bustos[busto], cinturas[cintura], quadris[quadril])
            }
            if (busto >= 1 && busto<=4) {
                //levemente folgado
                setBustoDescription(allDescriptions[busto+1])
                setBustoColor(allColors[busto+1])
                setSizeTop(defaultSize)
                setEditBusto(bustos[busto])
            }
            
                setCinturaDescription(allDescriptions[cintura+1])
                setCinturaColor(allColors[cintura+1])
                setEditCintura(cinturas[cintura])
                setQuadrilDescription(allDescriptions[quadril+1])
                setQuadrilColor(allColors[quadril+1])
                setEditQuadril(quadris[quadril])
            
        }
        //P ao GG
        if(i!==arr.length && i!==0){
            //P ao GG
            if(imc>arr[i] && imc<arr[i+1]){
                const blockValue = i
                const defaultSize = allSizesNames[blockValue]
                const sizePlusOne = allSizesNames[blockValue + 1]
                const sizeMinusOne = allSizesNames[blockValue - 1]
                const bustos = [allSizes[blockValue-1].busto.max,allSizes[blockValue].busto.min,allSizes[blockValue].busto.med,allSizes[blockValue].busto.max, allSizes[blockValue+1].busto.min]
                const cinturas = [allSizes[blockValue-1].cintura.max,allSizes[blockValue].cintura.min,allSizes[blockValue].cintura.med,allSizes[blockValue].cintura.max, allSizes[blockValue+1].cintura.min]
                const quadris = [allSizes[blockValue-1].quadril.max,allSizes[blockValue].quadril.min,allSizes[blockValue].quadril.med,allSizes[blockValue].quadril.max, allSizes[blockValue+1].quadril.min]
                if (busto == 0) {
                     return setSizeMinusOne(sizeMinusOne, bustos[busto], cinturas[cintura], quadris[quadril])                 
                }
                if (busto >= 1 && busto<=3 ) {
                    //levemente folgado
                    setBustoDescription(allDescriptions[busto+1])
                    setBustoColor(allColors[busto+1])
                    setSizeTop(defaultSize)
                    setEditBusto(bustos[busto])
                }           
                if (busto == 4) {
                    
                   return setSizePlusOne(sizePlusOne, bustos[busto], cinturas[cintura], quadris[quadril])
                }
              
                  setCinturaDescription(allDescriptions[cintura+1])
                  setCinturaColor(allColors[cintura+1])
                  setEditCintura(cinturas[cintura])
                  setQuadrilDescription(allDescriptions[quadril+1])
                  setQuadrilColor(allColors[quadril+1])
                  setEditQuadril(quadris[quadril])
                  return
                }
            }
        })


    }
    const chooseBestCalçaDoll = (imc:number,busto:number,cintura:number,quadril:number) =>{   
        imcCheck(imc)
        const setSizePlusOne = (sizePlusOne:string,apxBusto:number,apxCintura:number,apxQuadril:number) =>{
            setBustoDescription(allDescriptions[busto-2])
            setBustoColor(allColors[busto-2])
            setEditBusto(apxBusto)
            setCinturaDescription(allDescriptions[cintura])
            setCinturaColor(allColors[cintura])
            setEditCintura(apxCintura)
            setQuadrilDescription(allDescriptions[quadril])
            setQuadrilColor(allColors[quadril])
            setEditQuadril(apxQuadril)
            setSizeBottom(sizePlusOne)
        }
        const setSizeMinusOne = (sizeMinusOne:string,apxBusto:number,apxCintura:number,apxQuadril:number) =>{
            setBustoDescription(allDescriptions[busto+5])
            setBustoColor(allColors[busto+5])
            setEditBusto(apxBusto)
            setCinturaDescription(allDescriptions[cintura])
            setCinturaColor(allColors[cintura])
            setEditCintura(apxCintura)
            setQuadrilDescription(allDescriptions[quadril])
            setQuadrilColor(allColors[quadril])
            setEditQuadril(apxQuadril)
            setSizeBottom(sizeMinusOne)
        }

        imcRanges.forEach((v,i,arr)=>{
            //PP
        if(i===0){
           console.log('your size is PP')
            const bustos = [allSizes[i].busto.min, allSizes[i].busto.min+1, allSizes[i].busto.med+1, allSizes[i].busto.max, allSizes[i+1].busto.min]
            const quadris = [allSizes[i].quadril.min, allSizes[i].quadril.min+1, allSizes[i].quadril.med+1, allSizes[i].quadril.max, allSizes[i+1].quadril.min]
            const cinturas = [allSizes[i].cintura.min, allSizes[i].cintura.min+1, allSizes[i].cintura.med+1, allSizes[i].cintura.max, allSizes[i+1].cintura.min]
            
            const blockValue = i
            const defaultSize = allSizesNames[blockValue]
            const sizePlusOne = allSizesNames[blockValue + 1]
            console.warn('is 0?')
            console.warn(busto, typeof busto,' busto log warn')
            
            if (quadril>=0 && quadril<4) {
                setQuadrilDescription(allDescriptions[quadril+1])
                setQuadrilColor(allColors[quadril+1])
                setSizeBottom(defaultSize)
                setEditQuadril(quadris[blockValue+quadril])
            }
       
            if (quadril == 4) {
               return setSizePlusOne(sizePlusOne,bustos[blockValue+busto],cinturas[blockValue+cintura],quadris[blockValue+quadril])
            }
            
               setCinturaDescription(allDescriptions[cintura+1])
               setCinturaColor(allColors[cintura+1])
               setEditCintura(cinturas[cintura])
               setBustoDescription(allDescriptions[busto+1])
               setBustoColor(allColors[busto+1])
               setEditBusto(bustos[busto])
       
        }
        //XG
        if(i==arr.length){
           const blockValue = i
           const defaultSize = allSizesNames[blockValue]
           const sizeMinusOne = allSizesNames[blockValue - 1]
           const bustos = [allSizes[blockValue-1].busto.max,allSizes[blockValue].busto.min,allSizes[blockValue].busto.med-1,allSizes[blockValue].busto.med+1, allSizes[blockValue].busto.max]
           const cinturas = [allSizes[blockValue-1].cintura.max,allSizes[blockValue].cintura.min,allSizes[blockValue].cintura.med-1,allSizes[blockValue].cintura.med+1, allSizes[blockValue].cintura.max]
           const quadris = [allSizes[blockValue-1].quadril.max,allSizes[blockValue].quadril.min,allSizes[blockValue].quadril.med-1,allSizes[blockValue].quadril.med+1, allSizes[blockValue].quadril.max]
           if (quadril == 0) {
               return setSizeMinusOne(sizeMinusOne, bustos[busto], cinturas[cintura], quadris[quadril])
           }
           if (quadril >= 1 && quadril<=4) {
               //levemente folgado
               setQuadrilDescription(allDescriptions[quadril+1])
               setQuadrilColor(allColors[quadril+1])
               setSizeBottom(defaultSize)
               setEditQuadril(quadris[quadril])
           }
           
               setCinturaDescription(allDescriptions[cintura+1])
               setCinturaColor(allColors[cintura+1])
               setEditCintura(cinturas[cintura])
               setBustoDescription(allDescriptions[
                busto+1])
               setBustoColor(allColors[
                busto+1])
               setEditBusto(quadris[
                busto])
           
       }
       //P ao GG
       if(i!==arr.length && i!==0){
           if(imc>arr[i] && imc<arr[i+1]){
               const blockValue = i
               const defaultSize = allSizesNames[blockValue]
               const sizePlusOne = allSizesNames[blockValue + 1]
               const sizeMinusOne = allSizesNames[blockValue - 1]
               const bustos = [allSizes[blockValue-1].busto.max,allSizes[blockValue].busto.min,allSizes[blockValue].busto.med,allSizes[blockValue].busto.max, allSizes[blockValue+1].busto.min]
               const cinturas = [allSizes[blockValue-1].cintura.max,allSizes[blockValue].cintura.min,allSizes[blockValue].cintura.med,allSizes[blockValue].cintura.max, allSizes[blockValue+1].cintura.min]
               const quadris = [allSizes[blockValue-1].quadril.max,allSizes[blockValue].quadril.min,allSizes[blockValue].quadril.med,allSizes[blockValue].quadril.max, allSizes[blockValue+1].quadril.min]
               if (quadril == 0) {
                    return setSizeMinusOne(sizeMinusOne, bustos[busto], cinturas[cintura], quadris[quadril])                 
               }
               if (quadril >= 1 && quadril<=3 ) {
                   //levemente folgado
                   setQuadrilDescription(allDescriptions[busto+1])
                   setQuadrilColor(allColors[busto+1])
                   setSizeBottom(defaultSize)
                   setEditQuadril(bustos[busto])
               }           
               if (quadril == 4) {
                   
                  return setSizePlusOne(sizePlusOne, bustos[busto], cinturas[cintura], quadris[quadril])
               }
             
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturas[cintura])
                 setBustoDescription(allDescriptions[quadril+1])
                 setBustoColor(allColors[quadril+1])
                 setEditBusto(bustos[busto])
                   }
           }
       })




    }
    const chooseBestVestidoDoll = (imc:number,busto:number,cintura:number,quadril:number) =>{   
        imcCheck(imc)
        const setSizePlusOne = (sizePlusOne:string,apxBusto:number,apxCintura:number,apxQuadril:number) =>{
            setBustoDescription(allDescriptions[busto-2])
            setBustoColor(allColors[busto-2])
            setEditBusto(apxBusto)
            setCinturaDescription(allDescriptions[cintura])
            setCinturaColor(allColors[cintura])
            setEditCintura(apxCintura)
            setQuadrilDescription(allDescriptions[quadril])
            setQuadrilColor(allColors[quadril])
            setEditQuadril(apxQuadril)
            setSizeBottom(sizePlusOne)
        }
        const setSizeMinusOne = (sizeMinusOne:string,apxBusto:number,apxCintura:number,apxQuadril:number) =>{
            setBustoDescription(allDescriptions[busto+5])
            setBustoColor(allColors[busto+5])
            setEditBusto(apxBusto)
            setCinturaDescription(allDescriptions[cintura])
            setCinturaColor(allColors[cintura])
            setEditCintura(apxCintura)
            setQuadrilDescription(allDescriptions[quadril])
            setQuadrilColor(allColors[quadril])
            setEditQuadril(apxQuadril)
            setSizeBottom(sizeMinusOne)
        }

        imcRanges.forEach((v,i,arr)=>{
            //PP
        if(i===0){
           console.log('your size is PP')
            const bustos = [allSizes[i].busto.min, allSizes[i].busto.min+1, allSizes[i].busto.med+1, allSizes[i].busto.max, allSizes[i+1].busto.min]
            const quadris = [allSizes[i].quadril.min, allSizes[i].quadril.min+1, allSizes[i].quadril.med+1, allSizes[i].quadril.max, allSizes[i+1].quadril.min]
            const cinturas = [allSizes[i].cintura.min, allSizes[i].cintura.min+1, allSizes[i].cintura.med+1, allSizes[i].cintura.max, allSizes[i+1].cintura.min]
            
            const blockValue = i
            const defaultSize = allSizesNames[blockValue]
            const sizePlusOne = allSizesNames[blockValue + 1]
            console.warn('is 0?')
            console.warn(busto, typeof busto,' busto log warn')
            
            if (quadril>=0 && quadril<4) {
                setQuadrilDescription(allDescriptions[quadril+1])
                setQuadrilColor(allColors[quadril+1])
                setSizeBottom(defaultSize)
                setEditQuadril(quadris[blockValue+quadril])
            }
       
            if (quadril == 4) {
               return setSizePlusOne(sizePlusOne,bustos[blockValue+busto],cinturas[blockValue+cintura],quadris[blockValue+quadril])
            }
            
               setCinturaDescription(allDescriptions[cintura+1])
               setCinturaColor(allColors[cintura+1])
               setEditCintura(cinturas[cintura])
               setBustoDescription(allDescriptions[busto+1])
               setBustoColor(allColors[busto+1])
               setEditBusto(bustos[busto])
       
        }
        //XG
        if(i==arr.length){
           const blockValue = i
           const defaultSize = allSizesNames[blockValue]
           const sizeMinusOne = allSizesNames[blockValue - 1]
           const bustos = [allSizes[blockValue-1].busto.max,allSizes[blockValue].busto.min,allSizes[blockValue].busto.med-1,allSizes[blockValue].busto.med+1, allSizes[blockValue].busto.max]
           const cinturas = [allSizes[blockValue-1].cintura.max,allSizes[blockValue].cintura.min,allSizes[blockValue].cintura.med-1,allSizes[blockValue].cintura.med+1, allSizes[blockValue].cintura.max]
           const quadris = [allSizes[blockValue-1].quadril.max,allSizes[blockValue].quadril.min,allSizes[blockValue].quadril.med-1,allSizes[blockValue].quadril.med+1, allSizes[blockValue].quadril.max]
           if (quadril == 0) {
               return setSizeMinusOne(sizeMinusOne, bustos[busto], cinturas[cintura], quadris[quadril])
           }
           if (quadril >= 1 && quadril<=4) {
               //levemente folgado
               setQuadrilDescription(allDescriptions[quadril+1])
               setQuadrilColor(allColors[quadril+1])
               setSizeBottom(defaultSize)
               setEditQuadril(quadris[quadril])
           }
           
               setCinturaDescription(allDescriptions[cintura+1])
               setCinturaColor(allColors[cintura+1])
               setEditCintura(cinturas[cintura])
               setBustoDescription(allDescriptions[
                busto+1])
               setBustoColor(allColors[
                busto+1])
               setEditBusto(quadris[
                busto])
           
       }
       //P ao GG
       if(i!==arr.length && i!==0){
           if(imc>arr[i] && imc<arr[i+1]){
               const blockValue = i
               const defaultSize = allSizesNames[blockValue]
               const sizePlusOne = allSizesNames[blockValue + 1]
               const sizeMinusOne = allSizesNames[blockValue - 1]
               const bustos = [allSizes[blockValue-1].busto.max,allSizes[blockValue].busto.min,allSizes[blockValue].busto.med,allSizes[blockValue].busto.max, allSizes[blockValue+1].busto.min]
               const cinturas = [allSizes[blockValue-1].cintura.max,allSizes[blockValue].cintura.min,allSizes[blockValue].cintura.med,allSizes[blockValue].cintura.max, allSizes[blockValue+1].cintura.min]
               const quadris = [allSizes[blockValue-1].quadril.max,allSizes[blockValue].quadril.min,allSizes[blockValue].quadril.med,allSizes[blockValue].quadril.max, allSizes[blockValue+1].quadril.min]
               if (quadril == 0) {
                    return setSizeMinusOne(sizeMinusOne, bustos[busto], cinturas[cintura], quadris[quadril])                 
               }
               if (quadril >= 1 && quadril<=3 ) {
                   //levemente folgado
                   setQuadrilDescription(allDescriptions[busto+1])
                   setQuadrilColor(allColors[busto+1])
                   setSizeBottom(defaultSize)
                   setEditQuadril(bustos[busto])
               }           
               if (quadril == 4) {
                   
                  return setSizePlusOne(sizePlusOne, bustos[busto], cinturas[cintura], quadris[quadril])
               }
             
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturas[cintura])
                 setBustoDescription(allDescriptions[quadril+1])
                 setBustoColor(allColors[quadril+1])
                 setEditBusto(bustos[busto])
                   }
           }
       })
    }
    //doll
    const fromEditSetter = (sizeTop:string,sizeBottom:string,sizeWhole:string,bustoCm:number,cinturaCm:number,quadrilCm:number,bustoDescription:string,bustoColor:string,cinturaDescription:string,cinturaColor:string,quadrilDescription:string,quadrilColor:string) =>{

        setSizeTop(sizeTop);
        setSizeBottom(sizeBottom);
        setSizeWhole(sizeWhole);

        // console.log('router query inside the setter', router.query)

        setEditBusto(bustoCm)
        setEditCintura(cinturaCm)
        setEditQuadril(quadrilCm)

        setBustoDescription(bustoDescription)
        setBustoColor(bustoColor)
        setCinturaDescription(cinturaDescription)
        setCinturaColor(cinturaColor)
        setQuadrilDescription(quadrilDescription)
        setQuadrilColor(quadrilColor)
    }
    const resultMasterReturn =  (categoria: string, doll:any, edit:any) =>{
    if(categoria && doll || edit){
        // console.log('router loads', doll,'dollvalue', )
        if(doll){
            // console.log('doll is true')
            allPossibleCategorias.map((v,i,arr)=>{
                if(categoria===v){
                    console.log(categoria,'categoria is equal' ,v )
                    functionsDollObj[i](imc,bustoDoll,cinturaDoll,quadrilDoll)
                    // return true
                }
            })
            
        }
        if(edit){
            fromEditSetter(String(router.query.sizeTop),String(router.query.sizeBottom),String(router.query.sizeWhole),Number(router.query.bustoCm),Number(router.query.cinturaCm),Number(router.query.quadrilCm),String(router.query.bustoDescription),String(router.query.bustoColor),String(router.query.cinturaDescription),String(router.query.cinturaColor),String(router.query.quadrilDescription),String(router.query.quadrilColor));
        }
    }
    else return null
    


    
    }

useEffect(()=>{
    resultMasterReturn(categoria,doll,edit)
},[])
if(!router.isFallback){
    return (<div className='p-4 m-2 flex justify-start outline-1 rounded-lg shadow-md items-center max-w-lg'>
    <div className=' px-2'>
        <div className='max-w-xs'> 
        coisa a imagen
        {/* configurar isso pra ser gerado tbm, exemplo, calça nao precisa de busto */}
         {sizeTop || sizeWhole? <SugarBustoSVG bustoColor={bustoColor} /> :null} 
         <SugarCinturaSVG cinturaColor={cinturaColor} />
         <SugarQuadrilSVG quadrilColor={quadrilColor} />
         {/* configurar isso pra ser gerado tbm */}

        <img alt={'doll std img'} src='/imgs_lela/030303.jpeg'/>

        <OtherSizesFactory baseSize={factoryInfo} setter={(a: string,b: string,c: string,d: number,e: number,f: number,g: string,h: string,i: string,j: string,k: string,l: string)=>{fromEditSetter(a,b,c,d,e,f,g,h,i,j,k,l)}}></OtherSizesFactory>
        </div>
    </div>
    <div className=' w-96 ml-1 pb-6'>
        <h1 className='text-gray-800 font font-medium text-xl'> Sua opção de {categoria} é {sizeTop || sizeBottom || sizeWhole}</h1>
        
        {sizeTop || sizeWhole?<div className='mt-10'>{bustoDescription}</div> :<div className="mt-10">-</div>} 
        <div className='mt-8'>{cinturaDescription}</div>
        <div className='mt-14'>{quadrilDescription}</div>

    <div className='flex flex-col justify-start mt-8'>
         <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/${encodeURIComponent(encodedImgUrl)}`, query:{categoria:categoria}})}>Reiniciar</button>
        {doll ? <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/doll/DollPage`, query: { imc: imc, encodedImgUrl: encodedImgUrl, categoria:categoria } })}>Voltar</button> : null}
        <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => {router.push({ pathname: `${window.location.origin}/medidas/refactor_EditarMedidas`, query: { imc: imc, editBusto: editBusto, editCintura: editCintura, editQuadril: editQuadril, encodedImgUrl: encodedImgUrl, categoria:categoria } }) ; console.log({editBusto,editCintura,editQuadril})}}>Editar medidas</button>
         {/* <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={()=>router.push({pathname:'/medidas/NotFound', query:{imc:imc, encodedImgUrl:encodedImgUrl}})}>NotFound</button> */}
         <a className='rounded-lg bg-gray-50 shadow-lg py-2 my-2 text-center' href='/files/fita-metrica-eufloria.pdf' target={"_blank"} rel='noopener noreferrer'>
           Fita Metrica
            </a>
        </div>

    </div>
</div>)
}
else return <div>loading...</div>
}
