import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const total = 1000.23;
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="min-h-screen">
      {/* Removed sunHeading and heading props from div */}
   
      <Elements stripe={stripePromise}>
        <CheckOutForm
          price={price}
          userName="Sabbir Ahmed"
          userEmail="sabbir386@gmail.com"
        />
      </Elements>
    </div>
  );
};

export default Payment;
