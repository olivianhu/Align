import backgroundImg from '../assets/background.png';
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const checkUser = () => {
    if (!userId) {
      alert("Please log in to create a new event");
    } else {
      navigate("/creation");
    }
  };
  
  return(
    <div className="w-full flex flex-col gap-12 h-[93vh] lg:pt-60 lg:pl-160 pt-20 pl-10" 
      style={{
        backgroundImage: `url(${backgroundImg})`, 
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="text-white text-5xl lg:text-6xl text-left">
        Let’s find a time to <span className="text-[#5CC54A]">meet</span> ! <br/>
        Start building projects <br/>
        people remember.
      </div>
      
      <button
        onClick={() => checkUser()}
        className="bg-[#5CC54A] w-60 px-3 py-4 rounded-full text-center text-white text-xl hover:bg-[#32AF1C]"
      >
        Create a new event
      </button>
    </div>
  )
}