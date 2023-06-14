import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from 'next/router'
import Image from "next/image";
import Imc from "../components/imc/IMC";
//ajustar imagem
//add framer-motion e animação entre páginas

const Home: NextPage = (props:any) => {
  const router:any = useRouter()


  const img:string = router.query.img
  //console.log(window.location.pathname.split("/")) to get tipo
  // foo lets you trigger another thing inside the same query object by putting ?foo=something on url
  // what im going to accomplish here is one way to change sex, prepare the software for more defined purposes like only sizeTop in the end
  // foo === something
  // console.log(img,'img')



  return (
    <>
            <title>Bem Vindo/IMC</title>
    
      <div className="bg-gray-50 p-4 flex rounded-sm justify-between items-center min-h-[600px] ">
        {/* maybe this div needs a max-width */}
        <div className="flex max-w-[50%] max-h-[100%]">
          {img? <Image loader={()=>img} priority unoptimized alt={img} width={662} height={1000} className="rounded-md" src={img}/>:null}
        </div>
          <div>
            {/* this should change name */}
            <Imc img={img}></Imc>
          </div>  
      </div>
      
    </>
  );
};

export default Home;



// passing this info -> to my iframe
//console.log(    encodeURIComponent(document.querySelector('.zoomImg').src))
//<iframe src="http://localhost:3000/https%3A%2F%2Fimages.tcdn.com.br%2Fimg%2Fimg_prod%2F1133807%2Fcamisao_nada_basico_preto_409_1_4ea43f5cad399b6da0f8d6bc5d9a58a0_20230404150510.jpg" width="662" height="600"></iframe>
{/* <script>
  let urlLocal = 'http://localhost:3000/'
  let urlDev = 'https://the-size-picker-costa-vitor-fernandes.vercel.app/'
  let url = 'https://the-size-picker.vercel.app/'
  let productPhoto = encodeURIComponent(document.querySelector('.zoomImg').src)
  let categoria = '?categoria='
  let cedilha = '%C3%A7'
  let ifram = document.createElement("iframe")
  ifram.setAttribute('src', url+productPhoto+categoria)
  ifram.setAttribute('width', '100%')
  ifram.setAttribute('height', '600')
  document.querySelector('.tabs-content').append(ifram);
  
</script>
*/}
