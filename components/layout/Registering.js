
import { useState,useEffect } from "react";
import { createUserAction } from "../../redux/actions/userAction";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useAlert} from "react-alert";

const Registering = () => {
  const [fname, setFname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [inputImg, setInputImg] = useState("");
  const router = useRouter();
  const alert = useAlert();

  const dispatch = useDispatch();
  const {error,success} = useSelector(state => state.newUser);
  console.log(error,success);

  //submit handler method ====================================
  const submitHandler = (e) => {
    e.preventDefault();
    const register_form = new FormData();
    register_form.set("fname", fname);
    register_form.set("lname", lname);
    register_form.set("email", email);
    register_form.set("password", password);
    register_form.set("confirmPass", confirmPass);
    register_form.set("image", inputImg);
    dispatch(createUserAction(register_form));
  };

  //file Upload ==============================================
  const fileUpload = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setInputImg(readerEvent.target.result);
    };
  };
  useEffect(() => {
    if(success){
      alert.show("Login with your email and password now")
      setTimeout(()=>{
        router.push("/login");
      },1000)
      
    }
    if(error){
      alert.error(error);
      dispatch({type:"CLEAR_ERROR"});
    }
  },[success,error])
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9]">
      <div className="p-10 w-full bg-white border sm:w-1/2 shadow-3xl">
        <div className="p-2 my-5">
          <h2 className="text-[22px] font-bold mb-[10px] leading-[1.2] hover:cursor-auto hover:text-[#081828] semi-heading">
            No Account? Register now
          </h2>
          <p className="mb-5">
            Registration takes less than a minute but it gives you full controll
            over your order{" "}
          </p>
        </div>
        <form
          action=""
          className="flex-wrap items-center sm:flex"
          onSubmit={submitHandler}
        >
          <div className="each-input">
            <label htmlFor="fname">First Name</label>
            <input
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
              }}
              className="text-input"
              type="text"
              required
            />
          </div>
          <div className="each-input">
            <label htmlFor="lname">Last Name</label>
            <input
              value={lname}
              onChange={(e) => {
                setlname(e.target.value);
              }}
              className="text-input"
              type="text"
              required
            />
          </div>
          <div className="each-input">
            <label htmlFor="email">Email Address</label>
            <input
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="text-input"
              type="email"
              required
            />
          </div>
          <div className="each-input">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="text-input"
              type="password"
              required
            />
          </div>
          <div className="each-input">
            <label htmlFor="confirmpass">Confirm Password</label>
            <input
              value={confirmPass}
              onChange={(e) => {
                setconfirmPass(e.target.value);
              }}
              className="text-input"
              type="password"
              required
            />
          </div>
          <div className="p-2 w-full">
            <div className="">
              <label className="basis-[200px]" htmlFor="img">
                Upload profile img:
              </label>
              <div>
                <div className="flex items-center">
                  {
                    inputImg && (
                      <img
                        src={inputImg}
                        alt="input image"
                        className="w-[60px] h-[60px] rounded-full mr-5"
                      />
                    )
                  }
                  <input
                    onChange={fileUpload}
                    className="text-transparent  file:p-1 file:w-full file:border-none file:bg-white file:text-[#081828] border"
                    accept="image/png, image/gif, image/jpeg"
                    type="file"
                    name="profile-img"
                    id="profile-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0167f3] text-white hover:bg-[#081828] w-full rounded-md m-2 transition-all duration-300 ease-linear">
            <input className="cursor-pointer" type="submit" value="Register" />
          </div>
        </form>
        <p className="my-2 text-center">
          Already have an account?{" "}
          <a className="text-[#0167f3]" href="/login">
            login now
          </a>
        </p>
      </div>
    </div>
  );
};
export default Registering;
