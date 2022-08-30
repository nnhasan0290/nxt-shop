import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useSelector } from "react-redux";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const { shippingInfo, allcartItems } = useSelector((state) => state.cart);
  const amount = useSelector((state) => state.totalAmount);

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const ordered_items = allcartItems.map((each) => {
    return {
      name: each.name,
      price: each.price,
      image: each.images[0].url,
      product: each._id,
      quantity: each.quantity,
    };
  });
  const localOrder = {
    shippingInfo: {
      ...shippingInfo,
    },
    orderItems: ordered_items,
    totalPrice: amount.amount,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    localStorage.setItem("order", JSON.stringify(localOrder));
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/paymentsuccess`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="bg-[#0167f3] hover:bg-[#081828] transition duration-300 text-white p-3 rounded-md my-3"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
