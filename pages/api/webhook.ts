import { NextApiRequest, NextApiResponse } from 'next';
import mollieClient from '../../lib/mollie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        console.log(req.method)
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const paymentId = req.body.id;
        const payment = await mollieClient.payments.get(paymentId);

        // Handle the payment status (e.g., update your database)

        res.status(200).send('Webhook received');
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
