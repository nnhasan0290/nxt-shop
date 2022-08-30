import Head from "next/head";
import AdminUsers from "../../components/dashboard/AdminUsers.js";
import Sidebar from "../../components/dashboard/Sidebar.js";

export default () => (
  <>
    <Head>
      <title>Users</title>
    </Head>
    <Sidebar />
    <AdminUsers />
  </>
);
