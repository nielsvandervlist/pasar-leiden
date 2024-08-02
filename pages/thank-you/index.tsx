import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import {CMS_NAME} from "../../lib/constants";
import Intro from "../../components/intro";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCross, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

export default function ThankYou(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

    useEffect(() => {
        // Extract the paymentId from the query parameters
        const { paymentId } = router.query;

        if (paymentId) {
            // Fetch the payment status from the backend
            const fetchPaymentStatus = async () => {
                try {
                    const response = await fetch(`/api/payment-status?paymentId=${paymentId}`);
                    const data = await response.json();
                    setPaymentStatus(data.status);
                } catch (error) {
                    console.error('Error fetching payment status:', error);
                    setPaymentStatus('Error fetching payment status');
                } finally {
                    setLoading(false);
                }
            };

            fetchPaymentStatus().then(r => console.log(r));
        }
    }, [router.query]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Layout className={'bg-primary'}>
            <Head>
                <title>Thank you</title>
            </Head>
            <Container>
                <div className='max-w-lg mx-auto my-8 md:my-16 p-8 border-primary border-solid border-[5px] rounded-md text-center'>
                    {paymentStatus === 'paid' ? (
                        <>
                            <h1 className='text-[48px] mb-2'>Dank u wel!</h1>
                            <FontAwesomeIcon className='text-[48px] text-green-600 mb-8' icon={faCheckCircle}/>
                            <p>Uw betaling is gelukt. Bedankt voor uw aankoop!</p>
                            <p>Controleer alstublieft uw e-mail</p>
                        </>
                    ) : (
                        <>
                            <h1 className='text-[32px] mb-2'>Er is iets misgegaan</h1>
                            <FontAwesomeIcon className='text-[48px] text-red-600 mb-8' icon={faXmarkCircle}/>
                            <p>Er was een probleem met uw betaling. Probeer het alstublieft opnieuw.</p>
                        </>
                    )}

                </div>
            </Container>
        </Layout>
    );
};
