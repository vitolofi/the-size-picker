import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import SugarBustoSVG from './sugar/SugarBusto'

import SugarCinturaSVG from './sugar/SugarCintura'
import SugarQuadrilSVG from './sugar/SugarQuadril'
export default function ResultPage() {
    const router = useRouter()

    // const dollImg = router.query.dollImg
    const encodedImgUrl = router.query.encodedImgUrl
    console.log('olha o encoded na result page,', encodedImgUrl)

    const imc = router.query.imc

    const busto = router.query.busto
    const cintura = router.query.cintura
    const quadril = router.query.quadril

    const bustoCm = router.query.bustoCm
    const cinturaCm = router.query.cinturaCm
    const quadrilCm = router.query.quadrilCm



    const [sizeTop, setSizeTop] = useState<string>('')
    const [sizeBottom, setSizeBottom] = useState<string>('')
    const [sizeWhole, setSizeWhole] = useState<string>('')

    //sugar states
    const [bustoDescription, setBustoDescription] = useState('')
    const [bustoColor, setBustoColor] = useState('')
    const [cinturaDescription, setCinturaDescription] = useState('')
    const [cinturaColor, setCinturaColor] = useState('')
    const [quadrilDescription, setQuadrilDescription] = useState('')
    const [quadrilColor, setQuadrilColor] = useState('')

    const [editBusto, setEditBusto] = useState<string | number>()
    const [editCintura, setEditCintura] = useState<string | number>()
    const [editQuadril, setEditQuadril] = useState<string | number>()

    //boolean values to setup the useEffect
    const doll = router.query.doll
    const edit = router.query.edit
    useEffect(() => {
        //dollpage
        if (doll && imc && busto && cintura && quadril) {
            chooseSizeDoll(+imc, +busto, +cintura, +quadril)
        }

        //exactMeasures
        if (edit && router.query.sizeTop && router.query.sizeBottom && router.query.sizeWhole) {
            setter(router.query.sizeTop as string, router.query.sizeBottom as string, router.query.sizeWhole as string)
        }

        // console.log(sizeTop,sizeBottom,sizeWhole,' olha o log dos sizes')

    }, [doll])

    const setter = (sizeTop: string, sizeBottom: string, sizeWhole: string) => {
        console.log('inside setter', { sizeTop, sizeBottom, sizeWhole })
        setSizeTop(sizeTop);
        setSizeBottom(sizeBottom);
        setSizeWhole(sizeWhole);
        setEditBusto(bustoCm as string)
        setEditCintura(cinturaCm as string)
        setEditQuadril(quadrilCm as string)
    }

    // const chooseSizeExact = (imc,bustoCm,cinturaCm,quadrilCm) => {
    //     if(imc<14 || imc>35.5){
    //         return router.push({pathname:'/medidas/NotFound', query:{encodedImgUrl:encodedImgUrl}})
    //         //go to the Nao encontramos seu tamanho por favor -> Editar Medidas
    //         }

    // }

    const allSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG']

    const PP = { busto: { min: 75, med: 80.5, max: 86 }, cintura: { min: 65, med: 67.5, max: 70 }, quadril: { min: 92, med: 95, max: 98 } }
    const P = { busto: { min: 87, med: 91.5, max: 96 }, cintura: { min: 70, med: 73, max: 76 }, quadril: { min: 99, med: 102, max: 105 } }
    const M = { busto: { min: 97, med: 99.5, max: 102 }, cintura: { min: 77, med: 79, max: 81 }, quadril: { min: 106, med: 108.5, max: 111 } }
    const G = { busto: { min: 103, med: 106, max: 109 }, cintura: { min: 82, med: 84.5, max: 87 }, quadril: { min: 112, med: 115, max: 118 } }
    const GG = { busto: { min: 110, med: 114.5, max: 119 }, cintura: { min: 88, med: 90.5, max: 93 }, quadril: { min: 119, med: 121.5, max: 124 } }
    const XG = { busto: { min: 120, med: 125, max: 130 }, cintura: { min: 94, med: 96.5, max: 99 }, quadril: { min: 125, med: 127.5, max: 130 } }

    const chooseSizeDoll = (imc: number, busto: number, cintura: number, quadril: number) => {
        console.log('inside chooseSizeDoll')
        // console.warn(imc,'imc inside the checkSizeDoll function', busto,'busto',cintura,'cintura',quadril,'quadril')

        if (imc < 14 || imc > 35.5) {
            router.push({ pathname: '/medidas/NotFound', query: { encodedImgUrl: encodedImgUrl } })
            //go to the Nao encontramos seu tamanho por favor -> Editar Medidas
        }
        //pp
        if (imc > 14 && imc < 20) {
            const blockValue = 0
            const defaultSize = allSizes[blockValue]
            const sizePlusOne = allSizes[blockValue + 1]
            // const sizeMinusOne = allSizes[blockValue-1]
            // console.warn('busto:',busto,' is typeof', typeof busto)
            if (busto == 0) {
                console.warn('busto is definately ==0')
                //folgado
                setBustoDescription('Folgado')
                setBustoColor('bg-red-500')
                setSizeTop(defaultSize as string)
                setEditBusto(PP.busto.min)
            }
            if (busto == 1) {
                //levemente folgado
                setBustoDescription('Levemente folgado')
                setBustoColor('bg-orange-500')
                setSizeTop(defaultSize as string)
                setEditBusto(PP.busto.min + 1)
            }
            if (busto == 2) {
                //levemente justo
                setBustoDescription('Levemente justo')
                setBustoColor('bg-green-400')
                setSizeTop(defaultSize as string)
                setEditBusto(PP.busto.med)
            }
            if (busto == 3) {
                //justo
                setBustoDescription('Justo')
                setBustoColor('bg-green-500')
                setSizeTop(defaultSize as string)
                setEditBusto(PP.busto.max)
            }
            if (busto == 4) {
                //folgado
                setBustoDescription('Levemente Folgado')
                setBustoColor('bg-green-500')
                setSizeTop(sizePlusOne as string)
                setEditBusto(P.busto.min)
            }
            if (cintura == 0) {
                setCinturaDescription('Folgado')
                setCinturaColor('bg-red-500')
                setEditCintura(PP.cintura.min)
            }
            if (cintura == 1) {
                setCinturaDescription('Levemente folgado')
                setCinturaColor('bg-orange-500')
                setEditCintura(PP.cintura.min + 1)
            }
            if (cintura == 2) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-400')
                setEditCintura(PP.cintura.med)
            }
            if (cintura == 3) {
                setCinturaDescription('Justo')
                setCinturaColor('bg-green-500')
                setEditCintura(PP.cintura.max)
            }
            if (cintura == 4) {
                setCinturaDescription('Justo')
                setCinturaColor('bg-green-500')
                setEditCintura(P.cintura.min)
            }
            if (quadril == 0) {
                setQuadrilDescription('Folgado')
                setQuadrilColor('bg-red-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(PP.quadril.min)
            }

            if (quadril == 1) {
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(PP.quadril.min + 1)
            }
            if (quadril == 2) {
                setQuadrilDescription('Levemente justo')
                setQuadrilColor('bg-green-400')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(PP.quadril.med)
            }

            if (quadril == 3) {
                setQuadrilDescription('Justo')
                setQuadrilColor('bg-green-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(PP.quadril.max)
            }
            if (quadril == 4) {
                //folgado
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(sizePlusOne as string)
                setSizeWhole(sizePlusOne as string)
                setEditQuadril(P.quadril.min)
            }
        }
        //p
        if (imc > 20 && imc < 23.5) {
            const blockValue = 1
            const defaultSize = allSizes[blockValue]
            const sizePlusOne = allSizes[blockValue + 1]
            const sizeMinusOne = allSizes[blockValue - 1]
            if (busto == 0) {
                //folgado
                setBustoDescription('Folgado')
                setBustoColor('bg-red-500')
                setSizeTop(sizeMinusOne as string)
                setEditBusto(PP.busto.max)
            }
            if (busto == 1) {
                //levemente folgado
                setBustoDescription('Levemente folgado')
                setBustoColor('bg-orange-500')
                setSizeTop(defaultSize as string)
                setEditBusto(P.busto.min)
            }
            if (busto == 2) {
                //levemente justo
                setBustoDescription('Levemente justo')
                setBustoColor('bg-green-400')
                setSizeTop(defaultSize as string)
                setEditBusto(P.busto.med)
            }
            if (busto == 3) {
                //justo
                setBustoDescription('Justo')
                setBustoColor('bg-green-500')
                setSizeTop(defaultSize as string)
                setEditBusto(P.busto.max)
            }
            if (busto == 4) {
                //folgado
                setBustoDescription('Levemente Folgado')
                setBustoColor('bg-green-500')
                setSizeTop(sizePlusOne as string)
                setEditBusto(M.busto.min)
            }
            if (cintura == 0) {
                setCinturaDescription('Folgado')
                setCinturaColor('bg-red-500')
                setEditCintura(PP.cintura.max)
            }
            if (cintura == 1) {
                setCinturaDescription('Levemente folgado')
                setCinturaColor('bg-orange-500')
                setEditCintura(P.cintura.min)
            }
            if (cintura == 2) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-400')
                setEditCintura(P.cintura.med)
            }
            if (cintura == 3) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-500')
                setEditCintura(P.cintura.max)
            }
            if (cintura == 4) {
                setCinturaDescription('Justo')
                setCinturaColor('bg-green-500')
                setEditCintura(M.cintura.min)
            }
            if (quadril == 0) {
                setQuadrilDescription('Folgado')
                setQuadrilColor('bg-red-500')
                setSizeBottom(sizeMinusOne as string)
                setSizeWhole(sizeMinusOne as string)
                setEditQuadril(PP.quadril.max)
            }

            if (quadril == 1) {
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(P.quadril.min)
            }
            if (quadril == 2) {
                setQuadrilDescription('Levemente justo')
                setQuadrilColor('bg-green-400')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(P.quadril.med)
            }

            if (quadril == 3) {
                setQuadrilDescription('Justo')
                setQuadrilColor('bg-green-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(P.quadril.max)
            }
            if (quadril == 4) {
                //folgado
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(sizePlusOne as string)
                setSizeWhole(sizePlusOne as string)
                setEditQuadril(M.quadril.min)
            }
        }
        //m
        if (imc > 23.5 && imc < 28.7) {
            const blockValue = 2
            const defaultSize = allSizes[blockValue]
            const sizePlusOne = allSizes[blockValue + 1]
            const sizeMinusOne = allSizes[blockValue - 1]
            if (busto == 0) {
                //folgado
                setBustoDescription('Folgado')
                setBustoColor('bg-red-500')
                setSizeTop(sizeMinusOne as string)
                setEditBusto(P.busto.max)
            }
            if (busto == 1) {
                //levemente folgado
                setBustoDescription('Levemente folgado')
                setBustoColor('bg-orange-500')
                setSizeTop(defaultSize as string)
                setEditBusto(M.busto.min)
            }
            if (busto == 2) {
                //levemente justo
                setBustoDescription('Levemente justo')
                setBustoColor('bg-green-400')
                setSizeTop(defaultSize as string)
                setEditBusto(M.busto.med)
            }
            if (busto == 3) {
                //justo
                setBustoDescription('Justo')
                setBustoColor('bg-green-500')
                setSizeTop(defaultSize as string)
                setEditBusto(M.busto.max)
            }
            if (busto == 4) {
                //folgado
                setBustoDescription('Levemente Folgado')
                setBustoColor('bg-green-500')
                setSizeTop(sizePlusOne as string)
                setEditBusto(G.busto.min)
            }
            if (cintura == 0) {
                setCinturaDescription('Folgado')
                setCinturaColor('bg-red-500')
                setEditCintura(P.cintura.max)
            }
            if (cintura == 1) {
                setCinturaDescription('Levemente folgado')
                setCinturaColor('bg-orange-500')
                setEditCintura(M.cintura.min)
            }
            if (cintura == 2) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-400')
                setEditCintura(M.cintura.med)
            }
            if (cintura == 3) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-500')
                setEditCintura(M.cintura.max)
            }
            if (cintura == 4) {
                setCinturaDescription('Justo')
                setCinturaColor('bg-green-500')
                setEditCintura(G.cintura.min)
            }
            if (quadril == 0) {
                setQuadrilDescription('Folgado')
                setQuadrilColor('bg-red-500')
                setSizeBottom(sizeMinusOne as string)
                setSizeWhole(sizeMinusOne as string)
                setEditQuadril(P.quadril.max)
            }

            if (quadril == 1) {
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(M.quadril.min)
            }
            if (quadril == 2) {
                setQuadrilDescription('Levemente justo')
                setQuadrilColor('bg-green-400')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(M.quadril.med)
            }

            if (quadril == 3) {
                setQuadrilDescription('Justo')
                setQuadrilColor('bg-green-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(M.quadril.max)
            }
            if (quadril == 4) {
                //folgado
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(sizePlusOne as string)
                setSizeWhole(sizePlusOne as string)
                setEditQuadril(G.quadril.min)
            }
        }
        //g
        if (imc > 28.7 && imc < 30) {
            const blockValue = 3
            const defaultSize = allSizes[blockValue]
            const sizePlusOne = allSizes[blockValue + 1]
            const sizeMinusOne = allSizes[blockValue - 1]
            if (busto == 0) {
                //folgado
                setBustoDescription('Folgado')
                setBustoColor('bg-red-500')
                setSizeTop(sizeMinusOne as string)
                setEditBusto(M.busto.max)
            }
            if (busto == 1) {
                //levemente folgado
                setBustoDescription('Levemente folgado')
                setBustoColor('bg-orange-500')
                setSizeTop(defaultSize as string)
                setEditBusto(G.busto.min)
            }
            if (busto == 2) {
                //levemente justo
                setBustoDescription('Levemente justo')
                setBustoColor('bg-green-400')
                setSizeTop(defaultSize as string)
                setEditBusto(G.busto.med)
            }
            if (busto == 3) {
                //justo
                setBustoDescription('Justo')
                setBustoColor('bg-green-500')
                setSizeTop(defaultSize as string)
                setEditBusto(G.busto.max)
            }
            if (busto == 4) {
                //folgado
                setBustoDescription('Levemente Folgado')
                setBustoColor('bg-green-500')
                setSizeTop(sizePlusOne as string)
                setEditBusto(GG.busto.min)
            }
            if (cintura == 0) {
                setCinturaDescription('Folgado')
                setCinturaColor('bg-red-500')
                setEditCintura(M.cintura.max)
            }
            if (cintura == 1) {
                setCinturaDescription('Levemente folgado')
                setCinturaColor('bg-orange-500')
                setEditCintura(G.cintura.min)
            }
            if (cintura == 2) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-400')
                setEditCintura(G.cintura.med)
            }
            if (cintura == 3) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-500')
                setEditCintura(G.cintura.max)
            }
            if (cintura == 4) {
                setCinturaDescription('Justo')
                setCinturaColor('bg-green-500')
                setEditCintura(GG.cintura.min)
            }
            if (quadril == 0) {
                setQuadrilDescription('Folgado')
                setQuadrilColor('bg-red-500')
                setSizeBottom(sizeMinusOne as string)
                setSizeWhole(sizeMinusOne as string)
                setEditQuadril(M.quadril.max)
            }

            if (quadril == 1) {
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(G.quadril.min)
            }
            if (quadril == 2) {
                setQuadrilDescription('Levemente justo')
                setQuadrilColor('bg-green-400')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(G.quadril.med)
            }

            if (quadril == 3) {
                setQuadrilDescription('Justo')
                setQuadrilColor('bg-green-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(G.quadril.max)
            }
            if (quadril == 4) {
                //folgado
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(sizePlusOne as string)
                setSizeWhole(sizePlusOne as string)
                setEditQuadril(GG.quadril.min)
            }
        }
        //gg
        if (imc > 30 && imc < 32.5) {
            const blockValue = 4
            const defaultSize = allSizes[blockValue]
            const sizePlusOne = allSizes[blockValue + 1]
            const sizeMinusOne = allSizes[blockValue - 1]
            if (busto == 0) {
                //folgado
                setBustoDescription('Folgado')
                setBustoColor('bg-red-500')
                setSizeTop(sizeMinusOne as string)
                setEditBusto(G.busto.max)
            }
            if (busto == 1) {
                //levemente folgado
                setBustoDescription('Levemente folgado')
                setBustoColor('bg-orange-500')
                setSizeTop(defaultSize as string)
                setEditBusto(GG.busto.min)
            }
            if (busto == 2) {
                //levemente justo
                setBustoDescription('Levemente justo')
                setBustoColor('bg-green-400')
                setSizeTop(defaultSize as string)
                setEditBusto(GG.busto.med)
            }
            if (busto == 3) {
                //justo
                setBustoDescription('Justo')
                setBustoColor('bg-green-500')
                setSizeTop(defaultSize as string)
                setEditBusto(GG.busto.max)
            }
            if (busto == 4) {
                //folgado
                setBustoDescription('Levemente Folgado')
                setBustoColor('bg-green-500')
                setSizeTop(sizePlusOne as string)
                setEditBusto(XG.busto.min)
            }
            if (cintura == 0) {
                setCinturaDescription('Folgado')
                setCinturaColor('bg-red-500')
                setEditCintura(G.cintura.max)
            }
            if (cintura == 1) {
                setCinturaDescription('Levemente folgado')
                setCinturaColor('bg-orange-500')
                setEditCintura(GG.cintura.min)
            }
            if (cintura == 2) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-400')
                setEditCintura(GG.cintura.med)
            }
            if (cintura == 3) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-500')
                setEditCintura(GG.cintura.max)
            }
            if (cintura == 4) {
                setCinturaDescription('Justo')
                setCinturaColor('bg-green-500')
                setEditCintura(XG.cintura.min)
            }
            if (quadril == 0) {
                setQuadrilDescription('Folgado')
                setQuadrilColor('bg-red-500')
                setSizeBottom(sizeMinusOne as string)
                setSizeWhole(sizeMinusOne as string)
                setEditQuadril(G.quadril.max)
            }

            if (quadril == 1) {
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(GG.quadril.min)
            }
            if (quadril == 2) {
                setQuadrilDescription('Levemente justo')
                setQuadrilColor('bg-green-400')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(GG.quadril.med)
            }

            if (quadril == 3) {
                setQuadrilDescription('Justo')
                setQuadrilColor('bg-green-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(GG.quadril.max)
            }
            if (quadril == 4) {
                //folgado
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(sizePlusOne as string)
                setSizeWhole(sizePlusOne as string)
                setEditQuadril(XG.quadril.min)
            }
        }
        //xg
        if (imc > 32.5 && imc < 35.5) {
            const blockValue = 5
            const defaultSize = allSizes[blockValue]
            const sizePlusOne = allSizes[blockValue + 1]
            const sizeMinusOne = allSizes[blockValue - 1]
            if (busto == 0) {
                //folgado
                setBustoDescription('Folgado')
                setBustoColor('bg-red-500')
                setSizeTop(sizeMinusOne as string)
                setEditBusto(GG.busto.max)
            }
            if (busto == 1) {
                //levemente folgado
                setBustoDescription('Levemente folgado')
                setBustoColor('bg-orange-500')
                setSizeTop(defaultSize as string)
                setEditBusto(XG.busto.min)
            }
            if (busto == 2) {
                //levemente justo
                setBustoDescription('Levemente justo')
                setBustoColor('bg-green-400')
                setSizeTop(defaultSize as string)
                setEditBusto(XG.busto.med)
            }
            if (busto == 3) {
                //justo
                setBustoDescription('Justo')
                setBustoColor('bg-green-500')
                setSizeTop(defaultSize as string)
                setEditBusto(XG.busto.max - 1)
            }
            if (busto == 4) {
                //folgado
                setBustoDescription('Levemente Folgado')
                setBustoColor('bg-green-500')
                setSizeTop(sizePlusOne as string)
                setEditBusto(XG.busto.max)
            }
            if (cintura == 0) {
                setCinturaDescription('Folgado')
                setCinturaColor('bg-red-500')
                setEditCintura(GG.cintura.max)
            }
            if (cintura == 1) {
                setCinturaDescription('Levemente folgado')
                setCinturaColor('bg-orange-500')
                setEditCintura(XG.cintura.min)
            }
            if (cintura == 2) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-400')
                setEditCintura(XG.cintura.med)
            }
            if (cintura == 3) {
                setCinturaDescription('Levemente justo')
                setCinturaColor('bg-green-500')
                setEditCintura(XG.cintura.max - 1)
            }
            if (cintura == 4) {
                setCinturaDescription('Justo')
                setCinturaColor('bg-green-500')
                setEditCintura(XG.cintura.max)
            }
            if (quadril == 0) {
                setQuadrilDescription('Folgado')
                setQuadrilColor('bg-red-500')
                setSizeBottom(sizeMinusOne as string)
                setSizeWhole(sizeMinusOne as string)
                setEditQuadril(GG.quadril.max)
            }

            if (quadril == 1) {
                setQuadrilDescription('Levemente folgado')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(XG.quadril.min)
            }
            if (quadril == 2) {
                setQuadrilDescription('Levemente justo')
                setQuadrilColor('bg-green-400')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(XG.quadril.med)
            }

            if (quadril == 3) {
                setQuadrilDescription('Justo')
                setQuadrilColor('bg-green-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(XG.quadril.max - 1)
            }
            if (quadril == 4) {
                //folgado
                setQuadrilDescription('Justo')
                setQuadrilColor('bg-orange-500')
                setSizeBottom(defaultSize as string)
                setSizeWhole(defaultSize as string)
                setEditQuadril(XG.quadril.max)
            }
        }
        // if(imc>35.5){
        //     console.log('toooo fat OMG')
        // return router.push({pathname:'/medidas/NotFound', query:{encodedImgUrl:encodedImgUrl}})
        //go to the Nao encontramos seu tamanho por favor -> Editar Medidas
        // }
    }
    console.log(router.query, 'router query')
    // console.log(size,' this is size state')

