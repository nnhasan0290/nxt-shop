import { useSelector } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import CustomizedSteppers from "./checkStep";
import Heading from "../Heading/Heading"

export const stripePromise = loadStripe(
  "pk_test_51La7LJCWTGW8asVQgeJyQh3KzxcuN2VXyj1SUW1HFzRdMQzjV5TcC7y0KAvwZ7z8Igxkpk5SJGpc6Vm30dzcYoGZ00e18FUfGN"
);

const Payment = () => {
  const amount = useSelector((state) => state.totalAmount);

  const [clientSecret, setClientSecret] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/payment/process`,
        amount,
        config
      )
      .then((res) => setClientSecret(res.data.clientSecret));
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <>
    <Heading/>
    <div className="bg-[#f9f9f9] md:p-10 shadow-3xl">
      
      <div className="hidden py-5 bg-white shadow-3xl sm:block">
        <CustomizedSteppers className="" activeStep={3} />
      </div>
    <div className="p-5 my-10 bg-white md:p-10 App shadow-3xl">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ): (<h2>something went wrong</h2>)}
    </div>
    </div>
    </>
  );
};
export default Payment;
