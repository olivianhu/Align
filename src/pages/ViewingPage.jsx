import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from '../helper/supabaseClient';
import { UserContext } from "../UserContext";
import AvailabilityGrid from "./AvailabilityGrid";
import MeetingInfoPanel from "./MeetingInfoPanel";
import ViewToggleSwitch from "./ViewToggleSwitch";
import FormControlLabel from '@mui/material/FormControlLabel';

const ViewingPage = () => {
  const { userId } = useContext(UserContext);
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [availability, setAvailability] = useState({});
  const [viewing, setViewing] = useState(false);
  const [availabilityCounts, setAvailabilityCounts] = useState({});
  const [hoverInfo, setHoverInfo] = useState(null);
  const [allAvailability, setAllAvailability] = useState({});

  const handleToggle = (event) => {
    setViewing(event.target.checked);
  };

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
      // Fetch this user's availability
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
  
      // Fetch all availabilities for the meeting
      const { data: countData, error: countError } = await supabase
        .from("availability")
        .select("date, start_time, available, user_id")
        .eq("meeting_id", meetingId);
  
      if (countError) {
        console.error("Error fetching availability counts:", countError);
        return;
      }
  
      // Get all unique user IDs
      const uniqueUserIds = [...new Set(countData.map(d => d.user_id))];
  
      // Batch-fetch all profile names
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, name")
        .in("id", uniqueUserIds);
  
      if (profileError) {
        console.error("Error fetching profiles:", profileError);
        return;
      }
  
      const profileMap = {};
      profileData.forEach(p => {
        profileMap[p.id] = p.name;
      });
  
      const counts = {};
      const all = {};
  
      countData.forEach(({ date, start_time, available, user_id }) => {
        const key = `${date}-${parseInt(start_time.split(":")[0])}`;
        const name = profileMap[user_id];
  
        if (!name) return;
  
        if (!counts[key]) counts[key] = [];
        if (available) counts[key].push({ name });
  
        all[name] = { name, available }; 
      });
  
      setAvailability(availabilityMap);
      setAvailabilityCounts(counts);
      setAllAvailability(all);
    };
  
    fetchMeetingData();
    if (meetingId && userId) {
      fetchAvailabilities();
    }
  }, [meetingId, userId, availability]); 

  if (!meeting) return <p>Loading...</p>;

  return (
    <div className="p-10 bg-[#A6C1ED] h-[92vh] text-center">
      <FormControlLabel
        control={<ViewToggleSwitch checked={viewing} onChange={handleToggle} />}
        label=""
        className="mb-4"
      />

      <div className="grid grid-cols-[3fr_1fr] gap-10">
        <AvailabilityGrid
          meeting={meeting}
          viewing={viewing}
          availability={availability}
          availabilityCounts={availabilityCounts}
          allAvailability={allAvailability}
          setHoverInfo={setHoverInfo}
          toggleAvailability={toggleAvailability}
        />
        
        <MeetingInfoPanel 
          meeting={meeting}
          viewing={viewing}
          hoverInfo={hoverInfo}
        />
      </div>
    </div>
  );
};

export default ViewingPage;