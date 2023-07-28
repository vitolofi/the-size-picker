import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { useSettings } from '@/components/Context/SettingsProvider';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const { value, hashedValue } = req.body;
    
    try {
      const isMatch = await bcrypt.compare(value, hashedValue);

      if(isMatch){

      }
      res.status(200).json({ isMatch,});
      // if matches changes the selfD

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

