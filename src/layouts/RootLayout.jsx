import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

function RootLayout() {

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-0 md:ml-[16rem] flex-1 mx-auto py-4 w-5 md:w-[100% - 16rem] bg-primaryColor px-3"><Outlet></Outlet></main>
    </div>
  );

}

export default RootLayout;
