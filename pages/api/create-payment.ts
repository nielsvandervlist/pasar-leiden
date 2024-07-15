import { NextApiRequest, NextApiResponse } from 'next';
import mollieClient from '../../lib/mollie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { amount, currency, description } = req.body;

    if (!amount || !currency || !description) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const payment = await mollieClient.payments.create({
            amount: {
                currency,
                value: amount,
            },
            description,
            redirectUrl: `${process.env.NEXT_PUBLIC_LOCAL_URL}/thank-you`,
            webhookUrl: `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/webhook`,
        });

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}