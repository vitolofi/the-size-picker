import { useEffect,useState } from "react";
import { useRouter } from "next/router";

interface tamanhosObj {
  sizeTop: string;
  sizeBottom: string;
  sizeWhole: string;
  bustoDescription: string;
  bustoColor :string;
  cinturaDescription: string;
  cinturaColor: string;
  quadrilDescription: string;
  quadrilColor:string
}
interface edit {
  arg0?: number;
}

export default function EditarMedidas() {
  const router = useRouter();

  const [bustoDescription, setBustoDescription] = useState('')
  const [bustoColor,setBustoColor] = useState('')
  const [cinturaDescription, setCinturaDescription] = useState('')
  const [cinturaColor,setCinturaColor] = useState('')
  const [quadrilDescription, setQuadrilDescription] = useState('')
  const [quadrilColor,setQuadrilColor] = useState('')

  const editBusto = Number(router.query.editBusto);
  const editCintura = Number(router.query.editCintura);
  const editQuadril = Number(router.query.editQuadril);
  const encodedImgUrl = String(router.query.encodedImgUrl);
  const categoria = String(router.query.categoria)

  const [bustoCm, setBustoCm] = useState(editBusto);
  const [cinturaCm, setCinturaCm] = useState(editCintura);
  const [quadrilCm, setQuadrilCm] = useState(editQuadril);
  const [dollImg, setDollImg] = useState("/imgs_lela/chest.jpeg");

  const [sizeTop, setSizeTop] = useState("");
  const [sizeBottom, setSizeBottom] = useState("");
  const [sizeWhole, setSizeWhole] = useState("");

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

  const checkMeasures = (busto: number, cintura: number, quadril: number,) => {
    const tamanhos: tamanhosObj = {
      sizeTop: "",
      sizeBottom: "",
      sizeWhole: "",
      bustoDescription: "",
      bustoColor: "",
      cinturaDescription: "",
      cinturaColor:"",
      quadrilDescription: "",
      quadrilColor: "",
    };

    const PP = {
      busto: { min: 75, med: 80.5, max: 86 },
      cintura: { min: 65, med: 67.5, max: 70 },
      quadril: { min: 92, med: 95, max: 98 },
    };
    const P = {
      busto: { min: 87, med: 91.5, max: 96 },
      cintura: { min: 70, med: 73, max: 76 },
      quadril: { min: 99, med: 102, max: 105 },
    };
    const M = {
      busto: { min: 97, med: 99.5, max: 102 },
      cintura: { min: 77, med: 79, max: 81 },
      quadril: { min: 106, med: 108.5, max: 111 },
    };
    const G = {
      busto: { min: 103, med: 106, max: 109 },
      cintura: { min: 82, med: 84.5, max: 87 },
      quadril: { min: 112, med: 115, max: 118 },
    };
    const GG = {
      busto: { min: 110, med: 114.5, max: 119 },
      cintura: { min: 88, med: 90.5, max: 93 },
      quadril: { min: 119, med: 121.5, max: 124 },
    };
    const XG = {
      busto: { min: 120, med: 125, max: 130 },
      cintura: { min: 94, med: 96.5, max: 99 },
      quadril: { min: 125, med: 127.5, max: 130 },
    };

    // Find the appropriate size for the 'sizeTop' based on the bust size
    if (busto >= PP.busto.min && busto <= PP.busto.max) {
      tamanhos.sizeTop = "PP";
      if (busto > PP.busto.med) {
        tamanhos.bustoDescription = "Levemente justo";
        tamanhos.bustoColor = "stroke-green-500"
      } else{

        tamanhos.bustoDescription = "Levemente Folgado";
        tamanhos.bustoColor = "stroke-yellow-500";
      }
    } else if (busto >= P.busto.min && busto <= P.busto.max) {
      tamanhos.sizeTop = "P";
      if (busto > P.busto.med) {
        tamanhos.bustoDescription = "Levemente justo";
        tamanhos.bustoColor = "stroke-green-500"
      } else{
        tamanhos.bustoDescription = "Levemente Folgado";
        tamanhos.bustoColor = "stroke-yellow-500" 
      }
    } else if (busto >= M.busto.min && busto <= M.busto.max) {
      tamanhos.sizeTop = "M";
      if (busto > M.busto.med) {
        tamanhos.bustoDescription = "Levemente justo";
        tamanhos.bustoColor = "stroke-green-500"
      } else {tamanhos.bustoDescription = "Levemente Folgado";
      tamanhos.bustoColor = "stroke-yellow-500"}
    } else if (busto >= G.busto.min && busto <= G.busto.max) {
      tamanhos.sizeTop = "G";
      if (busto > G.busto.med) {
        tamanhos.bustoDescription = "Levemente justo";
        tamanhos.bustoColor = "stroke-green-500"
      } else {tamanhos.bustoDescription = "Levemente Folgado";
      tamanhos.bustoColor = "stroke-yellow-500"}
    } else if (busto >= GG.busto.min && busto <= GG.busto.max) {
      tamanhos.sizeTop = "GG";
      if (busto > GG.busto.med) {
        tamanhos.bustoDescription = "Levemente justo";
        tamanhos.bustoColor = "stroke-green-500"
      } else {tamanhos.bustoDescription = "Levemente Folgado";
      tamanhos.bustoColor = "stroke-yellow-500"}
    } else if (busto >= XG.busto.min && busto <= XG.busto.max) {
      tamanhos.sizeTop = "XG";
      if (busto > XG.busto.med) {
        tamanhos.bustoDescription = "Levemente justo";
        tamanhos.bustoColor = "stroke-green-500"
      } else {tamanhos.bustoDescription = "Levemente Folgado";
      tamanhos.bustoColor = "stroke-yellow-500"}
    }


    //sizeBottom
    if (quadril >= PP.quadril.min && quadril <= PP.quadril.max) {
      tamanhos.sizeBottom = "PP";
      if (quadril > PP.quadril.med) {
        tamanhos.quadrilDescription = "Levemente justo";
        tamanhos.quadrilColor = "stroke-green-500"
      } else{

        tamanhos.quadrilDescription = "Levemente Folgado";
        tamanhos.quadrilColor = "stroke-yellow-500"
      }
    } else if (quadril >= P.quadril.min && quadril <= P.quadril.max) {
      tamanhos.sizeBottom = "P";
      if (quadril > P.quadril.med) {
        tamanhos.quadrilDescription = "Levemente justo";
        tamanhos.quadrilColor = "stroke-green-500"
      } else{
        tamanhos.quadrilDescription = "Levemente Folgado";
        tamanhos.quadrilColor = "stroke-yellow-500"
      }
    } else if (quadril >= M.quadril.min && quadril <= M.quadril.max) {
      tamanhos.sizeBottom = "M";
      if (quadril > M.quadril.med) {
        tamanhos.quadrilDescription = "Levemente justo";
        tamanhos.quadrilColor = "stroke-green-500"
      } else {

        tamanhos.quadrilDescription = "Levemente Folgado";
        tamanhos.quadrilColor = "stroke-yellow-500"
      } 
    } else if (quadril >= G.quadril.min && quadril <= G.quadril.max) {
      tamanhos.sizeBottom = "G";
      if (quadril > G.quadril.med) {
        tamanhos.quadrilDescription = "Levemente justo";
        tamanhos.quadrilColor = "stroke-green-500"
      } else {

        tamanhos.quadrilDescription = "Levemente Folgado";
        tamanhos.quadrilColor = "stroke-yellow-500"
      } 
    } else if (quadril >= GG.quadril.min && quadril <= GG.quadril.max) {
      tamanhos.sizeBottom = "GG";
      if (quadril > GG.quadril.med) {
        tamanhos.quadrilDescription = "Levemente justo";
        tamanhos.quadrilColor = "stroke-green-500"
      } else{
        tamanhos.quadrilColor = "stroke-yellow-500"
        tamanhos.quadrilDescription = "Levemente Folgado";
      } 
    } else if (quadril >= XG.quadril.min && quadril <= XG.quadril.max) {
      tamanhos.sizeBottom = "XG";
      if (quadril > XG.quadril.med) {
        tamanhos.quadrilDescription = "Levemente justo";
        tamanhos.quadrilColor = "stroke-green-500"
      } else {
      tamanhos.quadrilDescription = "Levemente Folgado";
      tamanhos.quadrilColor = "stroke-yellow-500"
      }
    }

    //cintura sugar stuff
    if (cintura >= PP.cintura.min && cintura <= PP.cintura.max) {
      if (cintura > PP.cintura.med) {
        tamanhos.cinturaDescription = "Levemente justo";
        tamanhos.cinturaColor = "stroke-green-500"
      } else{

        tamanhos.cinturaDescription = "Levemente Folgado";
        tamanhos.cinturaColor = 'stroke-yellow-500'
      } 
    } else if (cintura >= P.cintura.min && cintura <= P.cintura.max) {
      if (cintura > P.cintura.med) {
        tamanhos.cinturaDescription = "Levemente justo";
        tamanhos.cinturaColor = "stroke-green-500"
      } else {
      tamanhos.cinturaDescription = "Levemente Folgado";
      tamanhos.cinturaColor = 'stroke-yellow-500'
      }
    } else if (cintura >= M.cintura.min && cintura <= M.cintura.max) {
      if (cintura > M.cintura.med) {
        tamanhos.cinturaDescription = "Levemente justo";
        tamanhos.cinturaColor = "stroke-green-500"
      } else {

        tamanhos.cinturaColor = 'stroke-yellow-500'
      tamanhos.cinturaDescription = "Levemente Folgado";
    }
      } else if (cintura >= G.cintura.min && cintura <= G.cintura.max) {
      if (cintura > G.cintura.med) {
        tamanhos.cinturaDescription = "Levemente justo";
        tamanhos.cinturaColor = "stroke-green-500"
      } else {tamanhos.cinturaDescription = "Levemente Folgado";
      tamanhos.cinturaColor = 'stroke-yellow-500'}
    } else if (cintura >= GG.cintura.min && cintura <= GG.cintura.max) {
      if (cintura > GG.cintura.med) {
        tamanhos.cinturaDescription = "Levemente justo";
        tamanhos.cinturaColor = "stroke-green-500"
      } else {
        tamanhos.cinturaDescription = "Levemente Folgado";
        tamanhos.cinturaColor = 'stroke-yellow-500'
      }
    } else if (cintura >= XG.cintura.min && cintura <= XG.cintura.max) {
      if (cintura > XG.cintura.med) {
        tamanhos.cinturaDescription = "Levemente justo";
        tamanhos.cinturaColor = "stroke-green-500"
      } else {tamanhos.cinturaDescription = "Levemente Folgado";
      tamanhos.cinturaColor = 'stroke-yellow-500'}
    }

    // Find the appropriate size for the 'sizeBottom' based on the hip size
    // if (quadril >= PP.quadril.min && quadril <= PP.quadril.max) {
    //   tamanhos.sizeBottom = "PP";
    // } else if (quadril >= P.quadril.min && quadril <= P.quadril.max) {
    //   tamanhos.sizeBottom = "P";
    // } else if (quadril >= M.quadril.min && quadril <= M.quadril.max) {
    //   tamanhos.sizeBottom = "M";
    // } else if (quadril >= G.quadril.min && quadril <= G.quadril.max) {
    //   tamanhos.sizeBottom = "G";
    // } else if (quadril >= GG.quadril.min && quadril <= GG.quadril.max) {
    //   tamanhos.sizeBottom = "GG";
    // } else if (quadril >= XG.quadril.min && quadril <= XG.quadril.max) {
    //   tamanhos.sizeBottom = "XG";
    // }

    // Find the appropriate size for the 'sizeWhole' based on the bust and hip sizes
    if (
      busto >= PP.busto.min &&
      busto <= PP.busto.max &&
      quadril >= PP.quadril.min &&
      quadril <= PP.quadril.max
    ) {
      tamanhos.sizeWhole = "PP";
    } else if (
      busto >= P.busto.min &&
      busto <= P.busto.max &&
      quadril >= P.quadril.min &&
      quadril <= P.quadril.max
    ) {
      tamanhos.sizeWhole = "P";
    } else if (
      busto >= M.busto.min &&
      busto <= M.busto.max &&
      quadril >= M.quadril.min &&
      quadril <= M.quadril.max
    ) {
      tamanhos.sizeWhole = "M";
    } else if (
      busto >= G.busto.min &&
      busto <= G.busto.max &&
      quadril >= G.quadril.min &&
      quadril <= G.quadril.max
    ) {
      tamanhos.sizeWhole = "G";
    } else if (
      busto >= GG.busto.min &&
      busto <= GG.busto.max &&
      quadril >= GG.quadril.min &&
      quadril <= GG.quadril.max
    ) {
      tamanhos.sizeWhole = "GG";
    } else if (
      busto >= XG.busto.min &&
      busto <= XG.busto.max &&
      quadril >= XG.quadril.min &&
      quadril <= XG.quadril.max
    ) {
      tamanhos.sizeWhole = "XG";
    }
    // console.warn(tamanhos, "tamanhos inside checkMeasures function", {
    //   bustoCm,
    //   cinturaCm,
    //   quadrilCm,
    // });
    setSizeTop(tamanhos.sizeTop);
    setSizeBottom(tamanhos.sizeBottom);
    setSizeWhole(tamanhos.sizeWhole);
    setBustoDescription(tamanhos.bustoDescription)
    setBustoColor(tamanhos.bustoColor)
    setCinturaDescription(tamanhos.cinturaDescription)
    setCinturaColor(tamanhos.cinturaColor)
    setQuadrilDescription(tamanhos.quadrilDescription)
    setQuadrilColor(tamanhos.quadrilColor)
    if (!tamanhos.sizeWhole) {
      setSizeWhole(tamanhos.sizeBottom);
    }
  };
  useEffect(() => {
    if (bustoCm && cinturaCm && quadrilCm)
      checkMeasures(+bustoCm, +cinturaCm, +quadrilCm);
  }, [bustoCm, cinturaCm, quadrilCm]);

  const submitFunc = () => {
    // checkMeasures(bustoCm,cinturaCm,quadrilCm)

    if (sizeWhole && sizeTop && sizeBottom && bustoDescription && cinturaDescription && quadrilDescription ) {
      console.log("we had a valid sizeWhole");

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
          bustoDescription:bustoDescription,
          bustoColor: bustoColor , 
          cinturaDescription:cinturaDescription,
          cinturaColor: cinturaColor, 
          quadrilDescription:quadrilDescription,
          quadrilColor: quadrilColor,
          categoria:categoria
        },
      });
    } else {
      console.log("we dont have a valid sizeWhole");
      router.push({
        pathname: "/medidas/NotFound",
        query: { encodedImgUrl: encodedImgUrl, categoria:categoria },
      });
    }
  };

  return (
    <div className="flex flex-col p-4 m-2 rounded-sm justify-between items-center max-w-lg">
      <h1>Minhas Medidas</h1>
      <p>Insira os valores exatos</p>
      <div className="flex py-10">
        <div className="mr-1">
          <img alt={dollImg} src={dollImg} />
        </div>
        <div className="flex flex-col ml-2">
          <label className="text-lg">
            Busto<span className="text-sm"> (cm)</span>
          </label>

          <label className="text-lg">
            Cintura<span className="text-sm"> (cm)</span>
          </label>
          <label className="text-lg">
            Quadril<span className="text-sm"> (cm)</span>
          </label>
        </div>
        <div className=" flex pl-3 flex-col">
          <div className="flex my-4">
            <input
              type="range"
              min={70}
              max={150}
              onChange={(e) => setBustoCm(Number(e.target.value))}
              onMouseOver={() => setDollImg("/imgs_lela/chest.jpeg")}
              value={bustoCm}
            />
            <input
              className="appearance-none"
              type="number"
              min={70}
              max={170}
              onChange={(e) => setBustoCm(Number(e.target.value))}
              onMouseOver={() => setDollImg("/imgs_lela/chest.jpeg")}
              value={bustoCm}
            />
          </div>

          <div className="flex my-4">
            <input
              type="range"
              min={50}
              max={160}
              onChange={(e) => setCinturaCm(Number(e.target.value))}
              onMouseOver={() => setDollImg("/imgs_lela/waist.jpeg")}
              value={cinturaCm}
            />
            <input
              type="number"
              min={50}
              max={160}
              onChange={(e) => setCinturaCm(Number(e.target.value))}
              onMouseOver={() => setDollImg("/imgs_lela/waist.jpeg")}
              value={cinturaCm}
            />
          </div>

          <div className="my-4 flex">
            <input
              type="range"
              min={70}
              max={151}
              onChange={(e) => setQuadrilCm(Number(e.target.value))}
              onMouseOver={() => setDollImg("/imgs_lela/hip.jpeg")}
              value={quadrilCm}
            />
            <input
              type="number"
              min={70}
              max={151}
              onChange={(e) => setQuadrilCm(Number(e.target.value))}
              onMouseOver={() => setDollImg("/imgs_lela/hip.jpeg")}
              value={quadrilCm}
            />
          </div>

          <div className="flex mt-2 flex-col">
            <button
              className="my-2 rounded-lg bg-gray-50 py-2 shadow-lg "
              onClick={() => submitFunc()}
            >
              Ver Recomedação
            </button>
            <button
              className="my-2 rounded-lg bg-gray-50 py-2 shadow-lg "
              onClick={() => {
                if (encodedImgUrl) {
                  router.push({
                    pathname: `${window.location.origin}/${encodeURIComponent(
                      encodedImgUrl
                    )}`, query:{categoria:categoria}
                  });
                }
              }}
            >
              Reiniciar
            </button>
            <a
              className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 text-center"
              href="/files/fita-metrica-eufloria.pdf"
              target={"_blank"}
              rel="noopener noreferrer"
            >
              Fita Metrica
            </a>
            {/* <button
            onClick={() => {
              if (bustoCm && cinturaCm && quadrilCm) {
                checkMeasures(+bustoCm, +cinturaCm, +quadrilCm);
              }
            }}
          >
            Console.log
          </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
