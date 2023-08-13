import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if(req.method === 'PATCH'){

        const updateEdgeConfig = await fetch(
        `https://api.vercel.com/v1/edge-config/${process.env.EDGE_ID}/items`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: [
                {
                  operation: 'update',
                  key: 'featureFlagsAppleStore_storeClosed',
                  value: 'true',
                },
              ],
            }),
          },
          );
          const result = await updateEdgeConfig.json();
          console.log(result);
          // res.status(200).json({result})
          return res.status(200).json({message:'status on'})
        }
      } catch (error) {
        console.log(error);
      }

    
}
