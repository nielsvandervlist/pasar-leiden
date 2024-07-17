import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Container from "../../components/container"; // Adjust the import path based on your file structure
import Layout from "../../components/layout";
import mollieClient from "../../lib/mollie"; // Adjust the import path based on your file structure

export default function Qrcheck() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [scanned, setScanned] = useState<boolean | null>(null);

    useEffect(() => {
        // Extract the paymentId from the query parameters
        const { paymentId } = router.query;

        if (paymentId) {
            // Fetch the payment status from the backend
            const fetchPaymentStatus = async () => {
                try {
                    const response = await fetch(`/api/qr-status?paymentId=${encodeURIComponent(paymentId as string)}`);
                    const data = await response.json();
                    setPaymentStatus(data.status);
                    if(!data.metadata.scanned) {
                        await mollieClient.payments.update(paymentId as string, {
                            metadata: {
                                email: data.email,
                                scanned: true,
                            }
                        })
                    } else {
                        setScanned(true)
                    }
                } catch (error) {
                    console.error('Error fetching payment status:', error);
                    setPaymentStatus('Error fetching payment status');
                } finally {
                    setLoading(false);
                }
            };

            fetchPaymentStatus().then(r => console.log(r));
        } else {
            setLoading(false);
        }
    }, [router.query]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Layout preview={''}>
            <Head>
                <title>{`Check QR`}</title>
            </Head>
            <Container>
                <div>
                    <h1>Thank You!</h1>
                    {paymentStatus === 'paid' && !scanned ? (
                        <p>Ticket is paid and key is valid</p>
                    ) : (
                        <p>There was an issue with your payment or key is not valid. Please try again.</p>
                    )}
                </div>
            </Container>
        </Layout>
    );
}
