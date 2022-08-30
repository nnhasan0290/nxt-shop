import Head from "next/head";
import { Fragment } from "react";
import AllProduct from "../../components/dashboard/AllProduct";
import Sidebar from "../../components/dashboard/Sidebar";

const Dashboard = () => {
  return (
    <Fragment>
      <Head>
        <title>Admin Products</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main>
        <Sidebar />
        <AllProduct/>
      </main>
    </Fragment>
  );
};
export default Dashboard;