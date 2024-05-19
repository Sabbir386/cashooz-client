import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

function RootLayout() {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <main className="mr-5 flex-1 mx-auto py-4"><Outlet></Outlet></main>
    </div>
  );
}

export default RootLayout;
