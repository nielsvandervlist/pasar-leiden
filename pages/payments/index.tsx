import { useState } from 'react';
import Head from "next/head";
import {CMS_NAME} from "../../lib/constants";
import Layout from "../../components/layout";
import Container from "../../components/container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button";

export default function Payments(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: '2.00',
                    currency: 'EUR',
                    description: 'Ticket Pasar Leiden',
                    email: 'niels.vder.vlist@gmail.com'
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            window.location.href = data._links.checkout.href;
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout preview={''}>
            <Head>
                <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
            </Head>
            <Container>
                <div>
                    <h1 className={'my-8 font-bold text-2xl'}>Tickets</h1>
                    <Button
                        disabled={loading}
                        className={'mt-auto flex items-center'}
                        variant={'secondary'}
                        onClick={handlePayment}
                    >
                        Koop een ticket
                        <FontAwesomeIcon className={'ml-4'} icon={faArrowRightLong}/>
                    </Button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </div>
            </Container>
        </Layout>

    );
};
