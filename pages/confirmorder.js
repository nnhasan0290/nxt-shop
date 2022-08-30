import Head from "next/head";
import ConfirmOrder from "../components/cart/ConfirmOrder";
import Contact from "../components/footer";
import Heading from "../components/Heading/Heading";

const Checkout = () => {
  return (
    <>
      <Head>
        <title>Confirm order</title>
      </Head>
      <Heading />
      <ConfirmOrder />
      <Contact/>
    </>
  );
};
export default Checkout;
