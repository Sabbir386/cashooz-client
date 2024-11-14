import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  useCreatePaymentIntentMutation,
  useSavePaymentInfoMutation,
  useCreatePaypalOrderMutation,
  useCompleteOrderQuery,
} from "./paymentApi";
import { toast } from "sonner";
import Modal from "react-modal";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { Navigate, useNavigate } from "react-router-dom";

// Modal Styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1f2029",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "90%",
    width: "600px",
    maxHeight: "80vh",
    overflowY: "auto",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    overflow: "auto",
  },
};

const CheckOutForm = ({ price, userName, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [savePaymentInfo] = useSavePaymentInfoMutation();
  const [createPaypalOrder] = useCreatePaypalOrderMutation();
  const navigate = useNavigate();

  // Handle card click and select amount
  const handleCardClick = (amount) => {
    setSelectedAmount(amount);
    console.log(`Selected PayPal amount: $${amount}`);
  };

  // Handle Stripe Payment Intent
  useEffect(() => {
    const createPayment = async () => {
      try {
        const response = await createPaymentIntent({
          price: Math.round(price * 100), // Convert price to cents
        });
        if (response?.data?.clientSecret) {
          setClientSecret(response.data.clientSecret);
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };
    createPayment();
  }, [createPaymentIntent, price]);

  // Handle Stripe Payment Submission
  const handleSubmitStripePayment = async (event) => {
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
        type: "card",
        card,
      });

      if (error) {
        setCardError(error.message);
        setIsProcessing(false);
        return;
      } else {
        setCardError("");
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: userName || "Anonymous",
              email: userEmail || "",
            },
          },
        });

      if (confirmError) {
        setCardError(confirmError.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Save payment info to database
        const amountReceived = paymentIntent.amount;
        const amount = amountReceived / 100;

        if (isNaN(amount)) {
          setCardError("Invalid payment amount");
          setIsProcessing(false);
          return;
        }
        const paymentInfo = {
          transactionId: paymentIntent.id,
          amount,
          email: userEmail,
          name: userName,
        };

        try {
          const response = await savePaymentInfo(paymentInfo).unwrap();
          setPaymentInfo(response);
        } catch (error) {
          console.error("Error saving payment info:", error);
        }
      }
    } catch (error) {
      console.error("Error handling payment submission:", error);
    }

    setIsProcessing(false);
  };
  // Handle PayPal Payment
  const handlePaypalPayment = async ({selectedAmount,method}) => {
    console.log(selectedAmount,method)
    navigate("/dashboard/payment-paypal",{state:{selectedAmount,method}});
    // try {
    //   const orderResponse = await createPaypalOrder().unwrap();

    //   if (orderResponse.success && orderResponse.orderUrl) {
    //     window.location.href = orderResponse.orderUrl; // Redirect to PayPal for approval
    //   } else {
    //     console.error("Failed to create PayPal order");
    //   }
    // } catch (error) {
    //   console.error("Error creating PayPal order:", error);
    // }
  };

  // Toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <div>
        <h3 className="text-xl font-bold text-white border-l-4 border-buttonBackground pl-3">
          Withdraw Bank
        </h3>
      </div>
      {/* Stripe Payment Form */}
      <form className="w-2/3 my-8" onSubmit={handleSubmitStripePayment}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#ffffff", // White text for contrast
                "::placeholder": {
                  color: "#aab7c4", // Light grey placeholder
                },
              },
              invalid: {
                color: "#ff6b6b", // Red text for errors
              },
            },
          }}
          className="block my-2.5 max-w-[500px] py-2.5 px-[14px] shadow-sm rounded-md bg-[#1f2029] text-white" // Darker card element background
        />
        <button
          className={`w-24 bg-buttonBackground text-white hover:bg-primary hover:text-white rounded-lg px-4 py-2 mt-5 ${
            isProcessing ? "hidden" : "block"
          }`}
          type="submit"
          disabled={!stripe || !clientSecret || isProcessing}
        >
          Pay
        </button>
        {isProcessing && toast.info("Payment is processing")}
      </form>
      {cardError && <p className="text-red-500 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500 ml-8">Transaction ID: {transactionId}</p>
      )}
      {paymentInfo && (
        <div className="ml-8 mt-4">
          <h3 className="text-lg font-semibold">Payment Info:</h3>
          <p className="text-green-500">Payment was successful!</p>
        </div>
      )}
      {/* PayPal Payment Options */}
      <div className="text-white mt-8">
        <h3 className="text-xl font-bold text-white border-l-4 border-buttonBackground pl-3">
          Withdraw Cash
        </h3>
        <p className="text-lg mt-2 mb-3 pl-4">Amount: ${price.toFixed(2)}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <div
          className="p-6 bg-[#259CDF] border border-gray-700 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/6 cursor-pointer text-center flex flex-col items-center justify-center gap-3"
          onClick={toggleModal} // Open modal on click
        >
          <img
            src="https://freecash.com/public/img/cashout/paypal.png"
            alt="Pay with PayPal"
            className="w-20 h-20 mb-3"
          />
          <p className="text-white text-xl font-semibold">Pay with PayPal</p>
          <p className="text-gray-200 text-sm">Amount: ${price.toFixed(2)}</p>
        </div>
        {/* Other payment options */}
        <div
          className="p-6 bg-[#F9A540] border border-gray-700 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/6 cursor-pointer text-center flex flex-col items-center justify-center gap-3"
          onClick={() => handlePaypalPayment({selectedAmount, method: "btc"})}
        >
          <img
            src="https://freecash.com/public/img/cashout/bitcoin.png"
            alt="Pay with Bitcoin"
            className="w-20 h-20 mb-3"
          />
          <p className="text-white text-xl font-semibold">Pay with Bitcoin</p>
          <p className="text-gray-200 text-sm">Amount: ${price.toFixed(2)}</p>
        </div>

        <div
          className="p-6 bg-[#31414B] border border-gray-700 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/6 cursor-pointer text-center flex flex-col items-center justify-center gap-3"
          // onClick={()=> handlePaypalPayment(btc)}
        >
          <img
            src="https://freecash.com/public/img/cashout/stake.png"
            alt="Pay with PayPal"
            className="w-20 h-20 mb-3"
          />
          <p className="text-white text-xl font-semibold">Pay with Stake</p>
          <p className="text-gray-200 text-sm">Amount: ${price.toFixed(2)}</p>
        </div>

        <div
          className="p-6 bg-[#757CBE] border border-gray-700 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/6 cursor-pointer text-center flex flex-col items-center justify-center gap-3"
          onClick={handlePaypalPayment}
        >
          <img
            src="https://freecash.com/public/img/cashout/ethereum.png"
            alt="Pay with PayPal"
            className="w-20 h-20 mb-3"
          />
          <p className="text-white text-xl font-semibold">Pay with Ethereum</p>
          <p className="text-gray-200 text-sm">Amount: ${price.toFixed(2)}</p>
        </div>

        <div
          className="p-6 bg-[#F7C97A] border border-gray-700 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/6 cursor-pointer text-center flex flex-col items-center justify-center gap-3"
          onClick={handlePaypalPayment}
        >
          <img
            src="	https://freecash.com/public/img/cashout/dogecoin.png"
            alt="Pay with PayPal"
            className="w-20 h-20 mb-3"
          />
          <p className="text-white text-xl font-semibold">Pay with Dogecoin</p>
          <p className="text-gray-200 text-sm">Amount: ${price.toFixed(2)}</p>
        </div>
      </div>
      {/* modal necesarry  */}(
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="PayPal Payment Modal"
      >
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {/* Close Button */}
          <button
            className="fixed top-6 right-5 text-white text-2xl rounded-full p-3 bg-gray-700 hover:bg-gray-800 transition duration-300"
            onClick={toggleModal}
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              top: "14px",
            }}
          >
            &times;
          </button>

          <h2 className="text-white text-xl mb-4 text-center">
            Select PayPal Amount
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto">
            {[5, 10, 20, 30, 40, 50, 100, 200].map((amount, index) => (
              <div
                key={index}
                className={`p-6 bg-gradient-to-r from-[#263b80] to-[#25bcff] rounded-lg cursor-pointer text-center flex flex-col items-center justify-center gap-3 border-2 transition duration-300 ease-in-out ${
                  selectedAmount === amount
                    ? "border-green-500"
                    : "border-gray-700 hover:border-green-500"
                }`}
                onClick={() => handleCardClick(amount)} // Set the clicked card as active
                style={{
                  background:
                    "linear-gradient(351deg, rgb(38, 59, 128) 0%, rgb(37, 188, 255) 100%)",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  outlineOffset: "-1px",
                }}
              >
                <img
                  src="https://freecash.com/public/img/cashout/paypal.png"
                  alt={`PayPal ${amount}`}
                  className="w-32 h-24 mb-3"
                />
                <p className="text-gray-200 text-sm font-semibold">
                  Amount: ${amount}
                </p>
              </div>
            ))}
          </div>

          {/* Fee and Price Section */}
          <div className="w-full mt-6 p-4 bg-[#1c1d2b] rounded-lg flex flex-col sm:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
              <div className="text-gray-400 text-sm mr-4">Fee</div>
              <div className="text-white text-lg">$0</div>
            </div>
            <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
              <div className="text-gray-400 text-sm mr-4">Price</div>
              <div className="text-white text-lg">${selectedAmount || 0}</div>
            </div>
            <button
              onClick={() => handlePaypalPayment({selectedAmount:selectedAmount, method: "paypal"})}
              className={`bg-[#4ade80] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ${
                !selectedAmount
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#32a562]"
              }`}
              style={{
                minWidth: "150px",
                textAlign: "center",
              }}
              disabled={!selectedAmount}
            >
              Withdraw
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CheckOutForm;
