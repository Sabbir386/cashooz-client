import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { FaAngleDown, FaRegUser, FaUnlink } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import {
  logOut,
  setUser,
  useCurrentToken,
} from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Link } from "react-router-dom";

function RootLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    if (token) {
      setUser(verifyToken(token));
    }
  }, [token]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const setLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logOut());
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-0 md:ml-[16rem] flex-1 mx-auto py-4 w-5 md:w-[100% - 16rem] bg-primaryColor px-3">
        <div className="flex justify-end">
          <div className="relative inline-block text-left">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="flex items-center justify-center">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your profile image URL
                  alt="Profile"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">John Doe</span>{" "}
                {/* Replace with the user's name */}
                <span className="text-gray-500 text-xs">
                  nilufa.yesmean@example.com
                </span>{" "}
                {/* Replace with the user's email */}
              </div>
              <FaAngleDown className="text-white" />
            </div>

            {isOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-cardBackground ring-1 ring-black ring-opacity-5 z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-2" role="none">
                  <Link
                    to="/dashboard/user-profile"
                    className="flex gap-4 items-center px-4 py-2 text-sm text-white hover:text-buttonBackground border-b-[0.5px] border-b-buttonBackground"
                    role="menuitem"
                  >
                    <FaRegUser />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={setLogout}
                    className="w-full flex gap-3 items-center mx-auto px-4 py-2 text-sm text-red-400 text-left cursor-pointer duration-200 "
                  >
                    <FaUnlink />

                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default RootLayout;
