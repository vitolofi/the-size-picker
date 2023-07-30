import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import SugarBustoSVG from "../../components/sugar/SugarBusto";
import SugarCinturaSVG from "../../components/sugar/SugarCintura";
import SugarQuadrilSVG from "../../components/sugar/SugarQuadril";
import ChangeSizeButtons from "../../components/ChangeSizeButtons";
import { roboto } from "..";
import { useSettings, Sizes, SizeInfo, SizeRange } from "@/components/Context/SettingsProvider";
import PopUp from "@/components/PopUp/Popup";

export default function ResultPage() {
  const router = useRouter();

  const encodedImgUrl = String(router.query.encodedImgUrl);
  const categoria = String(router.query.categoria);
  const edit = router.query.edit;
  const doll = router.query.doll;

  const [sizeTop, setSizeTop] = useState<string>("");
  const [sizeBottom, setSizeBottom] = useState<string>("");
  const [sizeWhole, setSizeWhole] = useState<string>("");

  const [preferedSize, setPreferedSize] = useState<string>("");

  const [bustoDescription, setBustoDescription] = useState<string>("");
  const [bustoColor, setBustoColor] = useState<string>("");
  const [editBusto, setEditBusto] = useState<string | number>("");
  const [cinturaDescription, setCinturaDescription] = useState<string>("");
  const [editCintura, setEditCintura] = useState<string | number>("");
  const [cinturaColor, setCinturaColor] = useState<string>("");
  const [quadrilDescription, setQuadrilDescription] = useState<string>("");
  const [editQuadril, setEditQuadril] = useState<string | number>("");
  const [quadrilColor, setQuadrilColor] = useState<string>("");

  const [popUpToggle,setPopUpToggle] = useState('')


  const [factoryResultState, setFactoryResultState] = useState<any>();

  const imc = Number(router.query.imc);
  const bustoDoll = Number(router.query.busto);
  const cinturaDoll = Number(router.query.cintura);
  const quadrilDoll = Number(router.query.quadril);




  const [settings] = useSettings()
  const {allColors,allDescriptions,allPossibleCategories,allSizesNames, imcRanges} = settings
  const allSizes:SizeInfo[] = [settings.allSizes.PP,settings.allSizes.P,settings.allSizes.M,settings.allSizes.G,settings.allSizes.GG,settings.allSizes.XG]

  const resultNameCategorias = ["sizeTop", "sizeBottom", "sizeWhole"];
  const sizes = [sizeTop, sizeBottom, sizeWhole];
  const functionsDollObj = [
    (imc: number, busto: number, cintura: number, quadril: number) =>
      chooseBestCamisaDoll(imc, busto, cintura, quadril),
    (imc: number, busto: number, cintura: number, quadril: number) =>
      chooseBestCalçaDoll(imc, busto, cintura, quadril),
    (imc: number, busto: number, cintura: number, quadril: number) =>
      chooseBestVestidoDoll(imc, busto, cintura, quadril),
  ];


  const factoryInfo = {
    sizeTop,
    sizeBottom,
    sizeWhole,
    editBusto,
    editCintura,
    editQuadril,
    bustoDescription: allDescriptions.indexOf(bustoDescription),
    bustoColor: allDescriptions.indexOf(bustoDescription),
    cinturaDescription: allDescriptions.indexOf(cinturaDescription),
    cinturaColor: allDescriptions.indexOf(cinturaDescription),
    quadrilDescription: allDescriptions.indexOf(quadrilDescription),
    quadrilColor: allDescriptions.indexOf(quadrilDescription),
  };
  const imcCheck = (imc: number) => {
    if (imc < 14 || imc > 35.5) {
      router.push({
        pathname: "/medidas/NotFound",
        query: { encodedImgUrl: encodedImgUrl },
      });
      //go to the Nao encontramos seu tamanho por favor -> Editar Medidas
    }
  };
  //doll
  const chooseBestCamisaDoll = (
    imc: number,
    busto: number,
    cintura: number,
    quadril: number
  ) => {
    imcCheck(imc);
    // console.log('inside chooseBestCamisa')
    const setSizePlusOne = (
      sizePlusOne: string,
      apxBusto: number,
      apxCintura: number,
      apxQuadril: number
    ) => {
      setBustoDescription(allDescriptions[busto - 2]);
      setBustoColor(allColors[busto - 2]);
      setEditBusto(apxBusto);
      setCinturaDescription(allDescriptions[cintura]);
      setCinturaColor(allColors[cintura]);
      setEditCintura(apxCintura);
      setQuadrilDescription(allDescriptions[quadril]);
      setQuadrilColor(allColors[quadril]);
      setEditQuadril(apxQuadril);
      setSizeTop(sizePlusOne);
      return;
    };
    const setSizeMinusOne = (
      sizeMinusOne: string,
      apxBusto: number,
      apxCintura: number,
      apxQuadril: number
    ) => {
      // console.warn('trying to set sizeMinus One')
      setBustoDescription(allDescriptions[busto + 5]);
      setBustoColor(allColors[busto + 5]);
      setEditBusto(apxBusto);
      setCinturaDescription(allDescriptions[cintura + 2]);
      setCinturaColor(allColors[cintura + 2]);
      setEditCintura(apxCintura);
      setQuadrilDescription(allDescriptions[quadril + 2]);
      setQuadrilColor(allColors[quadril + 2]);
      setEditQuadril(apxQuadril);
      setSizeTop(sizeMinusOne);
      return;
    };

    imcRanges.forEach((v, i, imcRanges) => {
      if (i === imcRanges.length && i === imcRanges.length - 1) return;
      //PP
      if (i === 0 && imc > imcRanges[i] && imc < imcRanges[i + 1]) {
        // console.log('your size is PP')
        const bustos = [
          allSizes[i].busto.min,
          allSizes[i].busto.min + 1,
          allSizes[i].busto.med + 1,
          allSizes[i].busto.max,
          allSizes[i + 1].busto.min,
        ];
        const quadris = [
          allSizes[i].quadril.min,
          allSizes[i].quadril.min + 1,
          allSizes[i].quadril.med + 1,
          allSizes[i].quadril.max,
          allSizes[i + 1].quadril.min,
        ];
        const cinturas = [
          allSizes[i].cintura.min,
          allSizes[i].cintura.min + 1,
          allSizes[i].cintura.med + 1,
          allSizes[i].cintura.max,
          allSizes[i + 1].cintura.min,
        ];

        const blockValue = i;
        const defaultSize = allSizesNames[blockValue];
        const sizePlusOne = allSizesNames[blockValue + 1];
        //  console.warn('is 0?')
        //  console.warn(busto, typeof busto,' busto log warn')

        if (busto >= 0 && busto < 4) {
          setBustoDescription(allDescriptions[busto + 1]);
          setBustoColor(allColors[busto + 1]);
          setSizeTop(defaultSize);
          setEditBusto(bustos[blockValue + busto]);
        }

        if (busto == 4) {
          return setSizePlusOne(
            sizePlusOne,
            bustos[blockValue + busto],
            cinturas[blockValue + cintura],
            quadris[blockValue + quadril]
          );
        }

        setCinturaDescription(allDescriptions[cintura + 1]);
        setCinturaColor(allColors[cintura + 1]);
        setEditCintura(cinturas[cintura]);
        setQuadrilDescription(allDescriptions[quadril + 1]);
        setQuadrilColor(allColors[quadril + 1]);
        setEditQuadril(quadris[quadril]);
        return;
      }
      //XG
      if (
        i === imcRanges.length - 2 &&
        imc > imcRanges[i] &&
        imc < imcRanges[i + 1]
      ) {
        const blockValue = i;
        const defaultSize = allSizesNames[blockValue];
        const sizeMinusOne = allSizesNames[blockValue - 1];
        const bustos = [
          allSizes[blockValue - 1].busto.max,
          allSizes[blockValue].busto.min,
          allSizes[blockValue].busto.med - 1,
          allSizes[blockValue].busto.med + 1,
          allSizes[blockValue].busto.max,
        ];
        const cinturas = [
          allSizes[blockValue - 1].cintura.max,
          allSizes[blockValue].cintura.min,
          allSizes[blockValue].cintura.med - 1,
          allSizes[blockValue].cintura.med + 1,
          allSizes[blockValue].cintura.max,
        ];
        const quadris = [
          allSizes[blockValue - 1].quadril.max,
          allSizes[blockValue].quadril.min,
          allSizes[blockValue].quadril.med - 1,
          allSizes[blockValue].quadril.med + 1,
          allSizes[blockValue].quadril.max,
        ];
        if (busto == 0) {
          return setSizeMinusOne(
            sizeMinusOne,
            bustos[busto],
            cinturas[cintura],
            quadris[quadril]
          );
        }
        if (busto >= 1 && busto <= 4) {
          setBustoDescription(allDescriptions[busto + 1]);
          setBustoColor(allColors[busto + 1]);
          setSizeTop(defaultSize);
          setEditBusto(bustos[busto]);
        }

        setCinturaDescription(allDescriptions[cintura + 1]);
        setCinturaColor(allColors[cintura + 1]);
        setEditCintura(cinturas[cintura]);
        setQuadrilDescription(allDescriptions[quadril + 1]);
        setQuadrilColor(allColors[quadril + 1]);
        setEditQuadril(quadris[quadril]);
      }
      //P ao GG
      if (i !== imcRanges.length - 1 && i !== imcRanges.length - 2 && i !== 0) {
        //P ao GG
        if (imc > imcRanges[i] && imc < imcRanges[i + 1]) {
          const blockValue = i;
          const defaultSize = allSizesNames[blockValue];
          const sizePlusOne = allSizesNames[blockValue + 1];
          const sizeMinusOne = allSizesNames[blockValue - 1];
          const bustos = [
            allSizes[blockValue - 1].busto.max,
            allSizes[blockValue].busto.min,
            allSizes[blockValue].busto.med,
            allSizes[blockValue].busto.max,
            allSizes[blockValue + 1].busto.min,
          ];
          const cinturas = [
            allSizes[blockValue - 1].cintura.max,
            allSizes[blockValue].cintura.min,
            allSizes[blockValue].cintura.med,
            allSizes[blockValue].cintura.max,
            allSizes[blockValue + 1].cintura.min,
          ];
          const quadris = [
            allSizes[blockValue - 1].quadril.max,
            allSizes[blockValue].quadril.min,
            allSizes[blockValue].quadril.med,
            allSizes[blockValue].quadril.max,
            allSizes[blockValue + 1].quadril.min,
          ];
          if (busto == 0) {
            return setSizeMinusOne(
              sizeMinusOne,
              bustos[busto],
              cinturas[cintura],
              quadris[quadril]
            );
          }
          if (busto >= 1 && busto <= 3) {
            //levemente folgado
            setBustoDescription(allDescriptions[busto + 1]);
            setBustoColor(allColors[busto + 1]);
            setSizeTop(defaultSize);
            setEditBusto(bustos[busto]);
          }
          if (busto == 4) {
            return setSizePlusOne(
              sizePlusOne,
              bustos[busto],
              cinturas[cintura],
              quadris[quadril]
            );
          }

          setCinturaDescription(allDescriptions[cintura + 1]);
          setCinturaColor(allColors[cintura + 1]);
          setEditCintura(cinturas[cintura]);
          setQuadrilDescription(allDescriptions[quadril + 1]);
          setQuadrilColor(allColors[quadril + 1]);
          setEditQuadril(quadris[quadril]);
          return;
        }
      }
    });
  };
  const chooseBestCalçaDoll = (
    imc: number,
    busto: number,
    cintura: number,
    quadril: number
  ) => {
    console.warn("inside chooseBestCalça");
    imcCheck(imc);
    const setSizePlusOne = (
      sizePlusOne: string,
      apxBusto: number,
      apxCintura: number,
      apxQuadril: number
    ) => {
      setBustoDescription(allDescriptions[busto - 2]);
      setBustoColor(allColors[busto - 2]);
      setEditBusto(apxBusto);
      setCinturaDescription(allDescriptions[cintura]);
      setCinturaColor(allColors[cintura]);
      setEditCintura(apxCintura);
      setQuadrilDescription(allDescriptions[quadril]);
      setQuadrilColor(allColors[quadril]);
      setEditQuadril(apxQuadril);
      setSizeBottom(sizePlusOne);
    };
    const setSizeMinusOne = (
      sizeMinusOne: string,
      apxBusto: number,
      apxCintura: number,
      apxQuadril: number
    ) => {
      setBustoDescription(allDescriptions[busto + 5]);
      setBustoColor(allColors[busto + 5]);
      setEditBusto(apxBusto);
      setCinturaDescription(allDescriptions[cintura]);
      setCinturaColor(allColors[cintura]);
      setEditCintura(apxCintura);
      setQuadrilDescription(allDescriptions[quadril]);
      setQuadrilColor(allColors[quadril]);
      setEditQuadril(apxQuadril);
      setSizeBottom(sizeMinusOne);
    };

    imcRanges.forEach((v, i, arr) => {
      if (i === imcRanges.length && i === imcRanges.length - 1) return;
      //PP
      if (i === 0 && imc > imcRanges[i] && imc < imcRanges[i + 1]) {
        //    console.log('your size is PP')
        const bustos = [
          allSizes[i].busto.min,
          allSizes[i].busto.min + 1,
          allSizes[i].busto.med + 1,
          allSizes[i].busto.max,
          allSizes[i + 1].busto.min,
        ];
        const quadris = [
          allSizes[i].quadril.min,
          allSizes[i].quadril.min + 1,
          allSizes[i].quadril.med + 1,
          allSizes[i].quadril.max,
          allSizes[i + 1].quadril.min,
        ];
        const cinturas = [
          allSizes[i].cintura.min,
          allSizes[i].cintura.min + 1,
          allSizes[i].cintura.med + 1,
          allSizes[i].cintura.max,
          allSizes[i + 1].cintura.min,
        ];

        const blockValue = i;
        const defaultSize = allSizesNames[blockValue];
        const sizePlusOne = allSizesNames[blockValue + 1];
        console.warn("is 0?");
        console.warn(busto, typeof busto, " busto log warn");

        if (quadril >= 0 && quadril < 4) {
          setQuadrilDescription(allDescriptions[quadril + 1]);
          setQuadrilColor(allColors[quadril + 1]);
          setSizeBottom(defaultSize);
          setEditQuadril(quadris[blockValue + quadril]);
        }

        if (quadril == 4) {
          return setSizePlusOne(
            sizePlusOne,
            bustos[blockValue + busto],
            cinturas[blockValue + cintura],
            quadris[blockValue + quadril]
          );
        }

        setCinturaDescription(allDescriptions[cintura + 1]);
        setCinturaColor(allColors[cintura + 1]);
        setEditCintura(cinturas[cintura]);
        setBustoDescription(allDescriptions[busto + 1]);
        setBustoColor(allColors[busto + 1]);
        setEditBusto(bustos[busto]);
      }
      //XG
      if (
        i === imcRanges.length - 2 &&
        imc > imcRanges[i] &&
        imc < imcRanges[i + 1]
      ) {
        const blockValue = i;
        const defaultSize = allSizesNames[blockValue];
        const sizeMinusOne = allSizesNames[blockValue - 1];
        const bustos = [
          allSizes[blockValue - 1].busto.max,
          allSizes[blockValue].busto.min,
          allSizes[blockValue].busto.med - 1,
          allSizes[blockValue].busto.med + 1,
          allSizes[blockValue].busto.max,
        ];
        const cinturas = [
          allSizes[blockValue - 1].cintura.max,
          allSizes[blockValue].cintura.min,
          allSizes[blockValue].cintura.med - 1,
          allSizes[blockValue].cintura.med + 1,
          allSizes[blockValue].cintura.max,
        ];
        const quadris = [
          allSizes[blockValue - 1].quadril.max,
          allSizes[blockValue].quadril.min,
          allSizes[blockValue].quadril.med - 1,
          allSizes[blockValue].quadril.med + 1,
          allSizes[blockValue].quadril.max,
        ];
        if (quadril == 0) {
          return setSizeMinusOne(
            sizeMinusOne,
            bustos[busto],
            cinturas[cintura],
            quadris[quadril]
          );
        }
        if (quadril >= 1 && quadril <= 4) {
          //levemente folgado
          setQuadrilDescription(allDescriptions[quadril + 1]);
          setQuadrilColor(allColors[quadril + 1]);
          setSizeBottom(defaultSize);
          setEditQuadril(quadris[quadril]);
        }

        setCinturaDescription(allDescriptions[cintura + 1]);
        setCinturaColor(allColors[cintura + 1]);
        setEditCintura(cinturas[cintura]);
        setBustoDescription(allDescriptions[busto + 1]);
        setBustoColor(allColors[busto + 1]);
        setEditBusto(quadris[busto]);
      }
      //P ao GG
      if (i !== imcRanges.length - 1 && i !== imcRanges.length - 2 && i !== 0) {
        if (imc > arr[i] && imc < arr[i + 1]) {
          const blockValue = i;
          const defaultSize = allSizesNames[blockValue];
          const sizePlusOne = allSizesNames[blockValue + 1];
          const sizeMinusOne = allSizesNames[blockValue - 1];
          const bustos = [
            allSizes[blockValue - 1].busto.max,
            allSizes[blockValue].busto.min,
            allSizes[blockValue].busto.med,
            allSizes[blockValue].busto.max,
            allSizes[blockValue + 1].busto.min,
          ];
          const cinturas = [
            allSizes[blockValue - 1].cintura.max,
            allSizes[blockValue].cintura.min,
            allSizes[blockValue].cintura.med,
            allSizes[blockValue].cintura.max,
            allSizes[blockValue + 1].cintura.min,
          ];
          const quadris = [
            allSizes[blockValue - 1].quadril.max,
            allSizes[blockValue].quadril.min,
            allSizes[blockValue].quadril.med,
            allSizes[blockValue].quadril.max,
            allSizes[blockValue + 1].quadril.min,
          ];
          if (quadril == 0) {
            return setSizeMinusOne(
              sizeMinusOne,
              bustos[busto],
              cinturas[cintura],
              quadris[quadril]
            );
          }
          if (quadril >= 1 && quadril <= 3) {
            //levemente folgado
            setQuadrilDescription(allDescriptions[quadril + 1]);
            setQuadrilColor(allColors[quadril + 1]);
            setSizeBottom(defaultSize);
            setEditQuadril(quadris[quadril]);
          }
          if (quadril == 4) {
            return setSizePlusOne(
              sizePlusOne,
              bustos[busto],
              cinturas[cintura],
              quadris[quadril]
            );
          }

          setCinturaDescription(allDescriptions[cintura + 1]);
          setCinturaColor(allColors[cintura + 1]);
          setEditCintura(cinturas[cintura]);
          setBustoDescription(allDescriptions[quadril + 1]);
          setBustoColor(allColors[quadril + 1]);
          setEditBusto(bustos[busto]);
        }
      }
    });
  };
  const chooseBestVestidoDoll = (
    imc: number,
    busto: number,
    cintura: number,
    quadril: number
  ) => {
    imcCheck(imc);
    const setSizePlusOne = (
      sizePlusOne: string,
      apxBusto: number,
      apxCintura: number,
      apxQuadril: number
    ) => {
      setBustoDescription(allDescriptions[busto - 2]);
      setBustoColor(allColors[busto - 2]);
      setEditBusto(apxBusto);
      setCinturaDescription(allDescriptions[cintura]);
      setCinturaColor(allColors[cintura]);
      setEditCintura(apxCintura);
      setQuadrilDescription(allDescriptions[quadril]);
      setQuadrilColor(allColors[quadril]);
      setEditQuadril(apxQuadril);
      setSizeBottom(sizePlusOne);
    };
    const setSizeMinusOne = (
      sizeMinusOne: string,
      apxBusto: number,
      apxCintura: number,
      apxQuadril: number
    ) => {
      setBustoDescription(allDescriptions[busto + 5]);
      setBustoColor(allColors[busto + 5]);
      setEditBusto(apxBusto);
      setCinturaDescription(allDescriptions[cintura]);
      setCinturaColor(allColors[cintura]);
      setEditCintura(apxCintura);
      setQuadrilDescription(allDescriptions[quadril]);
      setQuadrilColor(allColors[quadril]);
      setEditQuadril(apxQuadril);
      setSizeBottom(sizeMinusOne);
    };

    imcRanges.forEach((v, i, arr) => {
      if (i === imcRanges.length && i === imcRanges.length - 1) return;
      //PP
      if (i === 0 && imc > imcRanges[i] && imc < imcRanges[i + 1]) {
        //    console.log('your size is PP')
        const bustos = [
          allSizes[i].busto.min,
          allSizes[i].busto.min + 1,
          allSizes[i].busto.med + 1,
          allSizes[i].busto.max,
          allSizes[i + 1].busto.min,
        ];
        const quadris = [
          allSizes[i].quadril.min,
          allSizes[i].quadril.min + 1,
          allSizes[i].quadril.med + 1,
          allSizes[i].quadril.max,
          allSizes[i + 1].quadril.min,
        ];
        const cinturas = [
          allSizes[i].cintura.min,
          allSizes[i].cintura.min + 1,
          allSizes[i].cintura.med + 1,
          allSizes[i].cintura.max,
          allSizes[i + 1].cintura.min,
        ];

        const blockValue = i;
        const defaultSize = allSizesNames[blockValue];
        const sizePlusOne = allSizesNames[blockValue + 1];
        console.warn("is 0?");
        console.warn(busto, typeof busto, " busto log warn");

        if (quadril >= 0 && quadril < 4) {
          setQuadrilDescription(allDescriptions[quadril + 1]);
          setQuadrilColor(allColors[quadril + 1]);
          setSizeWhole(defaultSize);
          setEditQuadril(quadris[blockValue + quadril]);
        }

        if (quadril == 4) {
          return setSizePlusOne(
            sizePlusOne,
            bustos[blockValue + busto],
            cinturas[blockValue + cintura],
            quadris[blockValue + quadril]
          );
        }

        setCinturaDescription(allDescriptions[cintura + 1]);
        setCinturaColor(allColors[cintura + 1]);
        setEditCintura(cinturas[cintura]);
        setBustoDescription(allDescriptions[busto + 1]);
        setBustoColor(allColors[busto + 1]);
        setEditBusto(bustos[busto]);
      }
      //XG
      if (
        i === imcRanges.length - 2 &&
        imc > imcRanges[i] &&
        imc < imcRanges[i + 1]
      ) {
        const blockValue = i;
        const defaultSize = allSizesNames[blockValue];
        const sizeMinusOne = allSizesNames[blockValue - 1];
        const bustos = [
          allSizes[blockValue - 1].busto.max,
          allSizes[blockValue].busto.min,
          allSizes[blockValue].busto.med - 1,
          allSizes[blockValue].busto.med + 1,
          allSizes[blockValue].busto.max,
        ];
        const cinturas = [
          allSizes[blockValue - 1].cintura.max,
          allSizes[blockValue].cintura.min,
          allSizes[blockValue].cintura.med - 1,
          allSizes[blockValue].cintura.med + 1,
          allSizes[blockValue].cintura.max,
        ];
        const quadris = [
          allSizes[blockValue - 1].quadril.max,
          allSizes[blockValue].quadril.min,
          allSizes[blockValue].quadril.med - 1,
          allSizes[blockValue].quadril.med + 1,
          allSizes[blockValue].quadril.max,
        ];
        if (quadril == 0) {
          return setSizeMinusOne(
            sizeMinusOne,
            bustos[busto],
            cinturas[cintura],
            quadris[quadril]
          );
        }
        if (quadril >= 1 && quadril <= 4) {
          //levemente folgado
          setQuadrilDescription(allDescriptions[quadril + 1]);
          setQuadrilColor(allColors[quadril + 1]);
          setSizeWhole(defaultSize);
          setEditQuadril(quadris[quadril]);
        }

        setCinturaDescription(allDescriptions[cintura + 1]);
        setCinturaColor(allColors[cintura + 1]);
        setEditCintura(cinturas[cintura]);
        setBustoDescription(allDescriptions[busto + 1]);
        setBustoColor(allColors[busto + 1]);
        setEditBusto(quadris[busto]);
      }
      //P ao GG
      if (i !== imcRanges.length - 1 && i !== imcRanges.length - 2 && i !== 0) {
        if (imc > arr[i] && imc < arr[i + 1]) {
          const blockValue = i;
          const defaultSize = allSizesNames[blockValue];
          const sizePlusOne = allSizesNames[blockValue + 1];
          const sizeMinusOne = allSizesNames[blockValue - 1];
          const bustos = [
            allSizes[blockValue - 1].busto.max,
            allSizes[blockValue].busto.min,
            allSizes[blockValue].busto.med,
            allSizes[blockValue].busto.max,
            allSizes[blockValue + 1].busto.min,
          ];
          const cinturas = [
            allSizes[blockValue - 1].cintura.max,
            allSizes[blockValue].cintura.min,
            allSizes[blockValue].cintura.med,
            allSizes[blockValue].cintura.max,
            allSizes[blockValue + 1].cintura.min,
          ];
          const quadris = [
            allSizes[blockValue - 1].quadril.max,
            allSizes[blockValue].quadril.min,
            allSizes[blockValue].quadril.med,
            allSizes[blockValue].quadril.max,
            allSizes[blockValue + 1].quadril.min,
          ];
          if (quadril == 0) {
            return setSizeMinusOne(
              sizeMinusOne,
              bustos[busto],
              cinturas[cintura],
              quadris[quadril]
            );
          }
          if (quadril >= 1 && quadril <= 3) {
            //levemente folgado
            setQuadrilDescription(allDescriptions[quadril + 1]);
            setQuadrilColor(allColors[quadril + 1]);
            setSizeWhole(defaultSize);
            setEditQuadril(quadris[quadril]);
          }
          if (quadril == 4) {
            return setSizePlusOne(
              sizePlusOne,
              bustos[busto],
              cinturas[cintura],
              quadris[quadril]
            );
          }

          setCinturaDescription(allDescriptions[cintura + 1]);
          setCinturaColor(allColors[cintura + 1]);
          setEditCintura(cinturas[cintura]);
          setBustoDescription(allDescriptions[quadril + 1]);
          setBustoColor(allColors[quadril + 1]);
          setEditBusto(bustos[busto]);
        }
      }
    });
  };
  //doll

  const fromEditSetter = (
    sizeTop: string,
    sizeBottom: string,
    sizeWhole: string,
    bustoCm: number,
    cinturaCm: number,
    quadrilCm: number,
    bustoDescription: string,
    bustoColor: string,
    cinturaDescription: string,
    cinturaColor: string,
    quadrilDescription: string,
    quadrilColor: string
  ) => {
    // console.log("edit setter starts");
    setSizeTop(sizeTop);
    setSizeBottom(sizeBottom);
    setSizeWhole(sizeWhole);

    // console.log('router query inside the setter', router.query)

    setEditBusto(bustoCm);
    setEditCintura(cinturaCm);
    setEditQuadril(quadrilCm);

    setBustoDescription(bustoDescription);
    setBustoColor(bustoColor);
    setCinturaDescription(cinturaDescription);
    setCinturaColor(cinturaColor);
    setQuadrilDescription(quadrilDescription);
    setQuadrilColor(quadrilColor);
  };

  const resultMasterReturn = (categoria: string, doll: any, edit: any) => {
    if ((categoria && doll) || edit) {
      // console.log('router loads', doll,'dollvalue', )
      if (doll) {
        // console.log('doll is true')
        allPossibleCategories.map((v, i, arr) => {
          if (categoria === v) {
            // console.log(categoria,'categoria is equal' ,v )
            functionsDollObj[i](imc, bustoDoll, cinturaDoll, quadrilDoll);
          }
        });
      }
      if (edit) {
        fromEditSetter(
          String(router.query.sizeTop),
          String(router.query.sizeBottom),
          String(router.query.sizeWhole),
          Number(router.query.bustoCm),
          Number(router.query.cinturaCm),
          Number(router.query.quadrilCm),
          String(router.query.bustoDescription),
          String(router.query.bustoColor),
          String(router.query.cinturaDescription),
          String(router.query.cinturaColor),
          String(router.query.quadrilDescription),
          String(router.query.quadrilColor)
        );
      }
    } else return null;
  };

  useEffect(() => {
    resultMasterReturn(categoria, doll, edit);
  }, []);

  const factory = () => {
    if (sizeTop || sizeBottom || sizeWhole) {
      const factoryResult: any[] = [];
      allSizesNames.forEach((v, i, arr) => [(factoryResult[i] = {})]);

      let originalSize = "";
      allPossibleCategories.forEach((v, i, arr) => {
        if (categoria === v) {
          originalSize = sizes[i];
          // console.log(allSizesNames.indexOf(sizes[i]), 'indexofsizes[i')
          // const a =  Object.values(factoryInfo)
          factoryResult[allSizesNames.indexOf(sizes[i])] = factoryInfo;
        }
      });
      // console.log(factoryResult,'this is factory restul')
      //ate aqui conseguimos passar pro index correto a opção inicialmente fabricada

      factoryResult.forEach((v, i, arr) => {
        if (i !== allSizesNames.indexOf(originalSize)) {
          const baseSize = Object.assign(
            {},
            factoryResult[allSizesNames.indexOf(originalSize)]
          );

          // console.log('this is baseSize', baseSize)

          const sizeDifference = i - allSizesNames.indexOf(originalSize);
          // console.log('this is the size difference?', sizeDifference)

          baseSize.bustoDescription =
            baseSize.bustoDescription - sizeDifference * 2;
          baseSize.cinturaDescription =
            baseSize.cinturaDescription - sizeDifference * 2;
          baseSize.quadrilDescription =
            baseSize.quadrilDescription - sizeDifference * 2;
          allPossibleCategories.forEach((v, index, arr) => {
            if (categoria === v) {
              baseSize[resultNameCategorias[index]] = allSizesNames[i];
            }
          });

          for (const key in baseSize) {
            if (baseSize.hasOwnProperty(key)) {
              //   console.log(`${key}: ${baseSize[key]}`);
              if (baseSize[key] && baseSize[key] >= 7 && baseSize[key] < 16) {
                baseSize[key] = 6;
              }
              if (baseSize[key] && baseSize[key] < 0) {
                baseSize[key] = 0;
              }
              // console.log(`${key}: ${baseSize[key]}`);
            }
          }
          //   console.log('after the bugfix with the indexes of description and color, now baseSize is like this')
          const indexOfFutureSize = i;
          baseSize.editBusto = allSizes[indexOfFutureSize].busto.med;
          baseSize.editCintura = allSizes[indexOfFutureSize].cintura.med;
          baseSize.editQuadril = allSizes[indexOfFutureSize].quadril.med;
          //   console.log(baseSize, indexOfFutureSize,'indexofnextsize')
          const result = [
            baseSize.sizeTop,
            baseSize.sizeBottom,
            baseSize.sizeWhole,
            baseSize.editBusto,
            baseSize.editCintura,
            baseSize.editQuadril,
            allDescriptions[baseSize.bustoDescription],
            allColors[baseSize.bustoDescription],
            allDescriptions[baseSize.cinturaDescription],
            allColors[baseSize.cinturaDescription],
            allDescriptions[baseSize.quadrilDescription],
            allColors[baseSize.quadrilDescription],
          ];
          // console.log(result, 'log of result inside loop')
          factoryResult[i] = result;
        }
      });
      //wiping the original object to an
      // console.log(factoryResult,'this is factory restul')
      factoryResult[allSizesNames.indexOf(originalSize)] = [
        factoryInfo.sizeTop,
        factoryInfo.sizeBottom,
        factoryInfo.sizeWhole,
        factoryInfo.editBusto,
        factoryInfo.editCintura,
        factoryInfo.editQuadril,
        allDescriptions[factoryInfo.bustoDescription],
        allColors[factoryInfo.bustoDescription],
        allDescriptions[factoryInfo.cinturaDescription],
        allColors[factoryInfo.cinturaDescription],
        allDescriptions[factoryInfo.quadrilDescription],
        allColors[factoryInfo.quadrilDescription],
      ];
      // console.log(
      //   factoryResult,
      //   "this is factory restul after orignial value changes",
      //   originalSize,
      //   "originalSize"
      // );
      setPreferedSize(originalSize);
      setFactoryResultState(Object.assign({}, factoryResult));
    }
  };

  useEffect(() => {
    if (!factoryResultState) factory();
  });

  const changeSize = (index: number) => {
    if (factoryResultState && Array.isArray(factoryResultState[index])) {
      // console.log('going to be this>', factoryResultState[index], 'at index', index)
      fromEditSetter(
        ...(factoryResultState[index] as [
          string,
          string,
          string,
          number,
          number,
          number,
          string,
          string,
          string,
          string,
          string,
          string
        ])
      );
    }
  };
  // console.log({bustoColor,cinturaColor,quadrilColor,sizeTop,sizeWhole,sizeBottom})
  if (!router.isFallback) {
    // console.log({bustoColor,cinturaColor,quadrilColor,sizeTop,sizeWhole,sizeBottom}, 'entrou')
    return (
      <>
        <title>Resultado</title>

        <div
          className={` ${roboto.className} flex outline-1 bg-white  items-center`}
        >
          <div className="max-w-[12rem] min-w-[12rem] bg-white  self-start">

            {/* configurar isso pra ser gerado tbm, exemplo, calça nao precisa de busto */}
            {bustoColor || cinturaColor || quadrilColor ? (
              <>
                {sizeTop || sizeWhole ? (
                  <SugarBustoSVG
                    bustoColor={bustoColor}
                    description={bustoDescription}
                  />
                ) : null}
                <SugarCinturaSVG
                  cinturaColor={cinturaColor}
                  description={cinturaDescription}
                />
                <SugarQuadrilSVG
                  quadrilColor={quadrilColor}
                  description={quadrilDescription}
                />
              </>
            ) : null}
            {/* configurar isso pra ser gerado tbm */}
            <div className=" flex mx-4 mt-8 h-1 justify-between bg-gradient-to-r from-green-500 via-yellow-300 to-red-500">
              <p className="relative bottom-6 text-sm text-black">Ideal</p>
              <p className="relative bottom-6 text-sm text-black">Apertado/Folgado</p>
            </div>

                  <div className="absolute">
            <button className="bg-white rounded-lg shadow-xl z-10 relative top-64 left-32 py-2 mx-2 my-4  text-black px-4" onClick={()=>setPopUpToggle('')}>?</button>
                  </div>

            <Image
              width={200}
              unoptimized
              height={200}
              alt={"doll std img"}
              className="object-cover object-top h-[25.5rem] brightness-110 z-0"
              src="/doll_imgs/w222.png"
            />
            

            
            <ChangeSizeButtons
              preferedSize={preferedSize}
              baseSize={{ sizeTop, sizeBottom, sizeWhole }}
              changeSize={(i: number) => changeSize(i)}
          
            ></ChangeSizeButtons>
            {/* <OtherSizesFactoryR baseSize={factoryInfo} setter={(a: string,b: string,c: string,d: number,e: number,f: number,g: string,h: string,i: string,j: string,k: string,l: string)=>{fromEditSetter(a,b,c,d,e,f,g,h,i,j,k,l)}}></OtherSizesFactoryR> */}
          </div>
          {/* <button className="bg-yellow-500" onClick={()=> console.log({settings})}>CheckSettings</button> */}
          <div className="flex flex-col bg-white shadow-2xl rounded-xl px-4 py-4 justify-between my-2 ">
          <PopUp sizeTop={sizeTop} sizeWhole={sizeWhole} state={popUpToggle} toggle={(e:string)=>setPopUpToggle(e)} bustoDescription={bustoDescription} bustoColor={bustoColor} cinturaDescription={cinturaDescription} cinturaColor={cinturaColor} quadrilDescription={quadrilDescription} quadrilColor={quadrilColor}></PopUp>
            <h1 className="text-gray-800 font font-medium text-3xl py-22">
              {" "}
              Você está provando {categoria} tamanho:
              <div className="flex justify-center">
                <p className="flex bg-black rounded-lg self-center p-2 my-5 max-w-[50%] text-white">
                  {sizeTop || sizeBottom || sizeWhole}
                </p>
              </div>
              <div className="absolute h-[1rem] ml-1 ">
                <img
                  className="bg-white rounded-full relative  h-[0.725rem]"
                  src="/1008958.png"
                />
              </div>
              <p className="text-xs ml-4">= Tamanho Recomendado</p>
            </h1>

            {/* {sizeTop || sizeWhole?<div className='mt-16 text-black'>Busto:{bustoDescription}</div> :<div className="mt-10">-</div>} 
        <div className='mt-8 text-black'>Cintura:{cinturaDescription}</div>
        <div className='mt-16 text-black'>Quadril:{quadrilDescription}</div> */}

            <div className="flex flex-col justify-start mt-0">
              <button
                id="reiniciar"
                className="rounded-lg bg-white text-black shadow-lg py-2 my-2  "
                onClick={() =>
                  router.push({
                    pathname: `${window.location.origin}/${encodeURIComponent(
                      encodedImgUrl
                    )}`,
                    query: { categoria: categoria },
                  })
                }
              >
                Reiniciar
              </button>
              {doll ? (
                <button
                  id="voltar"
                  className="rounded-lg bg-white text-black shadow-lg py-2 my-2  "
                  onClick={() =>
                    router.push({
                      pathname: `${window.location.origin}/doll/DollPage`,
                      query: {
                        imc: imc,
                        encodedImgUrl: encodedImgUrl,
                        categoria: categoria,
                      },
                    })
                  }
                >
                  Voltar
                </button>
              ) : null}
              {doll ? (
                <p className="text-xs text-black pt-2">
                  Ficou em dúvida? Com a nossa fita métrica é possível ser ainda
                  mais assertivo ! Clique nos botões abaixo e experimente !
                </p>
              ) : null}
              <button
                id="goto_medidas_exatas"
                className="rounded-lg bg-black text-white shadow-lg py-2 my-2  "
                onClick={() => {
                  router.push({
                    pathname: `${window.location.origin}/medidas/EditarMedidas`,
                    query: {
                      imc: imc,
                      editBusto: editBusto,
                      editCintura: editCintura,
                      editQuadril: editQuadril,
                      encodedImgUrl: encodedImgUrl,
                      categoria: categoria,
                    },
                  });
                }}
              >
                Inserir Medidas Exatas
              </button>
              {/* <button className="rounded-lg bg-white text-black shadow-lg py-2 my-2 " onClick={()=>router.push({pathname:'/medidas/NotFound', query:{imc:imc, encodedImgUrl:encodedImgUrl}})}>NotFound</button> */}
              <a
                id="fita_metrica"
                className="rounded-lg bg-white text-black shadow-lg py-2 my-2 text-center "
                href="/files/fita-metrica-eufloria.pdf"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                Fita Metrica
              </a>
            </div>
          </div>
        </div>
      </>
    );
  } else return <div>loading...</div>;
}
