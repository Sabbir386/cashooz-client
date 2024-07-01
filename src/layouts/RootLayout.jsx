import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

function RootLayout() {

  return (
    <div className="flex gap-5">
      <Sidebar />
      <main className="mr-5 flex-1 mx-auto py-4 w-5 md:w-[100% - 16rem]"><Outlet></Outlet></main>
    </div>
  );
}

export default RootLayout;
