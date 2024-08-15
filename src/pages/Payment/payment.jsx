import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment=()=>{

   const total=100.23;
    const price=parseFloat(total.toFixed(2));

    return (
        <div className='min-h-screen bg-white'>
        <div sunHeading="please peovide" heading='Payment'></div>
        <h2 className="text-3xl bg-blue-600 text-white text-center">payment coming soon</h2>
        <p className="text-green-600 font-semibold text-lg mt-4">
  Thank you for your payment! Your transaction has been successfully processed. 
  We greatly appreciate your trust in us and look forward to serving you again.
  If you have any questions, feel free to reach out to our support team.
</p>

        <Elements stripe={stripePromise}>

        <CheckOutForm price={price} userName="Sabbir Ahmed" userEmail="sabbir386@gmail.com"></CheckOutForm>
        </Elements>
        
        </div>
    );
};
export default Payment;