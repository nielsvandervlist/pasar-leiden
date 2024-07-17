import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from "next/head";
import Container from "../../components/container"; // Adjust the import path based on your file structure
import Layout from "../../components/layout";
import mollieClient from "../../lib/mollie"; // Adjust the import path based on your file structure

export default function QrCheck() {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [scanned, setScanned] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {

        const {paymentId} = router.query;

        if (paymentId) {
            // Fetch the payment status from the backend
            const fetchPaymentStatus = async () => {
                try {
                    const response = await fetch(`/api/qr-status?paymentId=${encodeURIComponent(paymentId as string)}`);
                    const data = await response.json();
                    setPaymentStatus(data.status);
                    setScanned(data.metadata.scanned);
                    setEmail(data.metadata.email);
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

    useEffect(() => {

        const {paymentId} = router.query;

        if (!scanned) {
            const update = async () => {
                try {
                    await mollieClient.payments.update(paymentId as string, {
                        metadata: {
                            scanned: true,
                            email: email,
                        }
                    })
                } catch (error) {
                    console.log(error)
                    console.log('error in updating value scanned')
                }
            }

            update().then(r => console.log(r))
        }
    }, [scanned]);

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
                    <h1>QR CHECK</h1>
                    {paymentStatus === 'paid' ? (
                        <p>Ticket is paid and key is valid</p>
                    ) : scanned ? (
                        <p>This ticket was already scanned.</p>
                    ) : <p>There was something wrong with your ticket</p>
                    }
                </div>
            </Container>
        </Layout>
    );
}
