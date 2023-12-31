import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { roboto } from '..'
import Image from 'next/image'
import { useSettings, SizeInfo} from "@/components/Context/SettingsProvider";
export default function EditarMedidas() {
  const router = useRouter();

  const [bustoDescription, setBustoDescription] = useState('')
  const [bustoColor, setBustoColor] = useState('')
  const [cinturaDescription, setCinturaDescription] = useState('')
  const [cinturaColor, setCinturaColor] = useState('')
  const [quadrilDescription, setQuadrilDescription] = useState('')
  const [quadrilColor, setQuadrilColor] = useState('')

  const editBusto = Number(router.query.editBusto);
  const editCintura = Number(router.query.editCintura);
  const editQuadril = Number(router.query.editQuadril);
  const encodedImgUrl = String(router.query.encodedImgUrl);
  const categoria = String(router.query.categoria)

  const [bustoCm, setBustoCm] = useState(editBusto);
  const [cinturaCm, setCinturaCm] = useState(editCintura);
  const [quadrilCm, setQuadrilCm] = useState(editQuadril);

  //trocar essas imagens
  const [dollImg, setDollImg] = useState("/busto.png");
  const helperDescriptions = ["Para medir o busto coloque a fita no meio dos seios, na altura do mamilo. Depois, passe por trás das costas até encontrar a ponta ao centro.", "A cintura é a medida localizada entre a ultima costela e o osso do quadril", "A medida do seu quadril deve considerar o ponto mais alto dos seus gluteos, provavelmente na altura média do seu bumbum."]
  const [imgDescription,setImageDescription] = useState(helperDescriptions[0])


  const [sizeTop, setSizeTop] = useState("");
  const [sizeBottom, setSizeBottom] = useState("");
  const [sizeWhole, setSizeWhole] = useState("");

  const [settings] = useSettings()
  const {allColors,allDescriptions,allPossibleCategories,allSizesNames} = settings
  const allSizes:SizeInfo[] = [settings.allSizes.PP,settings.allSizes.P,settings.allSizes.M,settings.allSizes.G,settings.allSizes.GG,settings.allSizes.XG]

  const eraseStates = () => {
    setSizeTop('')
    setSizeBottom('')
    setSizeWhole('')
    setBustoColor('')
    setBustoDescription('')
    setCinturaColor('')
    setCinturaDescription('')
    setQuadrilColor('')
    setQuadrilDescription('')
  }


  const setCamisaEdit = () => {
    allSizes.forEach((size, sizeIndex, allSizes) => {
      if (bustoCm >= size.busto.min && bustoCm <= size.busto.max && bustoCm > cinturaCm) {
        const stepB = Math.floor((size.busto.max - size.busto.min) / 4)
        const oneB = Math.floor(size.busto.min + stepB)
        const twoB = Math.floor(size.busto.min + stepB + stepB)
        const bustoRanges = [size.busto.min, oneB, twoB, size.busto.max]
        bustoRanges.forEach((v, i, arr) => {
          if (i !== arr.length) {
            if (bustoCm >= arr[i] && bustoCm <= arr[i + 1]) {
              // console.log('this entered the range of busto', arr[i], bustoCm, arr[i + 1])
              setSizeTop(allSizesNames[sizeIndex])
              setBustoDescription(allDescriptions[i + 2])
              setBustoColor(allColors[i + 2])
            }
          }
        })
        // console.log('setting cintura and quadril inside camisa')
        //then set the other stuff   
        const stepC = Math.floor((size.cintura.max - size.cintura.min) / 4)
        const oneC = Math.floor(size.cintura.min + stepC)
        const twoC = Math.floor(size.cintura.min + stepC + stepC)
        const cinturaRanges = [size.cintura.min, oneC, twoC, size.cintura.max]
        cinturaRanges.forEach((v, i, arr) => {
          if (i !== arr.length) {
            // console.log('testing cintura:', cinturaCm)
            if (cinturaCm < size.cintura.min && cinturaCm >= size.cintura.min - 6) {
              // console.log('cintura size should be loose. index now', i)
              setCinturaDescription(allDescriptions[1])
              setCinturaColor(allColors[1])
              return
            }
            if (cinturaCm < size.cintura.min - 6) return eraseStates()

            if (cinturaCm >= arr[i] && cinturaCm <= arr[i + 1]) {
              // console.log('inside a valid range of cintura')
              setCinturaDescription(allDescriptions[i + 2])
              setCinturaColor(allColors[i + 2])
              return
            }
            if (cinturaCm > size.cintura.max && cinturaCm <= size.cintura.max + 6) {
              // console.log('cintura size description should be tight apertado')
              setCinturaDescription(allDescriptions[5])
              setCinturaColor(allColors[5])
              return
            }
            if (cinturaCm > size.cintura.max + 6) return eraseStates()

          }
        })

        const stepQ = ((size.quadril.max - size.quadril.min) / 4)
        const oneQ = (size.quadril.min + stepQ)
        const twoQ = (size.quadril.min + stepQ + stepQ)
        const quadrilRanges = [size.quadril.min, oneQ, twoQ, size.quadril.max]
        quadrilRanges.forEach((v, i, arr) => {
          if (i !== arr.length) {
            if (quadrilCm < size.quadril.min && quadrilCm > size.quadril.min - 6) {
              // console.log('quadril size should be loose.')
              setQuadrilDescription(allDescriptions[1])
              setQuadrilColor(allColors[1])
              return
            }
            if (quadrilCm < size.quadril.min - 7) return eraseStates()
            if (quadrilCm >= arr[i] && quadrilCm <= arr[i + 1]) {
              // console.log('inside a valid range of quadril')
              setQuadrilDescription(allDescriptions[i + 2])
              setQuadrilColor(allColors[i + 2])
              return
            }
            if (quadrilCm > size.quadril.max && quadrilCm <= size.quadril.max + 6) {
              // console.log('quadril size description should be tight apertado')
              setQuadrilDescription(allDescriptions[5])
              setQuadrilColor(allColors[5])
              return
            }
            if (quadrilCm > size.quadril.max + 7) return eraseStates()
          }
        })

      }
      if (cinturaCm > bustoCm) {
        // console.warn('cintura is bigger than busto')
        if (sizeIndex + 1 < allSizes.length) {
          //console.log('i have a valid next size')
          if (cinturaCm < allSizes[sizeIndex + 1].cintura.max && quadrilCm < allSizes[sizeIndex + 1].quadril.max) {
            // console.log('cintura is valid in next size')
            //this block is about finding the appropriate busto, set it to next size, drop-2 descriptions in busto and quadril
            //then set cintura as usual
            const stepB = Math.floor((size.busto.max - size.busto.min) / 4)
            const oneB = Math.floor(size.busto.min + stepB)
            const twoB = Math.floor(size.busto.min + stepB + stepB)
            const bustoRanges = [size.busto.min, oneB, twoB, size.busto.max]
            bustoRanges.forEach((v, i, arr) => {
              if (i !== arr.length) {
                //console.log('im about to define the correct(sizeMinusOne of) busto)
                if (bustoCm >= arr[i] && bustoCm <= arr[i + 1]) {
                  // console.log('this entered the range of busto', arr[i], bustoCm, arr[i + 1])
                  setSizeTop(allSizesNames[sizeIndex + 1])
                  setBustoDescription(allDescriptions[i])
                  setBustoColor(allColors[i])

                  //setting cintura normal on next size

                  const stepC = Math.floor((allSizes[sizeIndex + 1].cintura.max - allSizes[sizeIndex + 1].cintura.min) / 4)
                  const oneC = Math.floor(allSizes[sizeIndex + 1].cintura.min + stepC)
                  const twoC = Math.floor(allSizes[sizeIndex + 1].cintura.min + stepC + stepC)
                  const cinturaRanges = [allSizes[sizeIndex + 1].cintura.min, oneC, twoC, allSizes[sizeIndex + 1].cintura.max]

                  cinturaRanges.forEach((v, i, arr) => {
                    if (i !== arr.length) {
                      if (cinturaCm >= arr[i] && cinturaCm <= arr[i + 1]) {
                        // console.log('inside a valid range of cintura')
                        setCinturaDescription(allDescriptions[i + 2])
                        setCinturaColor(allColors[i + 2])
                        return
                      }

                    }
                  })
                  //setting quadril to drop-2
                  const stepQ = Math.floor((size.quadril.max - size.quadril.min) / 4)
                  const oneQ = Math.floor(size.quadril.min + stepQ)
                  const twoQ = Math.floor(size.quadril.min + stepQ + stepQ)
                  const quadrilRanges = [size.quadril.min, oneQ, twoQ, size.quadril.max]
                  quadrilRanges.forEach((v, i, arr) => {
                    if (i !== arr.length) {
                      if (quadrilCm < size.quadril.min) {
                        // console.log('quadril size should be loose.')
                        setQuadrilDescription(allDescriptions[1])
                        setQuadrilColor(allColors[1])
                        return
                      }
                      if (quadrilCm >= arr[i] && quadrilCm <= arr[i + 1]) {
                        // console.log('inside a valid range of quadril')
                        setQuadrilDescription(allDescriptions[i])
                        setQuadrilColor(allColors[i])
                        return
                      }
                      if (quadrilCm > size.quadril.max) {
                        // console.log('quadril size description should be tight apertado')
                        setQuadrilDescription(allDescriptions[6])
                        setQuadrilColor(allColors[6])
                        return
                      }
                    }
                  })
                }
              }
            })

            // console.log('cintura is larger than busto, but its ok')


          }
          else {
            return null
          }
        }
      }
    })
  }
  const setCalçaEdit = () => {
    allSizes.forEach((size, sizeIndex, allSizes) => {
      if (quadrilCm >= size.quadril.min && quadrilCm <= size.quadril.max && quadrilCm > cinturaCm) {
        const stepQ = ((size.quadril.max - size.quadril.min) / 4)
        const oneQ = (size.quadril.min + stepQ)
        const twoQ = (size.quadril.min + stepQ + stepQ)
        const quadrilRanges = [size.quadril.min, oneQ, twoQ, size.quadril.max]
        quadrilRanges.forEach((v, i, arr) => {
          if (i !== arr.length) {
            if (quadrilCm >= arr[i] && quadrilCm <= arr[i + 1]) {
              // console.log('this entered the range of quadril', arr[i], quadrilCm, arr[i + 1])
              setSizeBottom(allSizesNames[sizeIndex])
              setQuadrilDescription(allDescriptions[i + 2])
              setQuadrilColor(allColors[i + 2])
            }
          }
        })
        //then set the other stuff   
        const stepC = Math.floor((size.cintura.max - size.cintura.min) / 4)
        const oneC = Math.floor(size.cintura.min + stepC)
        const twoC = Math.floor(size.cintura.min + stepC + stepC)
        const cinturaRanges = [size.cintura.min, oneC, twoC, size.cintura.max]
        cinturaRanges.forEach((v, i, arr) => {
          if (i !== arr.length) {
            // console.log('testing cintura:', cinturaCm)
            if (cinturaCm < size.cintura.min && cinturaCm > size.cintura.min - 6) {
              // console.log('cintura size should be loose. index now', i)
              setCinturaDescription(allDescriptions[1])
              setCinturaColor(allColors[1])
              return
            }
            if (cinturaCm < size.cintura.min - 6) return eraseStates()

            if (cinturaCm >= arr[i] && cinturaCm <= arr[i + 1]) {
              // console.log('inside a valid range of cintura')
              setCinturaDescription(allDescriptions[i + 2])
              setCinturaColor(allColors[i + 2])
              return
            }
            if (cinturaCm > size.cintura.max && cinturaCm <= size.cintura.max + 6) {
              // console.log('cintura size description should be tight apertado')
              setCinturaDescription(allDescriptions[6])
              setCinturaColor(allColors[6])
              return
            }
            if (cinturaCm > size.cintura.max + 6) return eraseStates()

          }
        })
      }
      if (quadrilCm < cinturaCm) {
        return console.warn('quadriCm<cinturaCM')
      }
    })

  }
  const setVestidoEdit = () => {
    allSizes.forEach((size, sizeIndex, allSizes) => {
      if (quadrilCm >= size.quadril.min && quadrilCm <= size.quadril.max && quadrilCm > cinturaCm) {
        const stepQ = ((size.quadril.max - size.quadril.min) / 4)
        const oneQ = (size.quadril.min + stepQ)
        const twoQ = (size.quadril.min + stepQ + stepQ)
        const quadrilRanges = [size.quadril.min, oneQ, twoQ, size.quadril.max]
        quadrilRanges.forEach((v, i, arr) => {
          if (i !== arr.length) {
            if (quadrilCm >= arr[i] && quadrilCm <= arr[i + 1]) {
              // console.log('this entered the range of quadril', arr[i], quadrilCm, arr[i + 1])
              setSizeWhole(allSizesNames[sizeIndex])
              setQuadrilDescription(allDescriptions[i + 2])
              setQuadrilColor(allColors[i + 2])
            }
          }
        })
        //then set the other stuff   
        const stepC = Math.floor((size.cintura.max - size.cintura.min) / 4)
        const oneC = Math.floor(size.cintura.min + stepC)
        const twoC = Math.floor(size.cintura.min + stepC + stepC)
        const cinturaRanges = [size.cintura.min, oneC, twoC, size.cintura.max]
        cinturaRanges.forEach((v, i, arr) => {
          if (i !== arr.length) {
            // console.log('testing cintura:', cinturaCm)
            if (cinturaCm < size.cintura.min && cinturaCm > size.cintura.min - 6) {
              // console.log('cintura size should be loose. index now', i)
              setCinturaDescription(allDescriptions[1])
              setCinturaColor(allColors[1])
              return
            }
            if (cinturaCm < size.cintura.min - 6) return eraseStates()

            if (cinturaCm >= arr[i] && cinturaCm <= arr[i + 1]) {
              // console.log('inside a valid range of cintura')
              setCinturaDescription(allDescriptions[i + 2])
              setCinturaColor(allColors[i + 2])
              return
            }
            if (cinturaCm > size.cintura.max && cinturaCm <= size.cintura.max + 6) {
              // console.log('cintura size description should be tight apertado')
              setCinturaDescription(allDescriptions[6])
              setCinturaColor(allColors[6])
              return
            }
            if (cinturaCm > size.cintura.max + 6) return eraseStates()

          }
        })
        const stepB = Math.floor((size.busto.max - size.busto.min) / 4)
        const oneB = Math.floor(size.busto.min + stepB)
        const twoB = Math.floor(size.busto.min + stepB + stepB)
        const bustoRanges = [size.busto.min, oneB, twoB, size.busto.max]
        bustoRanges.forEach((v, i, arr) => {
          if (i !== arr.length) {
            // console.log('testing busto:', bustoCm)
            if (bustoCm < size.busto.min && bustoCm > size.busto.min - 6) {
              // console.log('busto size should be loose. index now', i)
              setBustoDescription(allDescriptions[1])
              setBustoColor(allColors[1])
              return
            }
            if (bustoCm < size.busto.min - 6) return eraseStates()

            if (bustoCm >= arr[i] && bustoCm <= arr[i + 1]) {
              // console.log('inside a valid range of busto')
              setBustoDescription(allDescriptions[i + 2])
              setBustoColor(allColors[i + 2])
              return
            }
            if (bustoCm > size.busto.max && bustoCm <= size.busto.max + 6) {
              // console.log('busto size description should be tight apertado')
              setBustoDescription(allDescriptions[6])
              setBustoColor(allColors[6])
              return
            }
            if (bustoCm > size.busto.max + 6) return eraseStates()

          }
        })



      }
      if (quadrilCm < cinturaCm) {
        return console.warn('quadriCm<cinturaCM')
      }
    })



  }



  const checkMeasures = () => {
    const editFunctions = [() => { setCamisaEdit() }, () => { setCalçaEdit() }, () => { setVestidoEdit() }]
    allPossibleCategories.forEach((v, i, arr) => {
      if (categoria === v) {
        return editFunctions[i]()
      }
    })
  }
  useEffect(() => {
    checkMeasures();
  }, [bustoCm, cinturaCm, quadrilCm]);

  const submitFunc = () => {

    if (sizeWhole || sizeTop || sizeBottom && (bustoDescription || cinturaDescription && quadrilDescription)) {
      // console.log("submitting", { sizeTop, sizeWhole, sizeBottom, bustoDescription, cinturaDescription, quadrilDescription, cinturaColor });

      router.push({
        pathname: `/result/resultPage`,
        query: {
          sizeTop: sizeTop,
          sizeBottom: sizeBottom,
          sizeWhole: sizeWhole,
          encodedImgUrl: encodedImgUrl,
          edit: true,
          bustoCm: bustoCm,
          cinturaCm: cinturaCm,
          quadrilCm: quadrilCm,
          bustoDescription: bustoDescription,
          bustoColor: bustoColor,
          cinturaDescription: cinturaDescription,
          cinturaColor: cinturaColor,
          quadrilDescription: quadrilDescription,
          quadrilColor: quadrilColor,
          categoria: categoria
        },
      });
    } else {
      // console.log("we dont have a valid size");
      router.push({
        pathname: "/medidas/NotFound",
        query: { encodedImgUrl: encodedImgUrl, categoria: categoria },
      });
    }
  };

  return (
  <>
  <title>Editar Medidas</title>
 
  <div className={`${roboto.className} flex flex-col bg-white m-0 p-0`}>
    <div className="bg-white flex flex-col rounded-sm justify-between items-center">
      <h1 className="text-black text-center text-3xl mt-4 px-6 z-10">Insira suas medidas exatas para uma experiência ainda mais concreta !</h1>

      <div className="flex flex-col z-0 bg-white">
        <div className="flex">
          <div className="flex flex-col items-center min-w-[35%] max-w-[50%]  ">
            <div className=" flex ">
              <Image  className="object-cover h-[22rem] object-center brightness-110 " width={500} height={500} unoptimized alt={dollImg} src={dollImg} />
            </div>
          <p className="flex max-w-[8rem] min-h-[6rem] mt-2 text-black nowrap">{imgDescription}</p>
          </div>

          <div className="flex justify-center items-center bg-white shadow-xl rounded-lg flex-col m-1  p-2 z-10">
          {categoria!=='Calça'?<div className="inline-block  min-w-[13.5rem] ">
              <label className="text-lg text-black my-3">
                Busto<span className="text-sm text-black ml-3">(cm)</span>
              </label>
              <input
                type="range"
                className="mx-2 max-w-[5rem]"
                min={70}
                max={150}
                onChange={(e) => {setBustoCm(Number(e.target.value)); setDollImg('/busto.png'); setImageDescription(helperDescriptions[0])}}
                onMouseOver={() => {setDollImg("/busto.png"); setImageDescription(helperDescriptions[0])} }
                value={bustoCm}
              />
              <input
                className="text-black pl-1 max-w-[2rem]"
                type="number"
                inputMode="numeric"
                min={70}
                max={170}
                onChange={(e) => setBustoCm(Number(e.target.value))}
                onMouseOver={() => {setDollImg("/busto.png") ; setImageDescription(helperDescriptions[0])}}
                value={bustoCm}
              />
            </div> : null}
            <div className="min-w-[13.5rem]">
              <label className="text-lg text-black my-3">
                Cintura<span className="text-sm text-black"> (cm)</span>
              </label>
              <input
                type="range"
                className=" mx-2 max-w-[5rem]"
                min={50}
                max={160}
                onChange={(e) => {setCinturaCm(Number(e.target.value)); setDollImg("/cintura.png");setImageDescription(helperDescriptions[1])}}
                onMouseOver={() => {setDollImg("/cintura.png"); setImageDescription(helperDescriptions[1])}}
                value={cinturaCm}
              />
              <input
                type="number"
                className="text-black pl-1 max-w-[2rem]"
                inputMode="numeric"
                min={50}
                max={160}
                onChange={(e) => setCinturaCm(Number(e.target.value))}
                onMouseOver={() => {setDollImg("/cintura.png"); setImageDescription(helperDescriptions[1])}}
                value={cinturaCm}
              />
            </div>
            <div className=" min-w-[13.5rem]">
              <label className="text-lg text-black my-3">
                Quadril<span className="text-sm text-black"> (cm)</span>
              </label>
              <input
                type="range"
                className=" mx-2 max-w-[5rem]"
                
                min={70}
                max={151}
                onChange={(e) => {setQuadrilCm(Number(e.target.value)); setDollImg('/quadril.png'); setImageDescription(helperDescriptions[2])}}
                onMouseOver={() => {setDollImg("/quadril.png");setImageDescription(helperDescriptions[2])}}
                value={quadrilCm}
              />
              <input
                type="number"
                inputMode="numeric"
                className="text-black pl-1 max-w-[2rem]"
                min={70}
                max={151}
                onChange={(e) => setQuadrilCm(Number(e.target.value))}
                onMouseOver={() => {setDollImg("/quadril.png");setImageDescription(helperDescriptions[2])}}
                value={quadrilCm}
              />

            </div>
            <div className="flex flex-col justify-center bg-white mx-1 my-3">

              <button
              id="medidas_exatas_submit"
                className=" rounded-lg bg-white text-black py-2 shadow-lg "
                onClick={() => submitFunc()}
              >
                Ver Recomedação
              </button>
              <p className="text-black text-center text-xs mx-5 pt-1">Não sabe suas medidas? A gente te ajuda ! Clicando no botão abaixo voce pode imprimir e usar nossa fita métrica </p>
              <a id="fita_metrica"
                className="rounded-lg bg-black text-white shadow-xl py-2 my-2 text-center"
                href="/files/fita-metrica-eufloria.pdf"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                Fita Metrica
              </a>
              <button id="reiniciar"
                className="rounded-lg bg-white text-black my-2 py-2 shadow-lg "
                onClick={() => {
                  if (encodedImgUrl) {
                    router.push({
                      pathname: `${window.location.origin}/${encodeURIComponent(
                        encodedImgUrl
                      )}`, query: { categoria: categoria }
                    });
                  }
                }}
              >
                Reiniciar
              </button>
            </div>


          </div>
        </div>

      </div>
    </div>

  </div>
  </>
  );
}
