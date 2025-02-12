import { useState } from "react";

const CreationPage = () => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("23");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      startTime: `0${startTime}:00:00 EST`, 
      endTime:  `${endTime}:00:00 EST`, 
      dateRange: `[${startDate}, ${endDate}]`, // daterange
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
      } else {
        console.error("Failed to create meeting");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return(
    <div>
      <h1 className="text-xl font-bold mb-4">Meeting Creation</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
        <div>
          <label className="text-lg">Name: </label>
          <input
              type="text"
              placeholder="My Meeting"
              className="border border-gray-300 rounded-md text-sm px-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div>
          <label htmlFor="times">What times?</label>
          <div className="flex gap-2">
            <select
              name="start-time"
              id="start-time"
              className="border border-gray-300 rounded-md"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              {[...Array(24).keys()].map((hour) => (
                <option key={hour} value={hour}>
                  {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "a.m." : "p.m."}
                </option>
              ))}
            </select>
            to
            <select
              name="end-time"
              id="end-time"
              className="border border-gray-300 rounded-md"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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
              className="border border-gray-300 rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            to
            <input
              type="date"
              className="border border-gray-300 rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="text-white px-4 py-2 rounded-md w-44">
          Create Meeting
        </button>
      </form>
    </div>
  )
}

export default CreationPage;