import { CheckIcon } from "@heroicons/react/outline";
import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import {useSelector,useDispatch} from "react-redux";
import {createOrder} from "../../redux/actions/orderAction.js";
import Loader from "../layout/Loader.js"
import Link from "next/link";
import {useAlert} from "react-alert";

const PaymentSuccess = (props) => {
  const [message, setMessage] = useState(null);
  const stripe = useStripe();
  const {success,loading,error} = useSelector(state => state.orderCreate);
  const dispatch = useDispatch();
  const alert = useAlert();


  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
 
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          const data = localStorage.getItem("order");
          if(data === ""){
            alert.error("Product has already been added");
            return;
          }
            dispatch(createOrder(data));
            if(error){
              alert.error(error);
              dispatch({type:"CLEAR_ERROR"});
            }
         
            localStorage.setItem("cartItems",JSON.stringify([]));
            localStorage.setItem("order","");
            setMessage("Payment succeeded!");
          
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  return (
   <>
   {loading ? <Loader/> : (
     <div className="bg-[#f9f9f9] flex items-center justify-center h-screen">
     <div className="text-center">
       <div className="">
         <CheckIcon className="m-auto h-12 text-[#0167f3]" />
       </div>
       <h2 className="semi-heading hover:text-[#081828] hover:cursor-auto text-3xl mb-5">{message}</h2>
       <button className="text-white bg-[#0167f3] hover:bg-[rgb(8,24,40)] transition duration-300 px-5 py-2 text-xl rounded-sm">
         <Link href={"/orders"}>Orders</Link>
       </button>
     </div>
   </div>
   )}
   </>
  );
};
export default PaymentSuccess;