//     return (<div className='flex flex-col p-4 m-2 outline-1 rounded-lg shadow-md justify-between max-w-lg'>
        
// <div className='px-2'>
//         <div className='flex w-60'>
            
//             <SugarBustoSVG bustoColor={bustoColor} />
//             <SugarCinturaSVG cinturaColor={cinturaColor} />
//             <SugarQuadrilSVG quadrilColor={quadrilColor} />
//             <img src={'/imgs_lela/030303.jpeg'}>
//             </img>
//             <div className='flex flex-col ml-8 bg-green-100'><p>sugar stuff</p>
//             <div className='flex items-center'>

//             <h1 className="text-gray-800 font-medium text-xl">
//                 Sua melhor opção de tamanho para tops ou blusas : {sizeTop}, shorts e calças {sizeBottom}, vestidos etc {sizeWhole}
//             </h1>
//         </div>
//             <div className='mt-3'>{bustoDescription}</div>
//             <div className='mt-8'>{cinturaDescription}</div>
//             <div className='mt-10'>{quadrilDescription}</div>
            
//         {/* aqui vai o esquema largo/justo */}
//             <div className='flex flex-col justify-start mt-8'>
//             <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/${encodeURIComponent(encodedImgUrl as string)}` })}>Reiniciar</button>
//             {doll ? <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/doll/DollPage`, query: { imc: imc, encodedImgUrl: encodedImgUrl } })}>Voltar</button> : null}
//             <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/medidas/EditarMedidas`, query: { imc: imc, editBusto: editBusto, editCintura: editCintura, editQuadril: editQuadril, encodedImgUrl: encodedImgUrl } })}>Editar medidas</button>
//             {/* <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={()=>router.push({pathname:'/medidas/NotFound', query:{imc:imc, encodedImgUrl:encodedImgUrl}})}>NotFound</button> */}
//             {/* <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " >Fita Metrica</button> */}
//             </div>
//         </div>

