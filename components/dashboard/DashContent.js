import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/outline";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { creatingProduct } from "../../redux/actions/productAction";
import {useRouter} from "next/router";
import {loadUser} from "../../redux/actions/userAction"

const DashContent = () => {
  const [inputImg, setInputImg] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const {loading, data, success, error} = useSelector((state) => state.newProducts);

  //Methods ===========================
  const fileUpload = (e) => {
    const files = Array.from(e.target.files);
    setInputImg([]);

    files.forEach((each) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setInputImg((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(each);
    });
  };

  //submit method here ====================
  const submitAndcreateProduct = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("category", cat);
    myForm.set("description", desc);
    myForm.set("stock", stock);
    inputImg.forEach((each) => {
      myForm.append("images", each);
    });
    dispatch(creatingProduct(myForm));
  };

  return (
    <div className="sm:w-[80%] flex justify-center items-center sm:float-right bg-[#f9f9f9] ">
      <div className="px-10 py-3 border shadow-3xl">
        <h2 className="text-center big-heading">Create Product</h2>
        <form onSubmit={submitAndcreateProduct} action="" className="m-3">
          <div className="input-parent">
            <CheckCircleIcon className="h-7" />
            <input
              onChange={(e) => setName(e.target.value)}
              className="create-input"
              type="text"
              value={name}
              placeholder="product name"
              required
            />
          </div>
          <div className="input-parent">
            <CurrencyDollarIcon className="h-7" />
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price>0 && price}
              type="number"
              placeholder="price"
              min={20}
              required
            />
          </div>
          <div className="items-start input-parent">
            <DocumentTextIcon className="h-7" />
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              className="w-full outline-none resize-none bg-whit leading-widest placeholder:capitalize"
              name="description"
              placeholder="product description"
              value={desc}
              wrap="physical"
              id=""
              cols="10"
              rows="5"
            ></textarea>
          </div>
          <div className="input-parent">
            <p> category</p>
            <select
              onChange={(e) => setCat(e.target.value)}
              className="capitalize outline-none"
            >
              <option value="">Select</option>
              <option value="speaker">Speaker</option>
              <option value="laptop">Laptop</option>
              <option value="camera">camera</option>
              <option value="phone">Phone</option>
              <option value="watches">watches</option>
              <option value="headphones">headphones</option>
            </select>
          </div>
          <div className="input-parent">
            <input
              onChange={(e) => setStock(e.target.value)}
              type="number"
              name="stock"
              id="stock"
              placeholder="Stock"
              value={stock>0 && stock}
              min={1}
              max={50}
              required
            />
          </div>
          <div className="input-parent">
            <input
              onChange={fileUpload}
              type="file"
              name="product-img"
              id="product-img"
              className="text-transparent cursor-pointer file:p-1 file:w-full file:border-none file:bg-white file:text-[#081828]"
              required
              multiple
            />
          </div>
          <div className="flex flex-wrap items-center max-w-[300px]">
            {inputImg.map((each, i) => (
              <img key={i} src={each} alt="product-img" width={100} />
            ))}
          </div>
          <input
            name="product"
            type="submit"
            value="Submit"
            accept="/image/*"
            className="bg-[#0167f3] text-white transition duration-500 ease-in-out rounded-md hover:bg-[#081828] cursor-pointer mb-5"
          />
        </form>
      </div>
    </div>
  );
};
export default DashContent;
