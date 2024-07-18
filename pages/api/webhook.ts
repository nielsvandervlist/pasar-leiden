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
            const emailHtml = `<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pasar Leiden Ticket</title>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
        body {
            font-family: 'Urbanist', serif;
            margin: 0;
            padding: 0;
            background-color: #f4f1e8;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #689380;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            color: #fff;
            font-size: 2em;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h2 {
            color: #434343;
            font-size: 1.75em;
        }
        .content p {
            color: #434343;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            background-color: #689380;
            border-radius: 0 0 10px 10px;
        }
        .footer p {
            color: #fff;
        }
        .qr-code {
            display: block;
            margin: 20px auto;
            width: 150px;
            height: 150px;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            .header h1, .content h2 {
                font-size: 1.5em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Pasar Leiden</h1>
        </div>
        <div class="content">
            <h2>Bedankt voor uw aankoop</h2>
            <p>Beste ${payment.metadata.email},</p>
            <p>Bedankt voor uw aankoop van een ticket voor Pasar Leiden 2024! In de bijlage vindt u een QR-code die u bij de ingang van het evenement kunt laten scannen.</p>
                <p>Deze QR code is geldig voor ${payment.metadata.tickets} tickets</p>
                <img src="${qrCodeData}" alt="QR Code" />
            <p>We kijken ernaar uit u te verwelkomen op 31 augustus in Het Pesthuis, Leiden!</p>
        </div>
        <div class="footer">
            <p>Volg ons op <a href="https://www.facebook.com" style="color: #fff;">Facebook</a> en <a href="https://www.instagram.com" style="color: #fff;">Instagram</a></p>
        </div>
    </div>
</body>
</html>`;

            await sendEmail({
                to: payment.metadata.email, // Make sure you capture the user's email during the payment process
                subject: 'Pasar Leiden Festival Ticket(s) 2024',
                html: emailHtml,
                attachments: [
                    {
                        filename: 'qrcode.png',
                        path: qrCodeData,
                        cid: 'qr-code'
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
