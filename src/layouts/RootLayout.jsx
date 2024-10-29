import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaCommentsDollar,
  FaRegUser,
  FaUnlink,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import {
  logOut,
  setUser,
  useCurrentToken,
} from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Link } from "react-router-dom";
import { FaCommentDollar } from "react-icons/fa";
function RootLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState("bg-transparent");

  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    if (token) {
      setUser(verifyToken(token));
    }
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBgColor("bg-secondaryColor"); // Change color when scrolled
      } else {
        setBgColor("bg-transparent"); // Default color
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  let user;
  if (token) {
    user = verifyToken(token);
  }
  

  return (
    <div className="flex">
      <Sidebar />
      <main className="min-h-screen ml-0 md:ml-[16rem] flex-1 mx-auto py-4 w-5 md:w-[100% - 16rem] bg-primaryColor px-3 relative">
        <div className={`flex justify-end items-center space-x-4 fixed top-0 left-0 w-full h-16 px-4 z-[990] ${bgColor}`}>
          {/* Balance Display */}
          <div
            className="flex items-center space-x-2 p-2 rounded-md"
            style={{ backgroundColor: "#141523" }}
          >
            <FaCommentsDollar className="text-white w-5 h-5" />
            <span className="text-white">$0.46</span>
          </div>

          {/* Profile and Dropdown */}
          <div className="relative inline-block text-left">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              {/* Profile Image */}
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="https://i.ibb.co.com/5j1jKyC/images.png" // Replace with your profile image URL
                alt="Profile"
              />
              {/* Username */}
              <span className="text-white font-medium">
                {user ? user.name : "Sabbir"}
              </span>
              <FaAngleDown className="text-white" />
            </div>

            {/* Dropdown Menu */}
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
        <div className="min-h-screen mt-16">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
