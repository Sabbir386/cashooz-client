import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckOutForm=()=>{
    const stripe=useStripe();
    const elements = useElements();
    const [cardError,setCardError]=useState('');
    const handleSubmit = async (event) => {
        
        event.preventDefault();
        if (!stripe || !elements) {
            
            return;
          }
        const card=elements.getElement(CardElement);
        if(card===null){
          return;
        }
        console.log('card',card);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          console.log('[error]', error);
          setCardError(error.message);
        } else {
          setCardError('');
          console.log('[PaymentMethod]', paymentMethod);
        }
    }
    return (
       <>
        <form className=" w-2/3 m-8" onSubmit={handleSubmit}>
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
  disabled={!stripe}
>
  Pay
</button>

    </form>
    {cardError && <p className="text-red-500 ml-8">{cardError} </p>}
       </>
    )
}
export default CheckOutForm;