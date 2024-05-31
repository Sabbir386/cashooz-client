import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import SubMenu from "./SubMenu";
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { HiOutlineUsers } from "react-icons/hi";
import { CiBullhorn } from "react-icons/ci";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2";
import { verifyToken } from "../../utils/verifyToken";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const [user, setUser] = useState();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    if (token) {
      setUser(verifyToken(token));
    }
  }, [token]);

  let menulist;

  if (user?.role === "admin") {
    menulist = [
      {
        id: "admin-offers",
        name: "Offer's",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "admin-create-offer",
            path: "create-offer",
            name: "- Create New Offer",
          },
          {
            id: "admin-offer-list",
            path: "offer-list",
            name: "- All Offer List",
          },
        ],
      },
      {
        id: "admin-advertisers",
        name: "Advertiser's",
        icon: CiBullhorn,
        menus: [
          {
            id: "admin-create-advertiser",
            path: "create-advertiser",
            name: "- Create Advertiser",
          },
          {
            id: "admin-view-advertiser",
            path: "view-advertiser",
            name: "- All-Advertiser List",
          },
        ],
      },
      {
        id: "admin-users",
        name: "User's",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "admin-create-user",
            path: "create-user",
            name: "- Create User",
          },
          { id: "admin-view-user", path: "view-user", name: "- All-User List" },
        ],
      },
      {
        id: "admin-network",
        name: "Network",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "admin-create-network",
            path: "create-network",
            name: "- Create New Offer",
          },
          {
            id: "admin-view-network",
            path: "view-network",
            name: "- All Offer List",
          },
        ],
      },
      {
        id: "admin-category",
        name: "Category",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "admin-create-category",
            path: "create-category",
            name: "- Create New Offer",
          },
          {
            id: "admin-view-category",
            path: "view-category",
            name: "- All Offer List",
          },
        ],
      },
      {
        id: "admin-blogs",
        name: "Blog's",
        icon: HiOutlineUsers,
        menus: [
          { id: "admin-create-blog", path: "", name: "- Create New Offer" },
          { id: "admin-view-blog", path: "", name: "- All Offer List" },
        ],
      },
    ];
  } else if (user?.role === "user") {
    menulist = [
      {
        id: "user-offers",
        name: "Offer's",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "user-offer-list",
            path: "offer-list",
            name: "- All Offer List",
          },
        ],
      },
    ];
  } else if (user?.role === "advertiser") {
    menulist = [
      {
        id: "advertiser-offers",
        name: "Offer's",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "advertiser-offer-list",
            path: "offer-list",
            name: "- All Offer List",
          },
        ],
      },
    ];
  } else if (user?.role === "superAdmin") {
    menulist = [
      {
        id: "superadmin-offers",
        name: "Offer's",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "superadmin-create-offer",
            path: "create-offer",
            name: "- Create New Offer",
          },
          {
            id: "superadmin-offer-list",
            path: "offer-list",
            name: "- All Offer List",
          },
        ],
      },
      {
        id: "superadmin-admins",
        name: "Admin's",
        icon: BsPerson,
        menus: [
          {
            id: "superadmin-create-admin",
            path: "create-admin",
            name: "- Create Admin",
          },
          {
            id: "superadmin-view-admin",
            path: "view-admin",
            name: "- All-Admin List",
          },
        ],
      },
      {
        id: "superadmin-advertisers",
        name: "Advertiser's",
        icon: CiBullhorn,
        menus: [
          {
            id: "superadmin-create-advertiser",
            path: "create-advertiser",
            name: "- Create Advertiser",
          },
          {
            id: "superadmin-view-advertiser",
            path: "view-advertiser",
            name: "- All-Advertiser List",
          },
        ],
      },
      {
        id: "superadmin-users",
        name: "User's",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "superadmin-create-user",
            path: "create-user",
            name: "- Create User",
          },
          {
            id: "superadmin-view-user",
            path: "view-user",
            name: "- All-User List",
          },
        ],
      },
      {
        id: "superadmin-network",
        name: "Network",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "superadmin-create-network",
            path: "create-network",
            name: "- Create New Offer",
          },
          {
            id: "superadmin-view-network",
            path: "view-network",
            name: "- All Offer List",
          },
        ],
      },
      {
        id: "superadmin-category",
        name: "Category",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "superadmin-create-category",
            path: "create-category",
            name: "- Create New Offer",
          },
          {
            id: "superadmin-view-category",
            path: "view-category",
            name: "- All Offer List",
          },
        ],
      },
      {
        id: "superadmin-blogs",
        name: "Blog's",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "superadmin-create-blog",
            path: "",
            name: "- Create New Offer",
          },
          { id: "superadmin-view-blog", path: "", name: "- All Offer List" },
        ],
      },
    ];
  }

  const location = useLocation();

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
          <span className="text-xl whitespace-pre">CASHOOZ</span>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            <li>
              <Link
                to={"/dashboard"}
                className={`p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium ${
                  location.pathname === "/dashboard"
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                <AiOutlineAppstore size={23} className="min-w-max" />
                Dashboard
              </Link>
            </li>

            <li>
              {menulist?.map((menu) => (
                <div key={menu.id} className="flex flex-col gap-1">
                  <SubMenu data={menu} />
                </div>
              ))}
            </li>
            <li>
              <Link
                to={"/storage"}
                className={`p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium ${
                  location.pathname === "/storage"
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                <HiOutlineDatabase size={23} className="min-w-max" />
                Storage
              </Link>
            </li>

            <li>
              <Link
                to={"/settings"}
                className={`p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium ${
                  location.pathname === "/settings"
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                <SlSettings size={23} className="min-w-max" />
                Settings
              </Link>
            </li>
          </ul>
          <button
            onClick={setLogout}
            className="w-5/6 mx-auto my-3 rounded-md py-3 bg-red-400 text-center text-white cursor-pointer hover:bg-red-600 hover:-translate-y-2 duration-200 hover:shadow-lg"
          >
            Logout
          </button>
          {open && (
            <div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Cashooz</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
