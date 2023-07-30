import { useSettings } from "../Context/SettingsProvider";
export default function PopUp
(props: any) {
  const [settings] = useSettings();

  return (
    <div
      className={`absolute ${props.state} self-center bg-white drop-shadow-[0_50px_50px_rgba(0,0,0,0.75)] left-12 rounded-xl px-2 py-4 my-8 justify-between z-20`}
    >
      <div>
        <div className="flex justify-between text-black ">
          <h1 className="px-4 text-3xl">Guia de Tamanhos</h1>
          <button
            className="text-3xl px-2"
            onClick={() => props.toggle("hidden")}
          >
            X
          </button>
        </div>
      </div>

      {/* <div className="px-4 py-4">
        <div className=" text-black gap-0 ">
          <h1 className="inline-block">Busto:</h1>
          <div
            className={` bg${props.bustoColor} inline-block w-5 h-5 rounded-full`}
          ></div>{" "}
          <h2 className="inline-block">
          {props.bustoDescription}{" "}
          </h2>
        </div>
        <div className=" text-black ">
          <h1 className="inline-block">Cintura :
            </h1>
          <div
            className={` bg${props.cinturaColor} inline-block w-5 h-5 rounded-full `}
          ></div>{" "}
          <h2 className="inline-block">
          {props.cinturaDescription}
          </h2>
        </div>
        <div className=" text-black ">
         <h1 className="inline-block">
          Quadril :
          </h1>
          <div
            className={` bg${props.quadrilColor} inline-block w-5 h-5 rounded-full `}
          ></div>{" "}
          <h2 className="inline-block">
          {props.quadrilDescription}
          </h2>
        </div>
        <h1 className="text-black text-center">Possiveis descrições :</h1>
        <div className="grid grid-col-2  pl-16  self-center">

        {settings.allDescriptions.map((v, i, arr) => (
          <div className="text-black flex">
            <div
              className={` bg${settings.allColors[i]} inline-block w-5 h-5 rounded-full px-2 mx-2`}
            ></div>{" "}
            <h2>{v}</h2>
          </div>
        ))}
        </div>
      </div> */}
      <div className="flex pl-12 my-4 text-black">
        <div>
        {props.sizeTop || props.sizeWhole ? <div>Busto:</div> : null }
        <div>Cintura:</div>
        <div>Quadril:</div>
        </div>

        <div className="self-center pl-2">
        {props.sizeTop || props.sizeWhole ? <div className={`bg${props.bustoColor} h-5 w-5 rounded-full`}></div> : null }
        <div className={`bg${props.cinturaColor} h-5 w-5 rounded-full my-1`}></div>
        <div className={`bg${props.quadrilColor} h-5 w-5 rounded-full`}></div>
        </div>
        <div className="pl-2">
       {props.sizeTop || props.sizeWhole ? <div>{props.bustoDescription}</div> : null}
        <div>{props.cinturaDescription}</div>
        <div>{props.quadrilDescription}</div>
        </div>        
      </div>
      <h1 className="text-black">Descrição das cores :</h1>
        <div className="grid grid-col-2  self-center">

        {settings.allDescriptions.map((v, i, arr) => (
          
          <div key={i} className="text-black flex">
            <div
              className={` bg${settings.allColors[i]} inline-block w-5 h-5 rounded-full px-2 mx-2`}
            ></div>{" "}
            <h2>{v}</h2>
          </div>
        ))}
        </div>
    </div>
  );
}
