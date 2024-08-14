import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment=()=>{
    return (
        <div className='min-h-screen bg-white'>
        <div sunHeading="please peovide" heading='Payment'></div>
        <h2 className="text-3xl bg-blue-600 text-white text-center">payment coming soon</h2>
        <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates autem possimus consequuntur quis accusantium iusto placeat debitis, laboriosam vitae delectus.sdfgdg
        </p>
        <Elements stripe={stripePromise}>

        <CheckOutForm></CheckOutForm>
        </Elements>
        
        </div>
    );
};
export default Payment;