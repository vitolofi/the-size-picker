import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import OtherSizesFactory from '../components/OtherSizesFactory'

import SugarBustoSVG from '../components/sugar/SugarBusto'
import SugarCinturaSVG from '../components/sugar/SugarCintura'
import SugarQuadrilSVG from '../components/sugar/SugarQuadril'






export default function ResultPage() {
    const router = useRouter()


    const categoria = router.query.categoria


    // const dollImg = router.query.dollImg
    const encodedImgUrl = String(router.query.encodedImgUrl)
    console.log('olha o encoded na result page,', encodedImgUrl)

    const imc = Number(router.query.imc)
    

    const busto = Number(router.query.busto)
    const cintura = Number(router.query.cintura)
    const quadril = Number(router.query.quadril)

    const bustoCm = Number(router.query.bustoCm)
    const cinturaCm = Number(router.query.cinturaCm)
    const quadrilCm = Number(router.query.quadrilCm)



    const [sizeTop, setSizeTop] = useState<string>('')
    const [sizeBottom, setSizeBottom] = useState<string>('')
    const [sizeWhole, setSizeWhole] = useState<string>('')

    const [finalSize,setFinalSize] = useState<string>('')

    //sugar states
    const [bustoDescription, setBustoDescription] = useState<string>('')
    const [bustoColor, setBustoColor] = useState<string>('')
    const [cinturaDescription, setCinturaDescription] = useState<string>('')
    const [cinturaColor, setCinturaColor] = useState<string>('')
    const [quadrilDescription, setQuadrilDescription] = useState<string>('')
    const [quadrilColor, setQuadrilColor] = useState<string>('')

    const [editBusto, setEditBusto] = useState<string | number>()
    const [editCintura, setEditCintura] = useState<string | number>()
    const [editQuadril, setEditQuadril] = useState<string | number>()

    //boolean values to setup the useEffect
    const doll = router.query.doll
    const edit = router.query.edit
    useEffect(() => {
        //dollpage
        if (doll){
            if(imc){
                console.warn('can it enter?')
            if(busto && cintura && quadril || busto===0 || cintura===0 || quadril===0) {
            chooseSizeDoll(imc, busto, cintura, quadril)
            }
        }
    }

        //exactMeasures
        if (edit){
            if(router.query.sizeTop){        
                if(router.query.sizeBottom && router.query.sizeWhole) {
                    setter(String(router.query.sizeTop), String(router.query.sizeBottom), String(router.query.sizeWhole), String(router.query.bustoDescription), String(router.query.bustoColor), String(router.query.cinturaDescription), String(router.query.cinturaColor), String(router.query.quadrilDescription), String(router.query.quadrilColor))
                } 
            }
        }

    }, [router.query])

    // change this name
    const setter = (sizeTop:string, sizeBottom:string, sizeWhole:string, bustoDesc:string, bustoColorEdit:string, cinturaDesc:string, cinturaColorEdit:string, quadrilDesc:string, quadrilColorEdit:string) => {
        console.log('inside setter', { sizeTop, sizeBottom, sizeWhole })
        setSizeTop(sizeTop);
        setSizeBottom(sizeBottom);
        setSizeWhole(sizeWhole);
        setEditBusto(bustoCm)
        setEditCintura(cinturaCm)
        setEditQuadril(quadrilCm)
        setBustoDescription(bustoDesc)
        setBustoColor(bustoColorEdit)
        setCinturaDescription(cinturaDesc)
        setCinturaColor(cinturaColorEdit)
        setQuadrilDescription(quadrilDesc)
        setQuadrilColor(quadrilColorEdit)
    }



    const allSizesNames = ['PP', 'P', 'M', 'G', 'GG', 'XG']
    const allDescriptions = ['Largo', 'Folgado', 'Levemente folgado', 'Ideal', 'Levemente Justo', 'Justo', 'Apertado']
    const allColors = ['stroke-red-500', 'stroke-yellow-500', 'stroke-green-300', 'stroke-green-500','stroke-green-300', 'stroke-yellow-500','stroke-red-500']
    const imcRanges = [14,20,23.5,28.7,30,32.5,35.5]
    const PP = { busto: { min: 75, med: 80.5, max: 86 }, cintura: { min: 65, med: 67.5, max: 70 }, quadril: { min: 92, med: 95, max: 98 } }
    const P = { busto: { min: 87, med: 91.5, max: 96 }, cintura: { min: 70, med: 73, max: 76 }, quadril: { min: 99, med: 102, max: 105 } }
    const M = { busto: { min: 97, med: 99.5, max: 102 }, cintura: { min: 77, med: 79, max: 81 }, quadril: { min: 106, med: 108.5, max: 111 } }
    const G = { busto: { min: 103, med: 106, max: 109 }, cintura: { min: 82, med: 84.5, max: 87 }, quadril: { min: 112, med: 115, max: 118 } }
    const GG = { busto: { min: 110, med: 114.5, max: 119 }, cintura: { min: 88, med: 90.5, max: 93 }, quadril: { min: 119, med: 121.5, max: 124 } }
    const XG = { busto: { min: 120, med: 125, max: 130 }, cintura: { min: 94, med: 96.5, max: 99 }, quadril: { min: 125, med: 127.5, max: 130 } }

    const allSizes=[PP,P,M,G,GG,XG]
    
    const setSizeTopPlusOne = (sizePlusOne: string, apxBusto: number,  apxCintura: number, apxQuadril: number)=>{
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
    }
    const setSizeTopMinusOne = (sizeMinusOne: string, apxBusto: number,apxCintura: number,apxQuadril: number) =>{
        setBustoDescription(allDescriptions[busto+5])
        setBustoColor(allColors[busto+5])
        setEditBusto(apxBusto)
        setCinturaDescription(allDescriptions[cintura])
        setCinturaColor(allColors[cintura])
        setEditCintura(apxCintura)
        setQuadrilDescription(allDescriptions[quadril])
        setQuadrilColor(allColors[quadril])
        setEditQuadril(apxQuadril)
        
        setSizeTop(sizeMinusOne)
        
    }
    const setSizeBottomAndWholePlusOne = (sizePlusOne: string, apxBusto: number,  apxCintura: number, apxQuadril: number)=>{
        setBustoDescription(allDescriptions[busto])
        setBustoColor(allColors[busto])
        setEditBusto(apxBusto)
        setCinturaDescription(allDescriptions[cintura-2])
        setCinturaColor(allColors[cintura-2])
        setEditCintura(apxCintura)
        setQuadrilDescription(allDescriptions[quadril-2])
        setQuadrilColor(allColors[quadril-2])
        setEditQuadril(apxQuadril)
        
        setSizeBottom(sizePlusOne)
        setSizeWhole(sizePlusOne)
    }
    const setSizeBottomAndWholeMinusOne = (sizeMinusOne: string, apxBusto: number, apxCintura: number,apxQuadril: number) =>{
        //if whole || bottom?
        setBustoDescription(allDescriptions[busto])
        setBustoColor(allColors[busto])
        setEditBusto(apxBusto)
        setCinturaDescription(allDescriptions[cintura+2])
        setCinturaColor(allColors[cintura+2])
        setEditCintura(apxCintura)
        setQuadrilDescription(allDescriptions[quadril+2])
        setQuadrilColor(allColors[quadril+2])
        setEditQuadril(apxQuadril)
        
        setSizeBottom(sizeMinusOne)
        setSizeWhole(sizeMinusOne)
    }

    const imcCheck = (imc: number) =>{
        if (imc < 14 || imc > 35.5) {
            router.push({ pathname: '/medidas/NotFound', query: { encodedImgUrl: encodedImgUrl } })
            //go to the Nao encontramos seu tamanho por favor -> Editar Medidas
        }
        
    }

    //change names
    const chooseSizeDoll = (imc: number, busto: number, cintura: number, quadril: number) => {
        console.log('chooseSizeDoll')
        imcCheck(imc)
        imcRanges.forEach((v,i,arr)=>{
            //PP
         if(i===0){
            console.log('your size is PP')
             const bustosPP = [PP.busto.min, PP.busto.min+1, PP.busto.med+1, PP.busto.max, P.busto.min]
             const quadrisPP = [PP.quadril.min, PP.quadril.min+1, PP.quadril.med+1, PP.quadril.max, P.quadril.min]
             const cinturasPP = [PP.cintura.min, PP.cintura.min+1, PP.cintura.med+1, PP.cintura.max, P.cintura.min]
             
             const blockValue = 0
             const defaultSize = allSizesNames[blockValue]
             const sizePlusOne = allSizesNames[blockValue + 1]
             console.warn('is 0?')
             console.warn(busto, typeof busto,' busto log warn')
             
             if (busto==0) {
                 //folgado 
                 setBustoDescription(allDescriptions[busto+1])
                 setBustoColor(allColors[busto+1])
                 setSizeTop(defaultSize)
                 setEditBusto(bustosPP[blockValue+busto])
             }
             if (busto == 1) {
                 //levemente folgado
                 setBustoDescription(allDescriptions[busto+1])
                 setBustoColor(allColors[busto+1])
                 setSizeTop(defaultSize)
                 setEditBusto(bustosPP[blockValue+busto])
             }
             if (busto == 2) {
                 //levemente justo
                 setBustoDescription(allDescriptions[busto+1])
                 setBustoColor(allColors[busto+1])
                 setSizeTop(defaultSize)
                 setEditBusto(bustosPP[blockValue+busto])
             }
             if (busto == 3) {
                 //justo
                 setBustoDescription(allDescriptions[busto+1])
                 setBustoColor(allColors[busto+1])
                 setSizeTop(defaultSize)
                 setEditBusto(bustosPP[blockValue+busto])
             }
             if (busto == 4) {
                 //folgado
                return setSizeTopPlusOne(sizePlusOne,bustosPP[blockValue+busto],cinturasPP[blockValue+cintura],quadrisPP[blockValue+quadril])
             }
             if (cintura == 0) {
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturasPP[cintura])
             }
             if (cintura == 1) {
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturasPP[cintura])
             }
             if (cintura == 2) {
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturasPP[cintura])
             }
             if (cintura == 3) {
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturasPP[cintura])
             }
             if (cintura == 4) {
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturasPP[cintura])
             }
             if (quadril == 0) {
                 setQuadrilDescription(allDescriptions[quadril+1])
                 setQuadrilColor(allColors[quadril+1])
                 setSizeBottom(defaultSize)
                 setSizeWhole(defaultSize)
                 setEditQuadril(quadrisPP[quadril])
             }
 
             if (quadril == 1) {
                 setQuadrilDescription(allDescriptions[quadril+1])
                 setQuadrilColor(allColors[quadril+1])
                 setSizeBottom(defaultSize)
                 setSizeWhole(defaultSize)
                 setEditQuadril(quadrisPP[quadril])
             }
             if (quadril == 2) {
                 setQuadrilDescription(allDescriptions[quadril+1])
                 setQuadrilColor(allColors[quadril+1])
                 setSizeBottom(defaultSize)
                 setSizeWhole(defaultSize)
                 setEditQuadril(quadrisPP[quadril])
             }
 
             if (quadril == 3) {
                 setQuadrilDescription(allDescriptions[quadril+1])
                 setQuadrilColor(allColors[quadril+1])
                 setSizeBottom(defaultSize)
                 setSizeWhole(defaultSize)
                 setEditQuadril(quadrisPP[quadril])
             }
             if (quadril == 4) {
                return setSizeBottomAndWholePlusOne(sizePlusOne,bustosPP[blockValue+busto],cinturasPP[blockValue+cintura],quadrisPP[blockValue+quadril])
             }
         }
         //XG ou ultimo tamanho
         if(i==arr.length){
             const blockValue = i
             const defaultSize = allSizesNames[blockValue]
             const sizeMinusOne = allSizesNames[blockValue - 1]
             const bustos = [allSizes[blockValue-1].busto.max,allSizes[blockValue].busto.min,allSizes[blockValue].busto.med-1,allSizes[blockValue].busto.med+1, allSizes[blockValue].busto.max]
             const cinturas = [allSizes[blockValue-1].cintura.max,allSizes[blockValue].cintura.min,allSizes[blockValue].cintura.med-1,allSizes[blockValue].cintura.med+1, allSizes[blockValue].cintura.max]
             const quadris = [allSizes[blockValue-1].quadril.max,allSizes[blockValue].quadril.min,allSizes[blockValue].quadril.med-1,allSizes[blockValue].quadril.med+1, allSizes[blockValue].quadril.max]
             if (busto == 0) {
                 //folgado
 
                 return setSizeTopMinusOne(sizeMinusOne, bustos[busto], cinturas[cintura], quadris[quadril])
                 // setBustoDescription(allDescriptions[busto+5])
                 // setBustoColor(allColors[busto+5])
 
                 
             }
             if (busto == 1) {
                 //levemente folgado
                 setBustoDescription(allDescriptions[busto+1])
                 setBustoColor(allColors[busto+1])
                 setSizeTop(defaultSize)
                 setEditBusto(bustos[busto])
             }
             if (busto == 2) {
                 //Ideal
                 setBustoDescription(allDescriptions[busto+1])
                 setBustoColor(allColors[busto+1])
                 setSizeTop(defaultSize)
                 setEditBusto(bustos[busto])
             }
             if (busto == 3) {
                 //Levemente Justo
                 setBustoDescription(allDescriptions[busto+1])
                 setBustoColor(allColors[busto+1])
                 setSizeTop(defaultSize)
                 setEditBusto(bustos[busto])
             }
             if (busto == 4) {
                 setBustoDescription(allDescriptions[busto+1])
                 setBustoColor(allColors[busto+1])
                 setSizeTop(defaultSize)
                 setEditBusto(bustos[busto])
                 
                 
                 //levemente folgado
                 // setBustoColor(allDescriptions[busto-2])
                 // setBustoDescription(allDescriptions[busto-2])
             }
             if (cintura == 0) {
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturas[cintura])
             }
             if (cintura == 1) {
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturas[cintura])
             }
             if (cintura == 2) {
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturas[cintura])
             }
             if (cintura == 3) {
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturas[cintura])
             }
             if (cintura == 4) {
                 setCinturaDescription(allDescriptions[cintura+1])
                 setCinturaColor(allColors[cintura+1])
                 setEditCintura(cinturas[cintura])
             }
             if (quadril == 0) {
                 // setQuadrilDescription('Folgado')
                 // setQuadrilColor('stroke-red-500')
                 // setSizeBottom(sizeMinusOne)
                 // setSizeWhole(sizeMinusOne)
                 // setEditQuadril(PP.quadril.max)
                return setSizeBottomAndWholeMinusOne(sizeMinusOne, bustos[busto], cinturas[cintura], quadris[quadril])
                 
             }
 
             if (quadril == 1) {
 
                 setQuadrilDescription(allDescriptions[quadril+1])
                 setQuadrilColor(allColors[quadril+1])
                 setSizeBottom(defaultSize)
                 setSizeWhole(defaultSize)
                 setEditQuadril(quadris[quadril])
             }
             if (quadril == 2) {
                 setQuadrilDescription(allDescriptions[quadril+1])
                 setQuadrilColor(allColors[quadril+1])
                 setSizeBottom(defaultSize)
                 setSizeWhole(defaultSize)
                 setEditQuadril(quadris[quadril])
             }
 
             if (quadril == 3) {
                 setQuadrilDescription(allDescriptions[quadril+1])
                 setQuadrilColor(allColors[quadril+1])
                 setSizeBottom(defaultSize)
                 setSizeWhole(defaultSize)
                 setEditQuadril(quadris[quadril])
             }
             if (quadril == 4) {
                 setQuadrilDescription(allDescriptions[quadril+1])
                 setQuadrilColor(allColors[quadril+1])
                 setSizeBottom(defaultSize)
                 setSizeWhole(defaultSize)
                 setEditQuadril(quadris[quadril])
             }
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
                 if (busto == 0) {
                     //folgado
     
                     return setSizeTopMinusOne(sizeMinusOne, bustos[busto], cinturas[cintura], quadris[quadril])
                     // setBustoDescription(allDescriptions[busto+5])
                     // setBustoColor(allColors[busto+5])
     
                     
                 }
                 if (busto == 1) {
                     //levemente folgado
                     setBustoDescription(allDescriptions[busto+1])
                     setBustoColor(allColors[busto+1])
                     setSizeTop(defaultSize)
                     setEditBusto(bustos[busto])
                 }
                 if (busto == 2) {
                     //Ideal
                     setBustoDescription(allDescriptions[busto+1])
                     setBustoColor(allColors[busto+1])
                     setSizeTop(defaultSize)
                     setEditBusto(bustos[busto])
                 }
                 if (busto == 3) {
                     //Levemente Justo
                     setBustoDescription(allDescriptions[busto+1])
                     setBustoColor(allColors[busto+1])
                     setSizeTop(defaultSize)
                     setEditBusto(bustos[busto])
                 }
                 if (busto == 4) {
                     
                     setSizeTopPlusOne(sizePlusOne, bustos[busto], cinturas[cintura], quadris[quadril])
                     //levemente folgado
                     // setBustoColor(allDescriptions[busto-2])
                     // setBustoDescription(allDescriptions[busto-2])
                 }
                 if (cintura == 0) {
                     setCinturaDescription(allDescriptions[cintura+1])
                     setCinturaColor(allColors[cintura+1])
                     setEditCintura(cinturas[cintura])
                 }
                 if (cintura == 1) {
                     setCinturaDescription(allDescriptions[cintura+1])
                     setCinturaColor(allColors[cintura+1])
                     setEditCintura(cinturas[cintura])
                 }
                 if (cintura == 2) {
                     setCinturaDescription(allDescriptions[cintura+1])
                     setCinturaColor(allColors[cintura+1])
                     setEditCintura(cinturas[cintura])
                 }
                 if (cintura == 3) {
                     setCinturaDescription(allDescriptions[cintura+1])
                     setCinturaColor(allColors[cintura+1])
                     setEditCintura(cinturas[cintura])
                 }
                 if (cintura == 4) {
                     setCinturaDescription(allDescriptions[cintura+1])
                     setCinturaColor(allColors[cintura+1])
                     setEditCintura(cinturas[cintura])
                 }
                 if (quadril == 0) {
                     // setQuadrilDescription('Folgado')
                     // setQuadrilColor('stroke-red-500')
                     // setSizeBottom(sizeMinusOne)
                     // setSizeWhole(sizeMinusOne)
                     // setEditQuadril(PP.quadril.max)
                     setSizeBottomAndWholeMinusOne(sizePlusOne, bustos[busto], cinturas[cintura], quadris[quadril])
                     
                 }
     
                 if (quadril == 1) {
     
                     setQuadrilDescription(allDescriptions[quadril+1])
                     setQuadrilColor(allColors[quadril+1])
                     setSizeBottom(defaultSize)
                     setSizeWhole(defaultSize)
                     setEditQuadril(quadris[quadril])
                 }
                 if (quadril == 2) {
                     setQuadrilDescription(allDescriptions[quadril+1])
                     setQuadrilColor(allColors[quadril+1])
                     setSizeBottom(defaultSize)
                     setSizeWhole(defaultSize)
                     setEditQuadril(quadris[quadril])
                 }
     
                 if (quadril == 3) {
                     setQuadrilDescription(allDescriptions[quadril+1])
                     setQuadrilColor(allColors[quadril+1])
                     setSizeBottom(defaultSize)
                     setSizeWhole(defaultSize)
                     setEditQuadril(quadris[quadril])
                 }
                 if (quadril == 4) {
     
                     setSizeBottomAndWholePlusOne(sizePlusOne, bustos[busto], cinturas[cintura], quadris[quadril])
                 }
                     }
             }
         }) 
    }
    console.log(router.query, 'router query', busto,'=busto tipo =' ,typeof busto,'inrouter is', router.query.busto,)
    if(!router.isFallback)return (<div className='p-4 m-2 flex justify-start outline-1 rounded-lg shadow-md items-center max-w-lg'>
        <div className=' px-2'>
            <div className='max-w-xs'> 
            coisa a imagen
               {/* change structure and names here */}
             <SugarBustoSVG bustoColor={bustoColor} />
             <SugarCinturaSVG cinturaColor={cinturaColor} />
             <SugarQuadrilSVG quadrilColor={quadrilColor} />
             {/* change structure and names here */}
            <img alt={'doll std img'} src='/imgs_lela/030303.jpeg'/>
            {/* map allSizes to buttons, and uses a factory that fabricates an object that is the full result, and will interact here */}
            {/* {allSizes.map((v,i,arr)=>{
                return <button className="rounded-lg bg-gray-50 shadow-lg py-2 mx-2">{v}</button>
            })} */}
            <OtherSizesFactory></OtherSizesFactory>
            </div>
        </div>
        <div className=' w-96 ml-1 pb-6'>
            {/* change struct here */}
        {/* <h1 className="text-gray-800 font-medium text-xl">
                 Sua melhor opção de tamanho para tops ou blusas : {sizeTop}, shorts e calças {sizeBottom}, vestidos etc {sizeWhole}
            </h1> */}
            {categoria==='Camisa'? <h1 className='text-gray-800 font font-medium text-xl'> Sua opção de {categoria} é {sizeTop}</h1>: null}
            {categoria==="Calça"? <h1 className='text-gray-800 font font-medium text-xl'> Sua opção de {categoria} é {sizeBottom}</h1>: null}
            {categoria==="Vestido"? <h1 className='text-gray-800 font font-medium text-xl'> Sua opção de {categoria} é {sizeWhole}</h1>: null}
            {/* change struct here */}
            <div className='mt-10'>{bustoDescription}</div>
            <div className='mt-8'>{cinturaDescription}</div>
            <div className='mt-14'>{quadrilDescription}</div>

        <div className='flex flex-col justify-start mt-8'>
             <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/${encodeURIComponent(encodedImgUrl)}`, query:{categoria:categoria}})}>Reiniciar</button>
            {doll ? <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/doll/DollPage`, query: { imc: imc, encodedImgUrl: encodedImgUrl, categoria:categoria } })}>Voltar</button> : null}
            <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/medidas/EditarMedidas`, query: { imc: imc, editBusto: editBusto, editCintura: editCintura, editQuadril: editQuadril, encodedImgUrl: encodedImgUrl, categoria:categoria } })}>Editar medidas</button>
             {/* <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={()=>router.push({pathname:'/medidas/NotFound', query:{imc:imc, encodedImgUrl:encodedImgUrl}})}>NotFound</button> */}
             <a className='rounded-lg bg-gray-50 shadow-lg py-2 my-2 text-center' href='/files/fita-metrica-eufloria.pdf' target={"_blank"} rel='noopener noreferrer'>
               Fita Metrica
                </a>
            </div>

        </div>
</div>)
}
