import { NextApiRequest, NextApiResponse } from 'next';
import mollieClient from '../../lib/mollie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { amount, currency, description, email } = req.body;

    if (!amount || !currency || !description) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        // Create the payment first
        const payment = await mollieClient.payments.create({
            amount: {
                currency,
                value: amount,
            },
            description,
            redirectUrl: `${process.env.NEXT_PUBLIC_LOCAL_URL}/thank-you`, // Temporary URL, will be updated
            webhookUrl: `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/webhook`,
            metadata: {
                email: email,
                scanned: false,
            }
        });

        // Update the redirectUrl with the payment ID
        const updatedPayment = await mollieClient.payments.update(payment.id, {
            redirectUrl: `${process.env.NEXT_PUBLIC_LOCAL_URL}/thank-you?paymentId=${payment.id}`,
        });

        // Respond with the payment details
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
