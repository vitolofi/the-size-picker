import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { value } = req.body;

    try {
      const hashedValue = await bcrypt.hash(value, 10);

      // Store the hashed value in your preferred way (e.g., database, file, etc.)

      res.status(200).json({ hashedValue });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
