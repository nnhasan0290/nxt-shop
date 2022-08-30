import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { LineChart } from "./lineChart";
import { useDispatch, useSelector } from "react-redux";
import { adminAllProduct } from "../../redux/actions/adminAction";
import { getOrders } from "../../redux/actions/orderAction";
import { adminAllUsers } from "../../redux/actions/adminAction.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {
  const dispatch = useDispatch();
  const { loading, products, success } = useSelector(
    (state) => state.adminProducts
  );
  const { order } = useSelector((state) => state.getOrder);
  const { users } = useSelector((state) => state.adminUsers);

  let outOfStock = 0;
  let totalAmount = 0;
  order &&
    order.forEach((each) => {
      totalAmount += each.totalPrice;
    });

  products &&
    products.forEach((each) => {
      if (each.stock === 0) {
        outOfStock++;
      }
    });

  const data = {
    labels: ["Out of stock", "In stock"],
    datasets: [
      {
        label: "# of Votes",
        data: [outOfStock, products?.length - outOfStock],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    dispatch(adminAllProduct());
    dispatch(getOrders());
    dispatch(adminAllUsers());
  }, []);
  return (
    <div className="sm:w-[80%] sm:float-right">
      <div className="w-full text-center">
        <h2 className="big-heading">Dashboard</h2>
      </div>
      <div className="w-full rounded-md bg-[#0167f3] my-2 p-3 text-center text-white text-lg">
        <h2>Total Amount: ${totalAmount}</h2>
      </div>
      <div className="justify-center capitalize sm:space-x-5 sm:flex">
        <a
          href="/admin/allproduct"
          className="bg-[#081828] text-white p-10 rounded-full w-[120px] h-[120px] flex items-center justify-center text-center mx-auto sm:mx-0 my-3 hover:bg-[#0167f3] transition duration-300"
        >
          {" "}
          products <br /> {products?.length}
        </a>
        <a
          href="/admin/orders"
          className="bg-[#081828] text-white p-10 rounded-full w-[120px] h-[120px] flex items-center justify-center text-center  mx-auto sm:mx-0 my-3 hover:bg-[#0167f3] transition duration-300"
        >
          Orders <br /> {order?.length}
        </a>
        <a
          href="/admin/users"
          className="bg-[#081828] text-white p-10 rounded-full w-[120px] h-[120px] flex items-center justify-center text-center mx-auto sm:mx-0 my-3 hover:bg-[#0167f3] transition duration-300"
        >
          Users <br /> {users?.length}
        </a>
      </div>
      <div className="w-[100%] m-auto sm:w-[70%] my-5">
        <LineChart amount={totalAmount} />
      </div>
      <div className="sm:w-[30%] m-auto w-[90%] my-5">
        <Pie data={data} />
      </div>
    </div>
  );
}
