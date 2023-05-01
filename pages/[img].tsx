import { GetServerSideProps, NextApiRequest, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Imc from "./components/imc/IMC";

// ajustar o padding dos inputs, talvez aumentar as boxes
//add framer-motion e animação entre páginas

const Home: NextPage = (props:any) => {
  const router:any = useRouter()

  let img:string = router.query.img 

  const [altura,setAltura] = useState<number>(0)
  const [peso,setPeso] = useState<number>(0)
  const [idade,setIdade] = useState<number>(0)

  // const ImcCalc = (alt:number, p:number) =>{
  //   //if altura > 220 n pode
  //   //if peso > 250 n pode
  //   console.log(alt,'altura', p,'peso')
  //   const CmtoM = alt/100
  //   const altResult = CmtoM*CmtoM
  //   const result = p/altResult
  //   return result
  // }

  // if imc<14 n tem como -> Nao encontramos seu tamanho por favor -> Editar Medidas
  
  // imc == 17 idade<40 then cintura = 76
  // imc == 21 idade<40 then cintura = 78
  // imc == 26 idade<40 then cintura = 90
  // imc == 34 idade<40 then cintura = 100

  // imc == 17 idade>40 then cintura = 80
  // imc == 21 idade>40 then cintura = 82
  // imc == 26 idade>40 then cintura = 94
  // imc == 34 idade>40 then cintura = 98

  // if imc>35 n tem como -> Nao encontramos seu tamanho por favor -> Editar Medidas







  //busto min 70 - sutia 40
  //busto max 119 - sutia 48
  //cintura minima 65
  //cintura maxima 97
  //quadril min 92
  //quadril max 121




  return (
    <>
      <Head>
        
        <title>Seu Tamanho - Eufloria</title>
        <meta name="description" content="app to find your size in this store" />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap" rel="stylesheet"></link> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
      <div className="bg-gray-100 p-4 m-2 flex rounded-sm justify-between drop-shadow-lg items-center min-w-max max-w-lg">
        <div className="flex">

        {/* <div className="flex items-center"> */}
          {img? <Image alt={img} width={662} height={1000} className="rounded-md"  src={img}/>:null}
        {/* </div> */}
        </div>
          <div>
            {/* <div className="bg-gray-200 w-52 ml-4 py-4 rounded-md"> */}
            <Imc img={img}></Imc>
            {/* <div className="flex flex-col justify-center"> */}
            {/* <input type={"submit"} className="rounded-lg bg-gray-50 shadow-lg py-2 my-2 mx-4"  onClick={()=> router.push({pathname:'/doll/DollPage', query:{imc:ImcCalc(altura, peso), encodedImgUrl:img}})}>PRÓXIMO</input> */}
            {/* </div> */}
            {/* </div> */}
          </div>  
      </div>
      </main>
    </>
  );
};

export default Home;



// passing this info -> to my iframe
//console.log(    encodeURIComponent(document.querySelector('.zoomImg').src))
//<iframe src="http://localhost:3000/https%3A%2F%2Fimages.tcdn.com.br%2Fimg%2Fimg_prod%2F1133807%2Fcamisao_nada_basico_preto_409_1_4ea43f5cad399b6da0f8d6bc5d9a58a0_20230404150510.jpg" width="662" height="600"></iframe>
{/* <script>
  let url = 'https://the-size-picker-costa-vitor-fernandes.vercel.app/'
  let productPhoto = encodeURIComponent(document.querySelector('.zoomImg').src)
  let ifram = document.createElement("iframe")
  ifram.setAttribute('src', url+productPhoto)
  ifram.setAttribute('width', '425')
  ifram.setAttribute('height', '510')
  document.querySelector('.tabs-content').append(ifram);
  
</script>
<iframe id="iframe" width='662' height='600'></iframe> */}



//newstuff
// let url = 'https://the-size-picker-costa-vitor-fernandes.vercel.app/'
//   let productPhoto = encodeURIComponent(document.querySelector('.zoomImg').src)
//   let ifram = document.createElement("iframe")
//   ifram.setAttribute('src', url+productPhoto)
 
//   ifram.setAttribute('height', '450')
//   document.querySelector('.tabs-content').append(ifram);


//  red,    orange, green, green, orange, orange, red
// apertado, justo, levemente justo, ideal, levemente folgado, folgado, largo