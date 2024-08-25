import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment=()=>{

   const total=100.23;
    const price=parseFloat(total.toFixed(2));

    return (
        <div className='min-h-screen '>
        <div sunHeading="please peovide" heading='Payment'></div>
        <Elements stripe={stripePromise}>
        <CheckOutForm price={price} userName="Sabbir Ahmed" userEmail="sabbir386@gmail.com"></CheckOutForm>
        </Elements>
        
        </div>
    );
};
export default Payment;