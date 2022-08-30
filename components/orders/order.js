import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../redux/actions/orderAction";
import Heading from "../Heading/Heading";
import Loader from "../layout/Loader";

const Orders = () => {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => state.getMyOrder);
  console.log(orders);
  useEffect(() => {
    dispatch(getMyOrders());
  }, []);
  return (
    <>
      <Heading />
      {loading ? (
        <Loader />
      ) : (
        <div className="sm:px-10 py-10 bg-[#f9f9f9]">
          <div className="bg-white border shadow-3xl">
            <div className="justify-center px-10 py-3 capitalize md:flex">
                <div className="text-center basis-1/3 md:text-start">
                  Order Id
                </div>
              <div className="text-center basis-1/3 md:text-start">
                Status
              </div>
              <div className="text-center basis-1/3 md:text-start">
                amount
              </div>
            </div>
            {
              orders && orders.map((each,i) => {
                return(
                  <div key={i} className="justify-center px-10 py-3 capitalize border-t md:flex">
                  <div className="text-center basis-1/3 md:text-start">
                    {each._id}
                  </div>
                <div className="text-center basis-1/3 md:text-start">
                  {each.orderStatus}
                </div>
                <div className="text-center basis-1/3 md:text-start">
                  {each.totalPrice}
                </div>
              </div>
                )
              })
            }
          </div>
        </div>
      )}
    </>
  );
};
export default Orders;
