import Sidebar from "./Sidebar.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminAllUsers } from "../../redux/actions/adminAction.js";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.adminUsers);
  console.log(users);

  useEffect(() => {
    dispatch(adminAllUsers());
  }, []);
  return (
    <>
      <div className=" sm:w-[80%] sm:float-right">
        <h2 className="text-center big-heading">Users</h2>
        <div className="my-10 bg-white border shadow-3xl">
          <div className="justify-center px-10 py-3 capitalize md:flex">
            <div className="text-center basis-1/3 md:text-start">User Id</div>
            <div className="text-center basis-1/3 md:text-start">Name</div>
            <div className="text-center basis-1/3 md:text-start">role</div>
          </div>
          {users &&
            users.map((each, i) => {
              return (
                <div
                  key={i}
                  className="justify-center px-10 py-3 capitalize border-t md:flex"
                >
                  <div className="text-center basis-1/3 md:text-start">
                    {each._id}
                  </div>
                  <div className="text-center basis-1/3 md:text-start">
                    {each.fname + " " + each.lname}
                  </div>
                  <div className="text-center basis-1/3 md:text-start">
                    {each.role}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default AdminUsers;
