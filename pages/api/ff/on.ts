import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const updateEdgeConfig = await fetch(
          'https://api.vercel.com/v1/edge-config/ecfg_cq97bvi3bmpdkdqusbyza4mx9dwk/items',
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer xNDx8S3AQxm7DJKy6E0trJCO`,
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
        res.status(200).json({result})
      } catch (error) {
        console.log(error);
      }

    return res.status(200).json({message:'status on'})
}