import { Link } from "react-router-dom";
import icon from "../assets/nav-icon.svg";

export default function Header() {
  return(
    <header className='flex justify-between items-center'>
      {/*logo*/}
      <Link to={'/'} className="flex items-center gap-2 text-primary">
        <span className='font-medium text-3xl hover:underline'>Align</span>
        <img src={icon} className="h-12"/>
      </Link>

      <div className="flex gap-3">
        <Link to={'/login'}>
          <button className="rounded-full bg-black text-white py-2 px-4 hover:bg-[#F8EA5C] hover:text-black">Sign In</button>
        </Link>
      </div>
    </header>
  )
}