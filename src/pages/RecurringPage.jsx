import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import belowButtonImg from "../assets/Group 2.png";
import nextHeaderImg from "../assets/Group 4.png";

const RecurringPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/creation'); 
  };

  const [meetingData, setMeetingData] = useState({
    name: "",
    startTime: "9",
    endTime: "20",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: `${meetingData.name}`,
      startTime: `${meetingData.startTime}:00:00 EST`, 
      endTime:  `${meetingData.endTime}:00:00 EST`, 
      startDate: `${meetingData.startDate}`, 
      endDate: `${meetingData.endDate}`,
      user: 1, // replace with user id
    };
    
    // console.log(requestBody);

    try {
      const response = await fetch("http://localhost:5000/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Meeting created successfully");
        const data = await response.json();
        navigate("/viewing/" + data.id);
      } else {
        console.error("Failed to create meeting");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return(
    <div className="grid grid-cols-[2fr_3fr] bg-[#F9D489]">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4672D3" className="size-16 m-8 cursor-pointer" onClick={handleClick}>
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
        </svg>
        <div className="flex flex-col text-center items-center">
          <div className="text-4xl font-bold pt-12 mb-16">
            Are you looking <br />
            to creating a 
          </div>
          <div className="bg-[#79A2DC] w-80 text-3xl py-6 rounded-full text-medium text-white text-center mb-24">Recurring meeting</div>
          <img src={belowButtonImg} className="w-80" />
        </div>
      </div>


      <div className="bg-[#79A2DC] w-full h-[92vh] flex flex-col gap-10 text-black p-16">
        <div className="bg-[#FBFBFB] rounded-[60px] p-[8%] flex-1">

          <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
            <div className="">
              <div className="flex gap-4 items-center mb-6">
                <p className="text-3xl font-semibold">Create a new event</p>
                <img src={nextHeaderImg} alt="Logo" className="h-8" />
              </div>
              <input
                  type="text"
                  name="name"
                  placeholder="Name your event..."
                  className="border border-[#E8E9E7] rounded-sm border-2 bg-white text-lg px-3 py-2 w-100"
                  value={meetingData.name}
                  onChange={handleChange}
                />
            </div>

            <div>
              <label className="text-3xl font-semibold">What times might work?</label>

              <div className="flex gap-3 mt-6 items-center">
                <select
                  name="startTime"
                  id="start-time"
                  className="border border-[#E8E9E7] rounded-sm border-2 bg-white text-md px-3 py-2 w-24"
                  style={{
                    webkitAppearance: 'none',
                    appearance: 'none',
                    mozAppearance: 'none',
                    backgroundImage: "url('https://www.svgrepo.com/show/80156/down-arrow.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "10px 10px",
                    backgroundPosition: "calc(100% - 10px)"
                  }}
                  value={meetingData.startTime}
                  onChange={handleChange}
                >
                  {[...Array(24).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "a.m." : "p.m."}
                    </option>
                  ))}
                </select>
                to
                <select
                  name="endTime"
                  id="end-time"
                  className="border border-[#E8E9E7] rounded-sm border-2 bg-white text-md px-3 py-2 w-24"
                  style={{
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    MozAppearance: 'none',
                    backgroundImage: "url('https://www.svgrepo.com/show/80156/down-arrow.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "10px 10px",
                    backgroundPosition: "calc(100% - 10px)"
                  }}
                  value={meetingData.endTime}
                  onChange={handleChange}
                >
                  {[...Array(24).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "a.m." : "p.m."}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-3xl font-semibold mb-6">What dates might work?</label>
              <div className="flex gap-3 mt-6 items-center">
                <input
                  type="date"
                  name="startDate"
                  className="border border-[#E8E9E7] rounded-sm border-2 bg-white text-md px-3 py-2 w-40"
                  value={meetingData.startDate}
                  onChange={handleChange}
                />
                to
                <input
                  type="date"
                  name="endDate"
                  className="border border-[#E8E9E7] rounded-sm border-2 bg-white text-md px-3 py-2 w-40"
                  value={meetingData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="bg-[#4672D3] text-white ml-[45%] px-4 py-3 rounded-3xl text-xl w-30"
              onClick={() => {navigate("/creation/viewing")}}>
              Next {'>'} 
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

RecurringPage.propTypes = {
  setChoicePage: PropTypes.func.isRequired, 
};

export default RecurringPage;