import { XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { localHostState } from "../../redux/actions/cartAction";


const SingleCartItem = ({ product, index }) => {
 const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(product.quantity);
  const products = useSelector(state=> state.cart.allcartItems)
  
  const handleDelete = (e) => {
    const items = [...products];
    items.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch(localHostState(JSON.parse(localStorage.getItem("cartItems"))));
  };
  return (
    <div className={`items-center p-3 border-t md:flex`}>
      <div className="flex items-center py-2 basis-1/3">
        <div className="basis-1/3">
          <Image src={product.images[0].url} width={120} height={100} />
        </div>
        <div className="">
          <h2 className="text-[#081828]">{product.name}</h2>
          <span>Category: {product.category}</span>
        </div>
      </div>
      <div className="py-2 text-center basis-1/6 md:text-start">
        <select
          className="w-[60%] rounded-md outline-none border p-3"
          name=""
          id=""
          value={quantity}
          onChange={(e) => {
            console.log(e.target.value);
            const products = JSON.parse(localStorage.getItem("cartItems"));
            products[index].quantity = e.target.value;
            localStorage.setItem("cartItems", JSON.stringify(products));
            setQuantity(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="py-2 text-center basis-1/6 md:text-start">
        <p>${quantity*product.price}</p>
      </div>
      <div className="py-2 text-center basis-1/6 md:text-start">
        {product.discount}%
      </div>
      <div onClick={handleDelete} className="p-1 py-2 basis-1/6">
        <XIcon className="m-auto h-5 text-white bg-red-500 rounded-full cursor-pointer md:m-0 hover:bg-[#081828] transition duration-300" />
      </div>
    </div>
  );
};
export default SingleCartItem;
