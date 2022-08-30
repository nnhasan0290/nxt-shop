import { Fragment } from "react";
import SingleProduct from "./SingleProduct";
import Heading from "./../Heading/Heading.js";

const HomeProducts = ({products}) => {
  return (
    <Fragment>
      <Heading />
      <div className="bg-[#f9f9f9] py-10 px-[20px] md:px-[45px]">
        <div className="text-center w-[40%] m-auto">
          <h2 className="big-heading">Trending Products</h2>
          <p className="py-6">
            Lorem ipsum dolor sit amet consectetur adipiscing elit gravida
            viverra porttitor euismod justo, duis etiam eu eros mauris commodo
            fringilla
          </p>
        </div>
        <div className="box-border flex flex-wrap justify-center my-10 w-full">
          {products.map((each,i) => (
            <SingleProduct
              key={i}
              product={each}
              lgBasis={"lg:basis-1/4"}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};


export default HomeProducts;


