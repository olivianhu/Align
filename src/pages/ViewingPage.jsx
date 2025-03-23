import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from '../helper/supabaseClient';
import Icon from '../assets/Group 5.png';

const ViewingPage = () => {
  const { meetingId } = useParams(); // Get meeting ID from URL
  const [meeting, setMeeting] = useState(null);
  const [availability, setAvailability] = useState({});
  
  // Fetch meeting data from Supabase
  useEffect(() => {
    const fetchMeeting = async () => {
      const { data, error } = await supabase
        .from("meetings")
        .select("*")
        .eq("id", meetingId)
        .single();

      if (error) {
        console.error("Error fetching meeting:", error);
        return;
      }

      setMeeting(data);
    };

    fetchMeeting();
  }, [meetingId]);

  if (!meeting) return <p>Loading...</p>;

  // Generate time slots from startTime to endTime
  const startTime = parseInt(meeting.start_time);
  const endTime = parseInt(meeting.end_time);
  const timeSlots = Array.from({ length: endTime - startTime + 1 }, (_, i) => startTime + i);

  // Generate dates from startDate to endDate
  const startDate = new Date(meeting.start_date);
  startDate.setDate(startDate.getDate() + 1);
  const endDate = new Date(meeting.end_date);
  endDate.setDate(endDate.getDate() + 1);

  const dateSlots = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dateSlots.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Handle cell click to toggle availability
  const toggleAvailability = (day, time) => {
    const key = `${day.toISOString()}-${time}`;
    setAvailability((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-10 bg-[#A6C1ED] h-[92vh] grid grid-cols-[3fr_1fr] gap-10">
      {/* Grid Table */}
      <div className="grid grid-cols-[2fr_4fr_4fr_4fr_4fr_4fr_4fr_4fr_4fr] p-12 bg-[#E8F1FF] rounded-2xl h-80%">
        {/* Time Rows */}
        <div>
          {timeSlots.map((time) => (
            <div key={time}>
              <div className="text-right pr-2 mt-3 mb-7">{time % 12 || 12} {time < 12 ? "AM" : "PM"}</div>
            </div>
          ))}
        </div>
        {dateSlots.map((date) => (
          <div key={date.toISOString()}>
            <div className="text-center text-lg">{date.toDateString().slice(0, 10)}</div>
            {timeSlots.map((time) => {
              const key = `${date.toISOString()}-${time}`;
              return(
              <div
                key={key}
                className={`w-full h-12 border cursor-pointer flex items-center justify-center ${
                  availability[key] ? "bg-green-500" : "bg-white"
                }`}
                onClick={() => toggleAvailability(date, time)}
              />)
            })}
          </div>
          ))}
      </div>
      
      <div className="flex flex-col items-center">
        <h1 className="text-5xl text-center mt-20 mb-8">{meeting.name}</h1>
        {/* Availability Legend */}
        <div className="mt-6 flex flex-col space-x-4 bg-white p-8 rounded-xl gap-5">
          <span className="text-2xl">Priority/Non-Priority</span>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-green-500 border rounded"></div>
            <span className="text-2xl">Yes, I&apos;m Available</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-red-500 border rounded"></div>
            <span className="text-2xl">Only If Needed...</span>
          </div>
        </div>
        <img src={Icon} alt="" className="w-50 mt-20"/>
      </div>
    </div>
  );
};

// const toggleAvailability = async (day, time) => {
//   const key = `${day.toISOString()}-${time}`;
//   const newStatus = !availability[key];

//   setAvailability((prev) => ({
//     ...prev,
//     [key]: newStatus,
//   }));

//   // Save to Supabase
//   await supabase.from("availability").upsert([
//     {
//       user_id: meeting.user,
//       meeting_id: meeting.id,
//       date: day.toISOString().split("T")[0],
//       time: time,
//       status: newStatus ? "available" : "unavailable",
//     },
//   ]);
// };

export default ViewingPage;
