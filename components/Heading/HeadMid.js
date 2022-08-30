import {
  SearchIcon,
  ShoppingCartIcon,
  XIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "../../public/logo.svg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { localHostState } from "../../redux/actions/cartAction";
const HeadMid = () => {
  const { allcartItems } = useSelector((state) => state.cart);
  const [showCart, setShowCart] = useState(false);
  const visibleCartView = () => {
    if (allcartItems) {
      setShowCart(!showCart);
    }
  };
  const removeCartView = () => {
    setShowCart(false);
  };
  const [inputVal, setInputVal] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();


  //Click handle
  const clickHandle = (index) => {
    const items = [...allcartItems];
    items.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch(localHostState(JSON.parse(localStorage.getItem("cartItems"))));
  };

  useEffect(() => {
    dispatch(localHostState(JSON.parse(localStorage.getItem("cartItems"))));
  }, []);
  return (
    <div className="flex relative justify-between pt-5 pb-2 mx-10">
      <div className="md:basis-1/4 basis-1/2">
        <a href="/">
          <Image
            className="cursor-pointer"
            src={Logo}
            width={200}
            height={70}
          />
        </a>
      </div>
      <div className="hidden justify-center items-center w-full basis-2/4 md:flex">
        <div className="flex relative rounded-md border basis-3/4">
          <select
            className="px-5 border-r cursor-pointer outline-none"
            disabled
          >
            <option value="all"> All</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/product?s=${inputVal}`);
              setInputVal("");
            }}
            action=""
            className="flex justify-between w-full"
          >
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="pl-2"
              type="text"
              placeholder="Search"
            />
            <button
              type="submit"
              className="h-full bg-[#0167f3] px-4 rounded-md text-white hover:bg-[#081828] transition duration-300 ease"
            >
              <SearchIcon className="h-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-end items-center space-x-3 w-full font-thin basis-1/4">
        <div
          onClick={visibleCartView}
          className="p-2 border rounded-full hover:bg-[#0167f3] transition duration-500 cursor-pointer relative group"
        >
          <ShoppingCartIcon className="h-4 transition duration-300 group-hover:text-white" />
          <span className="absolute top-[-7px] right-[-5px] rounded-full bg-[#081828] px-[.4rem] text-white">
            {allcartItems && allcartItems.length}
          </span>
        </div>
      </div>
      {showCart && (
        <div className={`absolute top-[100%] right-0 shadow-3xl p-6 bg-white z-[999] ${allcartItems.length === 0 && "hidden"}`}>
          <div className="flex relative flex-col space-y-3">
            <div
              className="absolute top-[-1.3rem] right-[-1.3rem] border rounded-full bg-gray-800 hover:bg-red-900 transition duration-300 cursor-pointer"
              onClick={removeCartView}
            >
              <XIcon className="h-7 text-white" />
            </div>
            <div className="flex border-b justify-between py-3 text-[#081828]">
              <p>{allcartItems && allcartItems.length} items</p>
              <div className="hover:text-[#0167f3] transition duration-300">
                <Link href="/cart"> View Cart</Link>
              </div>
            </div>
            {allcartItems &&
              allcartItems.map((each, index) => (
                <div key={index}>
                  <div className="flex pb-3 space-x-5 border-b">
                    <div className="rounded-sm border cursor-pointer basis-1/4">
                      <Image
                        className=""
                        src={each.images[0].url}
                        width={70}
                        height={60}
                      />
                    </div>
                    <div className="basis-1/2">
                      <div className="w-full transition duration-500 cursor-pointer">
                        <h4 className=" text-[#081828] hover:text-[#0167f3] transition duration-300">
                          {each.name}
                        </h4>
                        <p>
                          {each.quantity}x-${each.price}
                        </p>
                      </div>
                    </div>
                    <div className="basis-1/4">
                      <div
                        onClick={() => clickHandle(index)}
                        className="rounded-full border cursor-pointer hover:bg-[#081828] transition duration-300 hover:text-white w-[22px]"
                      >
                        <XIcon className="h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <div>
              <div className="w-full bg-[#0167f3] text-xl text-white text-center py-2 rounded-md hover:bg-[#081828] transition duration-300">
                <Link href={"/checkout"}>Checkout</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HeadMid;
