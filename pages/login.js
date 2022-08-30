import Heading from "../components/Heading/Heading.js";
import Head from "next/head";
import Login from "../components/layout/Login.js";
import Contact from "../components/footer.js";
export default () => (
  <>
    <Head>
      <title>login</title>
    </Head>
    <Heading />
    <Login/>
    <Contact/>
  </>
);
