import { useState } from "react";
import PropTypes from 'prop-types';

const RecurringPage = ( {setChoicePage} ) => {

  const [meetingData, setMeetingData] = useState({
    name: "",
    startTime: "9",
    endTime: "20",
    startDate: "",
    endDate: "",
  });

  const [createdMeeting, setCreatedMeeting] = useState(null);

  const handleChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: `${meetingData.name}`,
      startTime: `${meetingData.startTime}:00:00 EST`, 
      endTime:  `${meetingData.endTime}:00:00 EST`, 
      dateRange: `[${meetingData.startDate}, ${meetingData.endDate}]`, // daterange
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
        console.log(data);
        setCreatedMeeting(data);
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4672D3" className="size-16 m-8 cursor-pointer" onClick={() => setChoicePage(true)}>
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
        </svg>
        <div className="flex flex-col text-center items-center">
          <div className="text-4xl font-bold pt-12 mb-16">
            Are you looking <br />
            to creating a 
          </div>
          <div className="bg-[#79A2DC] w-80 text-3xl py-6 rounded-full text-medium text-white text-center mb-24">Recurring meeting</div>
          <img src="Group 2.png" className="w-80" />
        </div>
      </div>


      <div className="bg-[#79A2DC] w-full h-[92vh] flex flex-col gap-12 text-black p-16">
        <div className="bg-[#FBFBFB] rounded-4xl p-8 flex-1">
          {createdMeeting && (
            <div className="p-4 border border-green-500 rounded-md bg-green-100 my-4">
              <h2 className="text-lg font-semibold">Meeting Created!</h2>
              <p><strong>Name:</strong> {createdMeeting.name}</p>
              <p><strong>Time Range:</strong> {createdMeeting.start_time} to {createdMeeting.end_time}</p>
              <p><strong>Date Range:</strong> {createdMeeting.date_range}</p>
            </div>
          )}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="text-2xl font-semibold">Create a new event</label>
            <input
                type="text"
                name="name"
                placeholder="My Meeting"
                className="border border-gray-300 rounded-md text-sm px-1"
                value={meetingData.name}
                onChange={handleChange}
              />

            <div>
              <label htmlFor="times">What times?</label>
              <div className="flex gap-2">
                <select
                  name="startTime"
                  id="start-time"
                  className="border border-gray-300 rounded-md"
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
                  className="border border-gray-300 rounded-md"
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
              <label htmlFor="dates">What dates?</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="startDate"
                  className="border border-gray-300 rounded-md"
                  value={meetingData.startDate}
                  onChange={handleChange}
                />
                to
                <input
                  type="date"
                  name="endDate"
                  className="border border-gray-300 rounded-md"
                  value={meetingData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="text-white px-4 py-2 rounded-md w-44">
              Create Meeting
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