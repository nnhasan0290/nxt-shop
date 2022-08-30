import CustomizedSteppers from "./checkStep";
import HomeIcon from "@mui/icons-material/Home";
import { Country, State } from "country-state-city";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveShippingInfo,
} from "../../redux/actions/cartAction";
import { useAlert } from "react-alert";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import PinDropIcon from "@mui/icons-material/PinDrop";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { useRouter } from "next/router";

const CheckoutComponent = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState(0);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phoneNo, setPhoneNo] = useState(0);
  const dispatch = useDispatch();
  const alert = useAlert();
  const router = useRouter();
  const submitHandle = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("phone number should be 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, postCode, country, state, phoneNo })
    );
     router.push("/confirmorder");
  };
  
  return (
    <div className="md:p-10 bg-[#f9f9f9]">
      <div className="hidden py-5 bg-white shadow-3xl sm:block">
        <CustomizedSteppers className="" activeStep={0} />
      </div>
      <div className="my-10 bg-white md:py-10 shadow-3xl">
        <h2 className="text-xl text-center big-heading">Shipping Details</h2>
        <form
          onSubmit={submitHandle}
          className="md:w-[50%] w-[80%] min-w-[200px] mx-auto my-5"
        >
          <div className="flex items-center p-2 m-2 space-x-6 border">
            <HomeIcon />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className=""
              type="text"
              placeholder="Address"
              required
            />
          </div>
          <div className="flex items-center p-2 m-2 space-x-6 border">
            <LocationCityIcon />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className=""
              type="text"
              placeholder="City"
              required
            />
          </div>
          <div className="flex items-center p-2 m-2 space-x-6 border">
            <PinDropIcon />
            <input
              value={postCode > 0 && postCode}
              onChange={(e) => setPostCode(e.target.value)}
              className=""
              type="number"
              placeholder="Postal code"
              required
            />
          </div>
          <div className="flex items-center p-2 m-2 space-x-6 border">
            <PhoneIcon />
            <input
              value={phoneNo > 0 && phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className=""
              type="number"
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="flex items-center p-2 m-2 space-x-6 border">
            <PublicIcon />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="outline-none w-[100%]"
              name=""
              id=""
              required
            >
              <option value="">Country</option>
              {Country.getAllCountries() &&
                Country.getAllCountries().map((each) => {
                  return (
                    <option key={each.isoCode} value={each.isoCode}>
                      {each.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex items-center p-2 m-2 space-x-6 border">
            <TransferWithinAStationIcon />
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="outline-none w-[100%]"
              name=""
              id=""
              required
            >
              <option value=""> State</option>
              {State &&
                State.getStatesOfCountry(country).map((each) => {
                  return (
                    <option key={each.isoCode} value={each.isoCode}>
                      {each.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="p-2 m-2 bg-[#0167f3] hover:bg-[#081828] transition duration-300 text-white rounded-sm ">
            <input className="cursor-pointer" type="submit" value="Continue" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CheckoutComponent;