// </div>
// </div>
//     </div>)
// }
return (<div className='p-4 m-2 flex justify-start outline-1 rounded-lg shadow-md items-center max-w-lg'>
        <div className=' px-2'>
            <div className='max-w-xs'> 
               coisa a imagen
             <SugarBustoSVG bustoColor={bustoColor} />
             <SugarCinturaSVG cinturaColor={cinturaColor} />
             <SugarQuadrilSVG quadrilColor={quadrilColor} />
            <img src='/imgs_lela/030303.jpeg'/>
            </div>
        </div>
        <div className=' w-96 ml-1 pb-6'>
        <h1 className="text-gray-800 font-medium text-xl">
                 Sua melhor opção de tamanho para tops ou blusas : {sizeTop}, shorts e calças {sizeBottom}, vestidos etc {sizeWhole}
            </h1>
            <div className='mt-10'>{bustoDescription}</div>
            <div className='mt-8'>{cinturaDescription}</div>
            <div className='mt-14'>{quadrilDescription}</div>

        <div className='flex flex-col justify-start mt-8'>
             <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/${encodeURIComponent(encodedImgUrl as string)}` })}>Reiniciar</button>
            {doll ? <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/doll/DollPage`, query: { imc: imc, encodedImgUrl: encodedImgUrl } })}>Voltar</button> : null}
            <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={() => router.push({ pathname: `${window.location.origin}/medidas/EditarMedidas`, query: { imc: imc, editBusto: editBusto, editCintura: editCintura, editQuadril: editQuadril, encodedImgUrl: encodedImgUrl } })}>Editar medidas</button>
             {/* <button className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 " onClick={()=>router.push({pathname:'/medidas/NotFound', query:{imc:imc, encodedImgUrl:encodedImgUrl}})}>NotFound</button> */}
             <a className='rounded-lg bg-gray-50 shadow-lg py-2 my-2 text-center' href='/files/fitametrica_OK.pdf' target={"_blank"} rel='noopener noreferrer'>
               Fita Metrica
                </a>
            </div>

        </div>
</div>)
}
