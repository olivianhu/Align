import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://culkknkvekdmbvovcllg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1bGtrbmt2ZWtkbWJ2b3ZjbGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NDI3NDAsImV4cCI6MjA1NTMxODc0MH0.VA_KC1t3z-S8F4SDs9y_1Rq2ImQA_-pEKTMswYYJM2E");

const ViewingPage = () => {
  // const { meetingId } = useParams(); // Get meeting ID from URL
  const meetingId = 2;
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
  const startTime = parseInt(meeting.startTime);
  const endTime = parseInt(meeting.endTime);
  // const startTime = 8;
  // const endTime = 9;
  const timeSlots = Array.from({ length: endTime - startTime + 1 }, (_, i) => startTime + i);

  // Generate dates from startDate to endDate
  const startDate = new Date(meeting.startDate);
  const endDate = new Date(meeting.endDate);
  // const startDate = "2025-03-01";
  // const endDate = "2025-03-03";
  const dateSlots = [];
  let currentDate = new Date(startDate);

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
    <div className="p-10 bg-[#A7C7E7] min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">{meeting.name}</h1>

      {/* Grid Table */}
      <div className="grid grid-cols-[100px_repeat(auto-fit,minmax(80px,1fr))] gap-2">
        
        {/* Header Row: Days */}
        <div></div> {/* Empty space for time column */}
        {dateSlots.map((date) => (
          <div key={date} className="text-center font-bold">{date.toDateString().slice(0, 3)}</div>
        ))}

        {/* Time Rows */}
        {timeSlots.map((time) => (
          <>
            <div className="text-right font-bold pr-2">{time % 12 || 12} {time < 12 ? "AM" : "PM"}</div>
            {dateSlots.map((date) => {
              const key = `${date.toISOString()}-${time}`;
              return (
                <div
                  key={key}
                  className={`w-16 h-16 border rounded cursor-pointer flex items-center justify-center ${
                    availability[key] ? "bg-green-500" : "bg-white"
                  }`}
                  onClick={() => toggleAvailability(date, time)}
                />
              );
            })}
          </>
        ))}
      </div>

      {/* Availability Legend */}
      <div className="mt-6 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 border rounded"></div>
          <span>Yes, I'm Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 border rounded"></div>
          <span>Not Selected</span>
        </div>
      </div>
    </div>
  );
};

const toggleAvailability = async (day, time) => {
  const key = `${day.toISOString()}-${time}`;
  const newStatus = !availability[key];

  setAvailability((prev) => ({
    ...prev,
    [key]: newStatus,
  }));

  // Save to Supabase
  await supabase.from("availability").upsert([
    {
      user_id: meeting.user,
      meeting_id: meeting.id,
      date: day.toISOString().split("T")[0],
      time: time,
      status: newStatus ? "available" : "unavailable",
    },
  ]);
};

export default ViewingPage;
