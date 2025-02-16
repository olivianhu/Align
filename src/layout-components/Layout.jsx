import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return(
    <div 
      className="flex flex-col min-h-screen justify-between">
      <div>
        <div className="py-4 px-10 bg-white">
          <Header />
        </div>
        <div className="w-full min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  )
}