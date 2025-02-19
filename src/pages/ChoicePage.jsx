import { useState } from "react";
import RecurringPage from "./RecurringPage";
import SpecificPage from "./SpecificPage";


export default function ChoicePage() {
  const [onChoicePage, setChoicePage] = useState(true);
  const [isRecurring, setRecurring] = useState(true);

  return(
    <div>
    {onChoicePage 
      ? 
        <div className="bg-gray-900 w-full min-h-screen flex flex-col pt-48 gap-8 text-white text-center items-center">
          <div className="text-6xl font-bold">
            Are you looking <br />
            to create a
          </div>
          <button 
            className="bg-[#79A2DC] w-80 text-3xl py-6 rounded-full text-medium"
            onClick={() => {setChoicePage(false); setRecurring(true)}}
            >Recurring meeting</button>
          <div className="text-6xl font-bold">
            Or
          </div>
          <button 
            className="bg-[#79A2DC] w-80 text-3xl py-6 rounded-full text-medium"
            onClick={() => {setChoicePage(false); setRecurring(false)}}
            >Specific event</button>
        </div> 
      : (isRecurring ? <RecurringPage /> : <SpecificPage />)}
    </div>
  )
}