import StarRatingComponent from "react-star-rating-component";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { localHostState } from "../../redux/actions/cartAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { saveShippingInfo } from "../../redux/actions/cartAction";

const SingleProduct = ({ product, lgBasis }) => {
  const router = useRouter();
  const {
    _id,
    name,
    category,
    images,
    reviews,
    numOfReviews,
    ratings,
    price,
    discount,
    stock,
  } = product;
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.loadUser);
  console.log(isAuthenticated);

  const clickHandle = () => {
    if (!isAuthenticated) {
      alert.error("You must log in to order");
      return;
    }
    const previous = localStorage.getItem("cartItems");
    if (!previous) {
      const newItem = [
        { _id, price, name, discount, images, category, stock, quantity: 1 },
      ];
      localStorage.setItem("cartItems", JSON.stringify(newItem));
      dispatch(localHostState(newItem));
    } else {
      const oldItems = JSON.parse(previous);

      const isExist = oldItems.find((each) => each._id === _id);

      if (isExist) {
        alert.show("Already added");
        return;
      } else {
        const modified_items = [
          ...oldItems,
          { _id, price, discount, name, images, category, stock, quantity: 1 },
        ];
        console.log(modified_items);
        localStorage.setItem("cartItems", JSON.stringify(modified_items));
        dispatch(localHostState(modified_items));
      }
    }

    alert.success("Product has been added to cart");
  };

  return (
    <div className={`basis-[100%] sm:basis-1/2 ${lgBasis} `}>
      <div className="box-border p-2  my-2 border-[#eee] shadow-3xl sm:mx-3 rounded-sm bg-white group">
        <div className="relative overflow-hidden">
          <img
            src={images[0].url}
            alt=""
            className="min-w-[100%] h-[300px] group-hover:scale-[1.1] transition duration-500"
          />
          {discount > 0 && (
            <span className="absolute top-0 left-0 bg-[#f73232] text-white py-1 text-sm font-medium px-2 rounded-sm">
              {discount}%
            </span>
          )}
          <button
            onClick={clickHandle}
            className="bg-[#0167f3] p-3 flex items-center text-white space-x-2 font-medium text-md absolute left-[50%] transform translate-x-[-50%] bottom-[-100%] group-hover:bottom-[30px] transition-all duration-500 ease-in-out rounded hover:bg-[#081828]"
          >
            <ShoppingCartIcon className="h-5" />
            <p className="tracking-tight"> Add To Cart</p>
          </button>
        </div>
        <div className="px-3 m-5 capitalize">
          <span className="text-sm tracking-tight">{category}</span>
          <h2
            onClick={() => router.push(`/product/${_id}`)}
            className="semi-heading"
          >
            {name}
          </h2>
          <div className="flex items-center space-x-2">
            <StarRatingComponent
              name="product"
              editing={false}
              value={ratings}
              className="lg:text-lg"
            />
            <p className="text-sm">{numOfReviews} review(s)</p>
          </div>
          {discount > 0 && (
            <div className="flex items-center space-x-3">
              <div className="leading-10 text-[#0167f3] text-xl font-bold">
                ${price - price * (discount / 100)}
              </div>
              <div className="line-through">${price}</div>
            </div>
          )}
          {discount === 0 && (
            <div className="flex items-center space-x-3">
              <div className="leading-10 text-[#0167f3] text-xl font-bold">
                ${price}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;
