import SingleProduct from "../../components/Products/SingleProduct";
import Head from "next/head";
import Heading from "../../components/Heading/Heading";
import Contact from "../../components/footer";
export default () => (
  <>
    <Head>
      <title>Single Product</title>
    </Head>
    <Heading/>
    <SingleProduct />
    <Contact/>
  </>
);
