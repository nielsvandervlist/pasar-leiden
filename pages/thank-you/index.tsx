import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ThankYouPage: React.FC = () => {
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
        } else {
            setLoading(false);
        }
    }, [router.query]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Thank You!</h1>
            {paymentStatus === 'paid' ? (
                <p>Your payment was successful. Thank you for your purchase!</p>
            ) : (
                <p>There was an issue with your payment. Please try again.</p>
            )}
        </div>
    );
};

export default ThankYouPage;
