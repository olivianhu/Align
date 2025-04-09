import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";

export default function Layout() {
  return(
    <div 
      className="flex flex-col min-h-screen justify-between">
      <div className="py-4 px-10 bg-white">
        <Header />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}