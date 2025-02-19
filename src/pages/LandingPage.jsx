import { Link } from "react-router-dom";

export default function LandingPage() {
  return(
    <div className="bg-gray-900 w-full flex flex-col gap-12 h-screen pt-60 pl-160">
      <div className="text-white text-6xl text-left">
        Let’s find a time to <span className="text-[#5CC54A]">meet</span> ! <br/>
        Start building projects <br/>
        people remember.
      </div>
      <div className="bg-[#5CC54A] w-60 px-3 py-4 rounded-full text-center text-white text-xl">
        <Link to={"/creation"}>
          Create a new event
        </Link>
      </div>
    </div>
  )
}