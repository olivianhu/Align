import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from '../helper/supabaseClient';
import { UserContext } from "../UserContext";
import AvailabilityGrid from "../components/AvailabilityGrid";
import MeetingInfoPanel from "../components/MeetingInfoPanel";
import ViewToggleSwitch from "../components/ViewToggleSwitch";
import FormControlLabel from '@mui/material/FormControlLabel';

const ViewingPage = () => {
  const { userId, setUserId } = useContext(UserContext);
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [availability, setAvailability] = useState({});
  const [viewing, setViewing] = useState(true);
  const [availabilityCounts, setAvailabilityCounts] = useState({});
  const [hoverInfo, setHoverInfo] = useState(null);
  const [userPriority, setPriority] = useState(true);
  const [totalPeople, setTotalPeople] = useState([]);

  const handleToggle = (event) => {
    setViewing(event.target.checked);
  };

  const toggleAvailability = async (day, time) => {
    const key = `${day.toISOString()}-${time}:00:00-05`;
    setAvailability((prev) => {
      let entry = [true, true];
      if (prev[key] == undefined) {
         return({
          ...prev,
          [key]: entry,
        })
      }
      if (prev[key][0] == true) entry[0] = false;
      if (!userPriority) entry[1] = false;

      return({
      ...prev,
      [key]: entry,
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
    // console.log("avail listing", availabilityData);

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
          priority: userPriority,
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
          available: availability[key] == undefined ? true : !(availability[key][0]),
          priority: userPriority,
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
        .select("date, start_time, available, priority")
        .eq("meeting_id", meetingId)
        .eq("user_id", userId);
  
      if (availabilityError) {
        console.error("Error fetching availabilities:", availabilityError);
        return;
      }
  
      const availabilityMap = {};
      availabilityData.forEach(({ date, start_time, available, priority }) => {
        const key = `${new Date(date).toISOString()}-${start_time}`;
        availabilityMap[key] = [available, priority];
      });
      // console.log(availabilityMap);
      setAvailability(availabilityMap);
    };

    const fetchAvailabilityCounts = async () => {
      // Fetch all availabilities for the meeting
      const { data: countData, error: countError } = await supabase
        .from("availability")
        .select("date, start_time, available, user_id, priority")
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

      setTotalPeople(Object.values(profileMap));
  
      const counts = {};
      const tempAvailability = {};

      countData.forEach(({ date, start_time, available, user_id, priority }) => {
        const key = `${date}-${parseInt(start_time.split(":")[0])}`;
        if (!tempAvailability[key]) tempAvailability[key] = {};
        tempAvailability[key][user_id] = { available, priority };
      });

      Object.entries(tempAvailability).forEach(([key, userAvailabilities]) => {
        counts[key] = {
          available: [],
          maybe: [],
          unavailable: [],
        };

        uniqueUserIds.forEach((userId) => {
          const name = profileMap[userId];
          const entry = userAvailabilities[userId];

          if (entry?.available && entry?.priority) {
            counts[key].available.push(name);
          } else if (entry?.available) {
            counts[key].maybe.push(name);
          } else {
            counts[key].unavailable.push(name);
          }
        });
      });
      setAvailabilityCounts(counts);
    }
  
    fetchMeetingData();
    if (userId && meetingId) {
      fetchAvailabilities();
    }
    fetchAvailabilityCounts();
  }, [meetingId, userId, availability]); 

  const handleSignUp = async (name, email, password) => {
    // Try to find user by email first
    const { data: existing, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .maybeSingle();
  
    if (fetchError) {
      console.error("Error checking existing user:", fetchError);
      return;
    }
  
    let user;
    if (existing) {
      user = existing;
    } else {
      const { data: registeredUser, error:registerError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (registerError) {
        console.error("Error signing up:", registerError);
        return;
      }
      user = registeredUser.user;

      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ id: user.id, name, email })
        .select()
        .single();
  
      if (insertError) {
        console.error("Error creating user:", insertError);
        return;
      }
    }
  
    setUserId(user.id);
  };  

  if (!meeting) return <p>Loading...</p>;

  return (
    <>
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
            setHoverInfo={setHoverInfo}
            toggleAvailability={toggleAvailability}
            onSignUp={handleSignUp}
            priority={userPriority}
            totalPeople={totalPeople}
          />
          
          <MeetingInfoPanel 
            meeting={meeting}
            viewing={viewing}
            hoverInfo={hoverInfo}
            priority={userPriority}
            setPriority={setPriority}
          />
        </div>
      </div>
    </>
  );
};

export default ViewingPage;