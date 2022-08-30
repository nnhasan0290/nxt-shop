import Image from "next/image";
import StarRatingComponent from "react-star-rating-component";
import { useRouter } from "next/router";
import BasicModal from "./ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSingleProduct } from "../../redux/actions/productAction";
import Loader from "../layout/Loader";
import { localHostState } from "../../redux/actions/cartAction";
import { useAlert } from "react-alert";
import { loadUser } from "../../redux/actions/userAction";

const SingleProduct = () => {
  const router = useRouter();
  const alert = useAlert();
  const { loading, product, success } = useSelector(
    (state) => state.singleProduct
  );
  const { isAuthenticated } = useSelector((state) => state.loadUser);
  console.log(isAuthenticated);

  const dispatch = useDispatch();
  const {
    isReady,
    query: { pid },
  } = router;

  const price = product?.discount
    ? product?.price - (product?.discount * product.price) / 100
    : product?.price;

  //counting stars =============================
  useEffect(() => {
    if (isReady) {
      dispatch(getSingleProduct(pid));
    }
  }, [isReady]);

  const clickHandle = () => {
    if (!isAuthenticated) {
      alert.error("You must log in to order");
      return;
    }
    const { _id, price, name, discount, images, category, stock } = product;
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="sm:p-10 bg-[#f9f9f9]">
          <div className="bg-white md:flex">
            <div className="sm:p-5 basis-1/2">
              <div className="flex justify-center border">
                {product && (
                  <Image
                    className=""
                    src={product.images[0].url}
                    alt=""
                    width={400}
                    height={300}
                  />
                )}
              </div>
              <div>
                <div className="flex justify-center py-2 space-x-5 border">
                  {product &&
                    product.images.map((each, i) => {
                      return (
                        <div
                          key={i}
                          className=""
                          onClick={() => setMainImg(each.url)}
                        >
                          <Image
                            src={each.url}
                            alt=""
                            width={70}
                            height={70}
                            className="rounded-md"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-around p-10 basis-1/2">
              <div>
                <h1 className="text-3xl uppercase semi-heading hover:text-[#081828] cursor-auto">
                  {product && product.name}
                </h1>
                <p className="font-semibold capitalize">
                  category: {product && product.category}
                </p>
              </div>

              <h1 className="text-3xl font-bold">${price}</h1>
              <p className="leading-7 tracking-wide">{product?.description}</p>
              <div className="flex space-x-5 text-white">
                <button
                  onClick={clickHandle}
                  className="p-3 rounded-md border bg-[#0167f3] hover:bg-[#081828] transition duration-300 ease "
                >
                  Add to Cart{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="my-10 md:space-x-10 md:flex">
            <div className="basis-1/3">
              <div className="flex flex-col justify-center w-full p-10 space-y-2 bg-white rounded-md">
                <h1 className="text-xl semi-heading">
                  {product?.ratings} (Overall)
                </h1>
                <div className="items-center lg:space-x-3 lg:flex">
                  <p>5 stars-{28}</p>
                  <StarRatingComponent
                    name="review"
                    value={5}
                    className="text-lg"
                  />
                </div>
                <div className="items-center lg:space-x-3 lg:flex">
                  <p>4 stars-38</p>
                  <StarRatingComponent
                    name="review"
                    value={4}
                    className="text-lg"
                  />
                </div>
                <BasicModal />
              </div>
            </div>
            <div className="flex flex-col w-full p-10 bg-white rounded-md">
              <h1 className="text-xl semi-heading">Latest Reviews</h1>
              {product &&
                product.reviews.map((each, i) => {
                  return (
                    <div key={i} className="flex my-5 space-x-5">
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        alt=""
                        className="h-[50px] w-[50px] rounded-full"
                      />
                      <div className="p-5 rounded-md border relative after:content-['']  after:absolute after:top-[13px] after:border-[10px] after:right-[100%]  after:mt-1 after:border-transparent after:border-r-[#e5e5e5] after:z-1 before:content[''] before:top-[14px] before:right-[100%] before:border-[9px] before:absolute before:border-transparent before:border-r-white before:z-20 before:mt-1 w-full shadow-3xl">
                        <h4 className="leading-5 semi-heading hover:text-[#081828] cursor-auto">
                          {each.subject}
                        </h4>
                        <p className="leding-4">{each.name}</p>
                        <StarRatingComponent
                          name="review"
                          className="text-xl"
                          value={each.rating}
                        />
                        <p className="my-5">{each.comment}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SingleProduct;
