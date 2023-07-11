import { useState } from "react";
export default function Contexto(){

    const [input1,setInput1]  = useState('')


    async function postData() {
        try {
          const data = { value: '123456'};
          const response = await fetch('/api/hash', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (!response.ok) {
            throw new Error('Request failed');
          }
      
          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.error(error);
        }
      }
      
      
      
      



    return(<div>a
        <input placeholder="hashed" onChange={(e) => setInput1(e.target.value)}></input>
        <button className="bg-red-500" onClick={()=> {
             postData()
} 
}>Hash</button>
    </div>)
}