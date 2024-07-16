import { NextApiRequest, NextApiResponse } from 'next';
import mollieClient from '../../lib/mollie';
import {sendEmail} from "../../lib/sendMail";
import {generateQRCode} from "../../lib/generateQRCode";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        console.log(req.method)
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const paymentId = req.body.id;
        const payment = await mollieClient.payments.get(paymentId);

        // Handle the payment status (e.g., update your database)
        if (payment.status === 'paid') {
            const qrCodeData = await generateQRCode(paymentId);
            const emailHtml = `
                <p>Thank you for your purchase!</p>
                <p>Please find your QR code attached below:</p>
                <img src="${qrCodeData}" alt="QR Code" />
            `;

            await sendEmail({
                to: payment.metadata.email, // Make sure you capture the user's email during the payment process
                subject: 'Your Festival Ticket QR Code',
                html: emailHtml,
                attachments: [
                    {
                        filename: 'qrcode.png',
                        path: qrCodeData,
                    },
                ],
            });

            // Handle other post-payment processes (e.g., updating your database)
        }

        res.status(200).send('Webhook received');
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
