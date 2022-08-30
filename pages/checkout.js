import Loader from "../components/layout/Loader";
import Head from "next/head";
import CheckoutComponent from "../components/cart/Checkout";
import Heading from "../components/Heading/Heading"
import Contact from "../components/footer";

const Checkout = () => {
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Heading/>
      <CheckoutComponent/>
      <Contact/>
    </>
  );
};
export default Checkout;
