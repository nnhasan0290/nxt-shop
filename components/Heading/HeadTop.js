import { InboxIcon } from "@heroicons/react/outline";
import Link from "next/link";
import {useSelector,useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadUser,logoutUser} from "../../redux/actions/userAction.js"
import {useAlert} from "react-alert";

const HeadTop = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
    const { isAuthenticated, user} = useSelector(
    (state) => state.loadUser
  );
    const isLoggedOut = useSelector(state => state.logoutUser);

  useEffect(()=>{
   dispatch(loadUser());
   if(isLoggedOut.success){
     alert.show(isLoggedOut.message);
     dispatch({type:"CLEAR_LOGGED_MESSAGE"});
   }
  },[isLoggedOut])
  return (
    <div className="px-10 border bg-[#081828] text-white py-4 flex items-center justify-between">
      <div className="hidden items-center space-x-2 md:flex basis-1/3">
        <InboxIcon className="h-6" />
        <p className="text-small">nazmulhasan0290@gmail.com</p>
      </div>
      <div className="hidden space-x-3 sm:flex basis-1/3">
        <Link href={"/"}>Home</Link>
        <Link href="mailto: nazmulhasan0290@gmail.com">Contact Me</Link>
      </div>
      <div className="flex justify-center items-center space-x-3 w-full sm:basis-1/3">
        <p>Hello</p>
        {isAuthenticated ? (
          <>
          <p> {user?.fname}</p>
          <button onClick={()=> dispatch(logoutUser())} className="bg-[#0167f3] hover:bg-[#081828] transition duration-300 text-white p-2 rounded-md">
                     Log Out
                  </button>
          </>
          ): (
          <>
          <div className="pr-3 border-r">
         <Link href={"/login"}>SignIn</Link>
        </div>

         <div>
           <Link href={"/register"}>Register</Link>
         </div>
         </>
        
          )}
        
      </div>
    </div>
  );
};
export default HeadTop;
