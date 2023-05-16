import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from 'next/router'
import Image from "next/image";
import Imc from "./components/imc/IMC";
//ajustar imagem
//add framer-motion e animação entre páginas

const Home: NextPage = (props:any) => {
  const router:any = useRouter()


  let img:string = router.query.img
  //console.log(window.location.pathname.split("/")) to get tipo
  // foo lets you trigger another thing inside the same query object by putting ?foo=something on url
  // what im going to accomplish here is one way to change sex, prepare the software for more defined purposes like only sizeTop in the end
  // foo === something
  console.log(img,'img')



  return (
    <>
      <Head>
        <title>Seu Tamanho - Eufloria</title>
        <meta name="description" content="app to find your size in this store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
      <div className="bg-gray-100 p-4 m-2 flex rounded-sm justify-between drop-shadow-lg items-center min-w-max max-w-lg">
        {/* maybe this div needs a max-width */}
        <div className="flex max-w-sm">
          {img? <Image alt={img} width={662} height={1000} className="rounded-md"  src={img}/>:null}
        </div>
          <div>
            {/* this should change name */}
            <Imc img={img}></Imc>
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

  //console.log(window.location.pathname.split("/")) to get tipo