import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { HiOutlineUsers } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import { CiBullhorn } from "react-icons/ci";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { useAppDispatch } from "../../redux/features/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const setLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

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

  const subMenusList = [
    {
      name: "Offer's",
      icon: HiOutlineUsers,
      // menus: ["- Create New Offer", "- All Offer List", "- Draft Offer List", "- Deleted Offer List", "- Completed Offer List", "- Non Completed Offer List", "- All Offer Trafic Report", "- Pending offer List", "- Approved Offer List", "- Rejected Offer List"],
      menus: [
        { path: "create-offer", name: "- Create New Offer" },
        { path: "offer-list", name: "- All Offer List" },
      ],
    },
    {
      name: "Admin's",
      icon: BsPerson,
      menus: [
        { path: "", name: "- Create New Offer" },
        { path: "", name: "- All Offer List" },
      ],
    },
    {
      name: "Advertiser's",
      icon: CiBullhorn,
      menus: [
        { path: "", name: "- Create New Offer" },
        { path: "", name: "- All Offer List" },
      ],
    },
    {
      name: "User's",
      icon: HiOutlineUsers,
      menus: [
        { path: "", name: "- Create New Offer" },
        { path: "", name: "- All Offer List" },
      ],
    },
    {
      name: "Network",
      icon: HiOutlineUsers,
      menus: [
        { path: "", name: "- Create New Offer" },
        { path: "", name: "- All Offer List" },
      ],
    },
    {
      name: "Category",
      icon: HiOutlineUsers,
      menus: [
        { path: "", name: "- Create New Offer" },
        { path: "", name: "- All Offer List" },
      ],
    },
    {
      name: "Blog's",
      icon: HiOutlineUsers,
      menus: [
        { path: "", name: "- Create New Offer" },
        { path: "", name: "- All Offer List" },
      ],
    },
  ];
  const location = useLocation();

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
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          {/* <img
            src="https://img.icons8.com/color/512/firebase.png"
            width={45}
            alt=""
          /> */}
          <span className="text-xl whitespace-pre">CASHOOZ</span>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
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
              {subMenusList?.map((menu) => (
                <div key={menu.name} className="flex flex-col gap-1">
                  <SubMenu data={menu} />
                </div>
              ))}
            </li>
            <li>
              <Link
                to={"/stroage"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
              >
                <HiOutlineDatabase size={23} className="min-w-max" />
                Stroage
              </Link>
            </li>

            <li>
              <Link to={"/settings"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Settings
              </Link>
            </li>
          </ul>
          <button
            onClick={setLogout}
            className="w-5/6 mx-auto my-3 rounded-md py-3 bg-red-400 text-center text-white cursor-pointer hover:bg-red-600 hover:-translate-y-2 duration-200 hover:shadow-lg"
          >
            logout
          </button>
          {open && (
            <>
              <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
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
            </>
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
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
