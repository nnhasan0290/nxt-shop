import Head from "next/head";
import { Fragment } from "react";
import DashContent from "../../components/dashboard/DashContent";
import { PieChart } from "../../components/dashboard/PieChart";
import Sidebar from "../../components/dashboard/Sidebar";

const Dashboard = () => {
  return (
    <Fragment>
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <Sidebar />
        <PieChart />
      </main>
    </Fragment>
  );
};
export default Dashboard;
