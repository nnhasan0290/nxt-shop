import Head from "next/head";
import Cart from "../components/cart/cart";
import Contact from "../components/footer";
import Heading from "../components/Heading/Heading"
export default () => (
  <>
    <Head>
      <title>cart</title>
    </Head>
    <Heading/>
    <Cart/>
    <Contact/>
  </>
);
