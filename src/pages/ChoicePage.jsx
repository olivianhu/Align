import { useNavigate } from "react-router-dom";
import backgroundImg from '../assets/background.png';

export default function ChoicePage() {
  const navigate = useNavigate();

  return(
    <div className="w-full h-[93vh] flex flex-col pt-48 gap-8 text-center items-center bg-[#79A2DC]">
      <div className="text-5xl lg:text-6xl font-bold text-white">
        Are you looking <br />
        to create a
      </div>
      <button 
        className="bg-[#4672D3] w-80 text-3xl py-6 rounded-full text-medium hover:bg-[#F5BDBC] text-white"
        onClick={() => {navigate("/creation/recurring")}}
        >Recurring meeting</button>
      <div className="text-5xl lg:text-6xl font-bold text-white">
        Or
      </div>
      <button 
        className="bg-[#4672D3] w-80 text-3xl py-6 rounded-full text-medium hover:bg-[#F5BDBC] text-white"
        onClick={() => {navigate("/creation/specific")}}
        >Specific event</button>
    </div> 
  )
}