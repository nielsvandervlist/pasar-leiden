import { createMollieClient, MollieClient } from '@mollie/api-client';

const apiKey = process.env.MOLLIE_API_KEY;

if (!apiKey) {
    throw new Error('Missing Mollie API key');
}

const mollieClient: MollieClient = createMollieClient({ apiKey });

export default mollieClient;
