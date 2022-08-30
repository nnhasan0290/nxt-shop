import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/orderAction";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { loading, order } = useSelector((state) => state.getOrder);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <>
      <div className=" sm:w-[80%] sm:float-right">
        <h2 className="text-center big-heading">Orders</h2>
        <div className="my-10 bg-white border shadow-3xl">
          <div className="justify-center px-10 py-3 capitalize md:flex">
            <div className="text-center basis-1/3 md:text-start">Order Id</div>
            <div className="text-center basis-1/3 md:text-start">Status</div>
            <div className="text-center basis-1/3 md:text-start">amount</div>
          </div>
          {order &&
            order.map((each, i) => {
              return (
                <div
                  key={i}
                  className="justify-center px-10 py-3 capitalize border-t md:flex"
                >
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
              );
            })}
        </div>
      </div>
    </>
  );
};
export default AdminOrders;
