import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { env } from "process";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { value } = req.body;

    try {
      const hashedValue = await bcrypt.hash(value, 10);

      // Store the hashed value in your preferred way (e.g., database, file, etc.)
      //actualy i will send this over email
      const sgMail = require("@sendgrid/mail");
 
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: 'vitinhuffc@gmail.com', // Change to your recipient
        from: "boodutcivkvqsuykcm@cwmxc.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: 'easy email with sendgrid',
        html: hashedValue,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error:any) => {
          console.error(error);
        });

      res.status(200).json({ message: 'Email Sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
