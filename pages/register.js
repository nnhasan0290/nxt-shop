import Head from "next/head";
import Contact from "../components/footer";
import Heading from "../components/Heading/Heading";
import Registering from "../components/layout/Registering";

const Register = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Heading/>
      <Registering />
      <Contact/>
    </>
  );
};
export default Register;
