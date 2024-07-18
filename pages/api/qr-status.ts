import { NextApiRequest, NextApiResponse } from 'next';
import mollieClient from '../../lib/mollie'; // Adjust the import path based on your file structure
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { paymentId } = req.query;

    if (!paymentId || typeof paymentId !== 'string') {
        return res.status(400).json({ error: 'Invalid payment ID' });
    }

    // Split the data and signature
    const [data, signature] = paymentId.split('|');
    const expectedSignature = CryptoJS.HmacSHA256(data, SECRET_KEY).toString();

    if (signature !== expectedSignature) {
        return res.status(400).json({ valid: false, error: 'Invalid QR code' });
    }

    try {
        const payment = await mollieClient.payments.get(data);

        if (payment.metadata.scanned) {
            return res.status(200).json({
                status: payment.status,
                scanned: true,
                tickets: payment.metadata.tickets - 1,
            });
        }

        // Update the payment metadata to mark it as scanned
        await mollieClient.payments.update(data, {
            metadata: {
                scanned: true,
                tickets: payment.metadata.tickets - 1,
                email: payment.metadata.email,
            }
        });

        return res.status(200).json({ status: payment.status, scanned: false, tickets: payment.metadata.tickets });
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
}
