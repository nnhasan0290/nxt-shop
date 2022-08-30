import SingleProduct from "../Homepage/SingleProduct";
import { SearchIcon } from "@heroicons/react/outline";
import { Slider } from "@mui/material";
import Heading from "./Heading";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions/productAction";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loader from "../layout/Loader";

const AllProduct = () => {
  const categories = [
    "All",
    "laptop",
    "watch",
    "phone",
    "headphone",
    "speaker",
    "camera",
  ];
  const [keyword, setKeyword] = useState("");
  const [sliderVal, setValue] = useState([0, 1000]);
  const [category, setCategory] = useState("");
  const [checked, setChecked] = useState(null);
  const [page, setPageNo] = useState(1);
  const [sortMethod, setSortMethod] = useState("popularity");
  const valueText = (value) => value;
  const router = useRouter();

  const dispatch = useDispatch();

  const { products, loading, success, total } = useSelector(
    (state) => state.allProducts
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      setPageNo(1);
      router.push(`/product?s=${keyword}`);
      setKeyword("");
    }
  };

  useEffect(() => {
    dispatch(
      getAllProducts(router.query.s, sliderVal, page, sortMethod, category)
    );
  }, [router.query, sliderVal, page, sortMethod, category]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="md:w-[25%] sm:my-10 sm:ml-10">
            <div className="filtering">
              <Heading text="Search Product" />
              <form
                onSubmit={submitHandler}
                className="flex items-center px-5 py-1 rounded-md border"
              >
                <input
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                  className=""
                  type="text"
                  placeholder="Search"
                  maxLength="15"
                />

                <button type="submit">
                  <SearchIcon className="h-5 cursor-pointer" />
                </button>
              </form>
            </div>

            <div className="filtering">
              <Heading text="All Categories" />
              {categories.map((each, i) => (
                <li
                  onClick={() => {
                    setCategory(each);
                    setPageNo(1);
                  }}
                  key={i}
                  className={`py-1 capitalize list-none cursor-pointer text-medium hover:text-[#0167f3] hover:scale-105 transition duration-200 ease ${
                    each === category && "text-[#0167f3]"
                  }`}
                >
                  {each}
                </li>
              ))}
            </div>

            <div>
              <div className="filtering">
                <Heading text="Price Range" />
                <Slider
                  min={0}
                  max={1000}
                  value={sliderVal}
                  onChange={(event, newVal) => {
                    setChecked(false);
                    setValue(newVal);
                    setPageNo(1);
                  }}
                  valueLabelDisplay="on"
                  getAriaValueText={valueText}
                />
              </div>
              <div className="filtering">
                <Heading text="Filter by Price" />
                <div
                  className=""
                  onChange={(e) => {
                    setChecked(e.target.value);
                    const str = e.target.value;
                    const splited = str.split(",");
                    setValue([parseInt(splited[0]), parseInt(splited[1])]);
                    setPageNo(1);
                  }}
                >
                  <div className="flex items-center pb-2 space-x-2 text-normal">
                    <input
                      className="h-4 w-[20px]"
                      type="radio"
                      value={[0, 200]}
                      name="price"
                      checked={checked == "0,200"}
                      readOnly
                    />
                    <label className="text-[17px]" htmlFor="">
                      $0-$200
                    </label>
                  </div>
                  <div className="flex items-center pb-2 space-x-2 text-normal">
                    <input
                      className="h-4 w-[20px]"
                      type="radio"
                      value={[200, 400]}
                      name="price"
                      checked={checked == "200,400"}
                      readOnly
                    />
                    <label className="text-[17px]" htmlFor="">
                      $200-$400
                    </label>
                  </div>
                  <div className="flex items-center pb-2 space-x-2 text-normal">
                    <input
                      className="h-4 w-[20px]"
                      type="radio"
                      value={[400, 600]}
                      checked={checked == "400,600"}
                      name="price"
                      readOnly
                    />
                    <label className="text-[17px]" htmlFor="">
                      $400-$600
                    </label>
                  </div>
                  <div className="flex items-center pb-2 space-x-2 text-normal">
                    <input
                      className="h-4 w-[20px]"
                      type="radio"
                      value={[600, 1000]}
                      checked={checked == "600,1000"}
                      name="price"
                      readOnly
                    />
                    <label className="text-[17px]" htmlFor="">
                      $600-$1000
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[75%] sm:my-10 sm:mr-10">
            <div className="hidden px-3 w-full sm:block">
              <div className="flex items-center p-3 space-x-2 bg-white shadow-3xl">
                <label className="" htmlFor="sort">
                  Sort by:
                </label>
                <select
                  onChange={(e) => {
                    setSortMethod(e.target.value);
                  }}
                  className="py-2 px-5 border rounded-sm outline-none md:pr-[38px]"
                  defaultValue={sortMethod}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price">Low-to-High</option>
                  <option value="antiprice">High-to-Low</option>
                  <option value="name">A-Z order</option>
                  <option value="antiname">Z-A order</option>
                </select>
                <p className="hidden pl-5 md:block">
                  Showing: 1 to {products && products.length} item
                </p>
              </div>
            </div>
            <div className="box-border flex flex-wrap my-5 w-full">
              {products &&
                products.map((each, i) => (
                  <SingleProduct
                    key={i}
                    product={each}
                    lgBasis="lg:basis-1/3"
                  />
                ))}
            </div>
            {total > 6 && (
              <Stack spacing={2}>
                <Pagination
                  className="mx-auto"
                  onChange={(e, p) => {
                    setPageNo(Number(p));
                  }}
                  count={products && Math.ceil(total / 6)}
                  variant="outlined"
                  shape="rounded"
                  page={page}
                />
              </Stack>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default AllProduct;
