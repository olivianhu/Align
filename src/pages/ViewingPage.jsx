import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from '../helper/supabaseClient';
import Icon from '../assets/Group 5.png';
import { UserContext } from "../UserContext";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' height='20px' width='20px'>
  <path fill-rule='evenodd' d='M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z' clip-rule='evenodd'/>
  <path d='M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z'/>
</svg>`;

const ToggleSwitch = styled(Switch)(() => ({
  width: 80,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(4px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(43px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'white',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='20px' height='20px'><path fill-rule='evenodd' d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z' clip-rule='evenodd'/></svg>")`
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: 'white',
    borderRadius:  15,
  },
}));

const ViewingPage = () => {
  const { userId } = useContext(UserContext);
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [availability, setAvailability] = useState({});
  const [viewing, setViewing] = useState(false);
  const [availabilityCounts, setAvailabilityCounts] = useState({});

  const handleToggle = (event) => {
    setViewing(event.target.checked);
  };
  

  useEffect(() => {
    const fetchMeetingData = async () => {
      const { data: meetingData, error: meetingError } = await supabase
        .from("meetings")
        .select("*")
        .eq("id", meetingId)
        .single();

      if (meetingError) {
        console.error("Error fetching meeting:", meetingError);
        return;
      }

      setMeeting(meetingData);
    };

    const fetchAvailabilities = async () => {
      const { data: availabilityData, error: availabilityError } = await supabase
        .from("availability")
        .select("date, start_time, available")
        .eq("meeting_id", meetingId)
        .eq("user_id", userId);

      if (availabilityError) {
        console.error("Error fetching availabilities:", availabilityError);
        return;
      }

      const availabilityMap = {};
      availabilityData.forEach(({ date, start_time, available }) => {
        const key = `${new Date(date).toISOString()}-${start_time}`;
        availabilityMap[key] = available;
      });

      const { data: countData } = await supabase
        .from("availability")
        .select("date, start_time, available, user_id")
        .eq("meeting_id", meetingId)

      // console.log("countData", countData);
      const counts = {};
      countData.forEach(({ date, start_time, available, user_id }) => {
        const key = `${date}-${parseInt(start_time.split(":")[0])}`;
        const prev = counts[key];
        if (prev && available) {
          counts[key] = [...prev, user_id];
        } else {
          counts[key] = [user_id];
        }
      });

      setAvailability(availabilityMap);
      setAvailabilityCounts(counts);
    };

    fetchMeetingData();
    if (meetingId && userId) {
      fetchAvailabilities();
    }
  }, [meetingId, userId, availability]);

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
  const toggleAvailability = async (day, time) => {
    const key = `${day.toISOString()}-${time}:00:00-05`;
    setAvailability((prev) => {
      return({
      ...prev,
      [key]: prev[key] == undefined ? true : !prev[key],
    })});

    const { data: availabilityData, error: fetchError}  = await supabase
      .from("availability")
      .select("id")
      .eq("meeting_id", meetingId)
      .eq("date", day.toISOString().split("T")[0])
      .eq("start_time", `${time}:00:00 EST`)
      .eq("user_id", userId);

    if (fetchError) {
      console.error("Error fetching availabilities:", fetchError);
      return;
    }
    console.log("avail listing", availabilityData);

    // Save to Supabase
    if (availabilityData.length > 0) {
      const {error: postError} = await supabase.from("availability").upsert([
        {
          id: availabilityData[0].id,
          user_id: userId,
          meeting_id: meeting.id,
          date: day.toISOString().split("T")[0],
          start_time: `${time}:00:00 EST`,
          end_time: `${time+1}:00:00 EST`,
          available: availability[key] == undefined ? true : !availability[key],
        },
      ]);
  
      if (postError) {
        console.error("Error saving availability:", postError);
        return;
      }
    } else {
      console.log("No availability found, inserting new record");
      const {error: postError} = await supabase.from("availability").insert([
        {
          user_id: userId,
          meeting_id: meeting.id,
          date: day.toISOString().split("T")[0],
          start_time: `${time}:00:00 EST`,
          end_time: `${time+1}:00:00 EST`,
          available: availability[key] == undefined ? true : !availability[key],
        },
      ]);
  
      if (postError) {
        console.error("Error saving availability:", postError);
        return;
      }
    }
  };

  const getGradientColor = (count, maxCount) => {
    if (count === 0) return "white"; 
    const intensity = Math.min(1, count / maxCount); // Normalize to [0,1]
    const color = `rgba(34, 197, 94, ${intensity})`; // Green with opacity
    return color;
  };

  return (
    <div className="p-10 bg-[#A6C1ED] h-[92vh] text-center">
      <FormControlLabel
        control={<ToggleSwitch sx={{ m: 1 }} checked={viewing} onChange={handleToggle} defaultChecked />}
        label=""
        className="mb-4"
      />

      {viewing ? (
        // meeting overview
        <div className="grid grid-cols-[3fr_1fr] gap-10">
          {/* Grid Table */}
          <div className="grid grid-cols-[2fr_4fr_4fr_4fr_4fr_4fr_4fr_4fr_4fr] pt-6 px-4 bg-[#E8F1FF] rounded-2xl">
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
                  const key = `${date.toISOString().split("T")[0]}-${time}`;
                  const count = availabilityCounts[key] == undefined ? 0 : availabilityCounts[key].length;
                  return (
                    <div
                      key={key}
                      className="w-full h-12 border cursor-pointer flex items-center justify-center"
                      style={{backgroundColor: getGradientColor(count, 5)}} 
                    >
                      {count > 0 && <span className="text-black">{count}</span>}
                    </div>
                  );
                })}
              </div>
              ))}
          </div>
          
          <div className="flex flex-col items-center">
            <h1 className="text-5xl text-center mt-20 mb-8">{meeting.name}</h1>
            {/* Availability Legend */}
            <div className="mt-6 bg-white p-8 rounded-xl gap-5">
              <div className="flex justify-center gap-4">
                <div className="">
                  <span className="text-2xl">Available</span>
                </div>
                <div className="">
                  <span className="text-2xl">Maybe</span>
                </div>
                <div className="">
                  <span className="text-2xl">Unavailable</span>
                </div>
              </div>
            </div>
            <img src={Icon} alt="" className="w-50 mt-20"/>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[3fr_1fr] gap-10">
        {/* Grid Table */}
        <div className="grid grid-cols-[2fr_4fr_4fr_4fr_4fr_4fr_4fr_4fr_4fr] pt-6 px-4 bg-[#E8F1FF] rounded-2xl">
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
                const key = `${date.toISOString()}-${time}:00:00-05`;
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
      )}

      
    </div>
  );
};

export default ViewingPage;
