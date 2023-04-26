import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface tamanhosObj {
  sizeTop: string;
  sizeBottom: string;
  sizeWhole: string;
}
interface edit {
  arg0?: number;
}

export default function EditarMedidas() {
  const router = useRouter();

  const editBusto = router.query.editBusto;
  const editCintura = router.query.editCintura;
  const editQuadril = router.query.editQuadril;
  const encodedImgUrl = router.query.encodedImgUrl;

  const [bustoCm, setBustoCm] = useState(editBusto);
  const [cinturaCm, setCinturaCm] = useState(editCintura);
  const [quadrilCm, setQuadrilCm] = useState(editQuadril);
  const [dollImg, setDollImg] = useState("/imgs_lela/chest.jpeg");

  const [sizeTop, setSizeTop] = useState("");
  const [sizeBottom, setSizeBottom] = useState("");
  const [sizeWhole, setSizeWhole] = useState("");

  const checkMeasures = (busto: number, cintura: number, quadril: number) => {
    const tamanhos: tamanhosObj = {
      sizeTop: "",
      sizeBottom: "",
      sizeWhole: "",
    };

    const PP = {
      busto: { min: 75, max: 86 },
      cintura: { min: 65, max: 70 },
      quadril: { min: 92, max: 98 },
    };
    const P = {
      busto: { min: 87, max: 96 },
      cintura: { min: 70, max: 76 },
      quadril: { min: 99, max: 105 },
    };
    const M = {
      busto: { min: 97, max: 102 },
      cintura: { min: 77, max: 81 },
      quadril: { min: 106, max: 111 },
    };
    const G = {
      busto: { min: 103, max: 109 },
      cintura: { min: 82, max: 87 },
      quadril: { min: 112, max: 118 },
    };
    const GG = {
      busto: { min: 110, max: 119 },
      cintura: { min: 88, max: 93 },
      quadril: { min: 119, max: 124 },
    };
    const XG = {
      busto: { min: 120, max: 130 },
      cintura: { min: 94, max: 99 },
      quadril: { min: 125, max: 130 },
    };

    // Find the appropriate size for the 'sizeTop' based on the bust size
    if (busto >= PP.busto.min && busto <= PP.busto.max) {
      tamanhos.sizeTop = "PP";
    } else if (busto >= P.busto.min && busto <= P.busto.max) {
      tamanhos.sizeTop = "P";
    } else if (busto >= M.busto.min && busto <= M.busto.max) {
      tamanhos.sizeTop = "M";
    } else if (busto >= G.busto.min && busto <= G.busto.max) {
      tamanhos.sizeTop = "G";
    } else if (busto >= GG.busto.min && busto <= GG.busto.max) {
      tamanhos.sizeTop = "GG";
    } else if (busto >= XG.busto.min && busto <= XG.busto.max) {
      tamanhos.sizeTop = "XG";
    }

    // Find the appropriate size for the 'sizeBottom' based on the hip size
    if (quadril >= PP.quadril.min && quadril <= PP.quadril.max) {
      tamanhos.sizeBottom = "PP";
    } else if (quadril >= P.quadril.min && quadril <= P.quadril.max) {
      tamanhos.sizeBottom = "P";
    } else if (quadril >= M.quadril.min && quadril <= M.quadril.max) {
      tamanhos.sizeBottom = "M";
    } else if (quadril >= G.quadril.min && quadril <= G.quadril.max) {
      tamanhos.sizeBottom = "G";
    } else if (quadril >= GG.quadril.min && quadril <= GG.quadril.max) {
      tamanhos.sizeBottom = "GG";
    } else if (quadril >= XG.quadril.min && quadril <= XG.quadril.max) {
      tamanhos.sizeBottom = "XG";
    }

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

    if (sizeWhole) {
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
        },
      });
    } else {
      console.log("we dont have a valid sizeWhole");
      router.push({
        pathname: "/medidas/NotFound",
        query: { encodedImgUrl: encodedImgUrl },
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
              onChange={(e) => setBustoCm(e.target.value)}
              onMouseOver={() => setDollImg("/imgs_lela/chest.jpeg")}
              value={bustoCm}
            />
            <input
              className="appearance-none"
              type="number"
              min={70}
              max={170}
              onChange={(e) => setBustoCm(e.target.value)}
              onMouseOver={() => setDollImg("/imgs_lela/chest.jpeg")}
              value={bustoCm}
            />
          </div>

          <div className="flex my-4">
            <input
              type="range"
              min={50}
              max={160}
              onChange={(e) => setCinturaCm(e.target.value)}
              onMouseOver={() => setDollImg("/imgs_lela/waist.jpeg")}
              value={cinturaCm}
            />
            <input
              type="number"
              min={50}
              max={160}
              onChange={(e) => setCinturaCm(e.target.value)}
              onMouseOver={() => setDollImg("/imgs_lela/waist.jpeg")}
              value={cinturaCm}
            />
          </div>

          <div className="my-4 flex">
            <input
              type="range"
              min={70}
              max={151}
              onChange={(e) => setQuadrilCm(e.target.value)}
              onMouseOver={() => setDollImg("/imgs_lela/hip.jpeg")}
              value={quadrilCm}
            />
            <input
              type="number"
              min={70}
              max={151}
              onChange={(e) => setQuadrilCm(e.target.value)}
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
                    encodedImgUrl as string
                  )}`,
                });
              }
            }}
          >
            Reiniciar
          </button>
          <button
            onClick={() => {
              if (bustoCm && cinturaCm && quadrilCm) {
                checkMeasures(+bustoCm, +cinturaCm, +quadrilCm);
              }
            }}
          >
            Console.log
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
