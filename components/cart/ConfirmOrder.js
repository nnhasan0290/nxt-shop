import { useEffect, useState } from "react";
import CustomizedSteppers from "./checkStep";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const ConfirmOrder = () => {
  const { shippingInfo, allcartItems } = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
    const totalAmount = allcartItems.reduce((total, each) => {
    return total + each.quantity * each.price;
  }, 0);
  return (
    <div className="md:p-10 bg-[#f9f9f9] capitalize">
      <div className="hidden py-5 bg-white shadow-3xl sm:block">
        <CustomizedSteppers className="" activeStep={1} />
      </div>
      <div className="my-10 md:space-x-10 md:flex">
        <div className="p-10 mb-10 bg-white basis-2/3 shadow-3xl">
          <div>
            <h2 className="semi-heading hover:cursor-auto hover:text-[#081828]">
              Shipping info
            </h2>
            <div className="my-5 ml-5">
              <p className="p-1">address: {shippingInfo?.address}</p>
              <p className="p-1">city: {shippingInfo?.city}</p>
              <p className="p-1">state: {shippingInfo?.state}</p>
            </div>
          </div>
          <div className="my-10">
            <h2 className="semi-heading hover:cursor-auto hover:text-[#081828]">
              Your Cart Items
            </h2>
            {allcartItems &&
              allcartItems.map((each, i) => {
                return (
                  <div
                    key={i}
                    className="flex justify-between items-center my-5"
                  >
                    <div className="flex items-center space-x-5">
                      <img
                        src={each.images[0].url}
                        alt=""
                        width={80}
                        height={80}
                      />
                      <h5>{each.name}</h5>
                    </div>
                    <div>
                      <p>
                        {each.quantity}X{each.price} = $
                        {each.quantity * each.price}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="basis-1/3">
          <div className="p-10 bg-white shadow">
            <h2 className="semi-heading hover:text-[#081828] cursor-auto border-b p-3">
              Order Summery
            </h2>
            <div className="my-3">
              <p>Subtotal: {totalAmount}</p>
            </div>
            <button
              onClick={() => {
                dispatch({ type: "GET_TOTAL_AMOUNT", payload: totalAmount });
                router.push("/payment");
              }}
              className="text-white bg-[#0167f3] hover:bg-[#081828] transition duration-300 p-3 rounded-sm my-3"
            >
              Prcoess to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmOrder;
