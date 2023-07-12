import { useState } from "react";
export default function Contexto(){

  
    async function hashReturn(value:string){
      try{
        const valued = {value:value}
        const response = await fetch('/api/hash', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(valued),
        });
    
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const responseData = await response.json();
        console.log(responseData);
      }
     catch (error) {
      console.error(error);
    }
  }
    

    async function comparehashed() {
        try {
          const data = { value: '123456', hashedValue: input};
          const response = await fetch('/api/compare', {
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
      
      
      
      
      
      
      const [input,setInput]  = useState('')

    return(<div>a
        
        <button className="bg-red-500" onClick={()=> {
             hashReturn('123456')
} 
}>Hash</button>
<div>b
<input placeholder="hashed" className="text-black" onChange={(e) => setInput(e.target.value)}></input>
<button className="bg-green-200" onClick={()=> comparehashed()}>Check for Hash</button>
</div>
    </div>
    )
    }
