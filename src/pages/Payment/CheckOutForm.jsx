import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCreatePaymentIntentMutation, useSavePaymentInfoMutation } from "./paymentApi";
import { useEffect, useState } from "react";

const CheckOutForm = ({ price, userName, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null); // State to store payment info

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [savePaymentInfo] = useSavePaymentInfoMutation();

  useEffect(() => {
    const createPayment = async () => {
      try {
        const response = await createPaymentIntent({ price: Math.round(price * 100) }); // Convert price to cents
        if (response?.data?.clientSecret) {
          setClientSecret(response.data.clientSecret);
        }
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };
    createPayment();
  }, [createPaymentIntent, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
  
    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }
  
    const card = elements.getElement(CardElement);
    if (card === null) {
      setIsProcessing(false);
      return;
    }
  
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        setCardError(error.message);
        setIsProcessing(false);
        return;
      } else {
        setCardError('');
      }
  
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName || 'Anonymous',
            email: userEmail || '',
          },
        },
      });
  
      if (confirmError) {
        setCardError(confirmError.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id);
  
        // Save payment info to database
        const amountReceived = paymentIntent.amount;
        const amount = amountReceived / 100; // Convert cents to dollars
  
        if (isNaN(amount)) {
          setCardError('Invalid payment amount');
          setIsProcessing(false);
          return;
        }
  
        const paymentInfo = {
          transactionId: paymentIntent.id,
          amount, // Properly calculated amount
          email: userEmail,
          name: userName,
        };
  
        try {
          const response = await savePaymentInfo(paymentInfo).unwrap(); // Use unwrap() to get the result
          setPaymentInfo(response);
        } catch (error) {
          console.error('Error saving payment info:', error);
        }
      }
    } catch (error) {
      console.error('Error handling payment submission:', error);
    }
  
    setIsProcessing(false);
  };

  return (
    <>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          className="btn btn-outline btn-primary btn-sm hover:bg-primary hover:text-white rounded-lg px-4 py-2 mt-5"
          type="submit"
          disabled={!stripe || !clientSecret || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {cardError && <p className="text-red-500 ml-8">{cardError}</p>}
      {transactionId && <p className="text-green-500 ml-8">Transaction ID: {transactionId}</p>}
      {paymentInfo && (
        <div className="ml-8 mt-4">
          <h3 className="text-lg font-semibold">Payment Info:</h3>
          <p className="text-green-500">Payment was successful!</p>
        </div>
      )}
    </>
  );
};

export default CheckOutForm;
