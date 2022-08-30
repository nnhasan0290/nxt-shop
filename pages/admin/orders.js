import AdminOrders from "../../components/dashboard/AdminOrders.js";
import Sidebar from "../../components/dashboard/Sidebar.js"

import Head from "next/head";
export default () => (
       <>
       <Head>
        <title>Admin Orders</title>
       </Head>
       <Sidebar/>
       <AdminOrders/>
       </>
	)