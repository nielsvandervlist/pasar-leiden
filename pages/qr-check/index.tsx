import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Container from "../../components/container"; // Adjust the import path based on your file structure
import Layout from "../../components/layout";
import {faCheckCircle, faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"; // Adjust the import path based on your file structure

export default function Qrcheck() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [scanned, setScanned] = useState<boolean | null>(null);
    const [tickets, setTickets] = useState<number>(0)

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
                    setScanned(data.scanned)
                    setTickets(data.tickets)
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
                <div className='max-w-lg mx-auto my-8 md:my-16 p-8 border-primary border-solid border-[5px] rounded-md text-center'>
                    <h1>QR CHECK</h1>
                    {paymentStatus === 'paid' && tickets > 0 ? (
                        <>
                            <h1 className='text-[48px] mb-2'>Thank You!</h1>
                            <FontAwesomeIcon className='text-[48px] text-green-600 mb-8' icon={faCheckCircle}/>
                            <span className={'font-bold text-4xl'}>{tickets}</span>
                        </>
                    ) : (
                        <>
                            <h1 className='text-[32px] mb-2'>Something went wrong</h1>
                            <FontAwesomeIcon className='text-[48px] text-red-600 mb-8' icon={faXmarkCircle}/>
                            <p>There was an issue with your payment or key is not valid. Please try again.</p>
                        </>
                    )}
                </div>
            </Container>
        </Layout>
    );
}
