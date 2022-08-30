import { TrashIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useAlert} from "react-alert";
import { adminAllProduct, clearErrors, deleteProduct } from "../../redux/actions/adminAction";

const AllProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, success } = useSelector(
    (state) => state.adminProducts
  );

  const {message} = useSelector(state => state.adminDeleteProduct);

  useEffect(() => {
    if(message){
        alert.show(message);
        dispatch(clearErrors())
    }
    dispatch(adminAllProduct());
  }, [message]);
  return (
    <div className="sm:w-[80%] sm:float-right">
      <h2 className="text-center big-heading">All Products</h2>
      <div className="py-10">
        <div className="bg-white border">
          <div className="justify-start px-10 py-3 capitalize md:flex">
            <div className="text-center md:text-start basis-1/3">
              Product Id
            </div>
            <div className="text-center basis-1/6">Name</div>
            <div className="text-center basis-1/6">stock</div>
            <div className="text-center basis-1/6">Price</div>
            <div className="text-center basis-1/6">Action</div>
          </div>
          {products &&
            products.map((each,i) => (
              <div key={i} className="justify-start items-center px-10 py-3 capitalize border-t md:flex">
                <div className="text-center md:text-start basis-1/3">
                  {each._id}
                </div>
                <div className="px-2 text-center basis-1/6">{each.name}</div>
                <div className="mx-auto text-center basis-1/6">
                  {each.stock}
                </div>
                <div className="text-center basis-1/6">{each.price}</div>
                <div onClick={() => {
                    dispatch(deleteProduct(each._id));
                }} className="text-center cursor-pointer basis-1/6">
                    <TrashIcon className="m-auto h-4 text-red-500 cursor-pointe" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default AllProduct;
