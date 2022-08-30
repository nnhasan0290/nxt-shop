import Head from "next/head";
import Contact from "../components/footer";
import Orders from "../components/orders/order";
export default () => (
    <>
     <Head>
        <title>Orders</title>
     </Head>
     <Orders/>
     <Contact/>
    </>
)