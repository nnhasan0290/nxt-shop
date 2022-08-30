import PaymentSuccess from "../components/cart/PaymentSuccess";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../components/cart/paymentCom";
import Contact from "../components/footer";
export default () => (
   <Elements stripe={stripePromise}>
    <PaymentSuccess />
   </Elements>
);
