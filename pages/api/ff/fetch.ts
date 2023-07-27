import { NextApiRequest, NextApiResponse } from 'next';




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('env,',process.env.AUTH_BEARER_TOKEN)
    try {
        const updateEdgeConfig = await fetch(
          'https://api.vercel.com/v1/edge-config/ecfg_cq97bvi3bmpdkdqusbyza4mx9dwk/items',
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
                  value: 'false',
                },
              ],
            }),
          },
        );
        const result = await updateEdgeConfig.json();
        // console.log(result);
        // res.json({result})
      } catch (error) {
        console.log(error);
      }

    // return res.json({message:'status off'})
}