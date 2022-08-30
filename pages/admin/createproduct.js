import Head from "next/head";
import { Fragment } from "react";
import DashContent from "../../components/dashboard/DashContent";
import Sidebar from "../../components/dashboard/Sidebar";

const Dashboard = () => {
  return (
    <Fragment>
      <Head>
        <title>Admin Create Product</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main>
        <Sidebar />
        <DashContent />
      </main>
    </Fragment>
  );
};
export default Dashboard;
