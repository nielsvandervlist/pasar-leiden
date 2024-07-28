import {useState} from 'react';
import Head from "next/head";
import {CMS_NAME} from "../../lib/constants";
import Layout from "../../components/layout";
import Container from "../../components/container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button";
import Line from "../../components/line";

export default function Payments() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formValues, setFormValues] = useState({
        amount: 0,
        email: '',
        age: '',
    });

    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    function formatValue(val: number) {
        return `${val * 2}.00`;
    }

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
                    amount: formatValue(formValues.amount),
                    currency: 'EUR',
                    description: 'Ticket Pasar Leiden',
                    email: formValues.email,
                    tickets: formValues.amount
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
        <Layout className={'bg-primary flex justify-center items-center'}>
            <Head>
                <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
            </Head>
            <Container>
                <div className={'max-w-lg mx-auto p-8 border-primary border-solid border-[5px] flex flex-col bg-white relative'}>
                    <h1 className={'mb-4 font-bold text-2xl'}>Tickets</h1>
                    <p className={'text-[14px] mb-4'}> Om het evenement jaarlijks terug te kunnen laten keren, vragen wij bij de entree om een symbolische bijdrage van €2,- (kinderen t/m 12 jaar zijn gratis).</p>
                    <form>
                        <fieldset className={'flex gap-4 mb-4 flex-col'}>
                            <label>Aantal tickets</label>
                            <input
                                className={'border-primary border-solid border-[2px] p-4'}
                                type="number"
                                name="amount"
                                value={formValues.amount}
                                onChange={handleInputChange}
                            />
                        </fieldset>
                        <fieldset className={'flex gap-4 mb-8 flex-col'}>
                            <label>E-mailadres</label>
                            <input
                                placeholder={'Vul hier uw e-mailadres in'}
                                className={'border-primary border-solid border-[2px] p-4'}
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                            />
                        </fieldset>
                    </form>
                    <Button
                        disabled={loading}
                        className={'mt-auto flex items-center ml-auto'}
                        variant={'secondary'}
                        onClick={handlePayment}
                    >
                        Bestel ticket(s)
                        <FontAwesomeIcon className={'ml-4'} icon={faArrowRightLong}/>
                    </Button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </div>
            </Container>
        </Layout>

    );
};
