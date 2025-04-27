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
    const key = meeting.recurring ? `${day}-${time}` : `${day.toISOString().split("T")[0]}-${time}`;
    setAvailability((prev) => {
      let entry = [true, true];
      if (prev[key] == undefined) {
        return ({
          ...prev,
          [key]: entry,
        });
      }
      if (prev[key][0] === true) entry[0] = false;
      if (!userPriority) entry[1] = false;

      return ({
        ...prev,
        [key]: entry,
      });
    });
    console.log("Availability toggled:", availability);

    const table = meeting.recurring ? "recurring-availability" : "specific-availability";

    const { data: availabilityData, error: fetchError } = await supabase
      .from(table)
      .select("id")
      .eq("meeting_id", meetingId)
      .eq(meeting.recurring ? "day" : "date", meeting.recurring ? day : day.toISOString().split("T")[0])
      .eq("start_time", `${time}:00:00 EST`)
      .eq("user_id", userId);

    if (fetchError) {
      console.error("Error fetching availabilities:", fetchError);
      return;
    }
    console.log("Availability data:", availabilityData);

    const postData = {
      user_id: userId,
      meeting_id: meeting.id,
      [meeting.recurring ? "day" : "date"]: meeting.recurring ? day : day.toISOString().split("T")[0],
      start_time: `${time}:00:00 EST`,
      end_time: `${time + 1}:00:00 EST`,
      available: availability[key] == undefined ? true : !(availability[key][0]),
      priority: userPriority,
    };

    let postError;
    if (availabilityData.length > 0) {
      const result = await supabase.from(table).upsert([
        { id: availabilityData[0].id, ...postData }
      ]);
      postError = result.error;
    } else {
      const result = await supabase.from(table).insert([postData]);
      postError = result.error;
    }

    if (postError) {
      console.error("Error saving availability:", postError);
      return;
    }
    console.log("Availability saved successfully"); 
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

      meetingData.days_of_week = JSON.parse(meetingData.days_of_week);
      setMeeting(meetingData);
    };

    fetchMeetingData();
  }, [meetingId]);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      if (!meeting || !userId) return;

      const table = meeting.recurring ? "recurring-availability" : "specific-availability";
      const column = meeting.recurring ? "day" : "date";
      const values = meeting.recurring ? meeting.days_of_week : undefined;

      let query = supabase
        .from(table)
        .select(`${column}, start_time, available, priority`)
        .eq("meeting_id", meetingId)
        .eq("user_id", userId);

      if (meeting.recurring && values && values.length > 0) {
        query = query.in(column, values);
      }

      const result = await query;

      if (result.error) {
        console.error("Error fetching availabilities:", result.error);
        return;
      }

      const availabilityMap = {};
      result.data.forEach(entry => {
        const key = `${entry[column]}-${entry.start_time.split(":")[0]}`;
        availabilityMap[key] = [entry.available, entry.priority];
      });

      // console.log("Availability map:", availabilityMap);
      setAvailability(availabilityMap);
    };

    const fetchAvailabilityCounts = async () => {
      if (!meeting) return;

      const table = meeting.recurring ? "recurring-availability" : "specific-availability";
      const column = meeting.recurring ? "day" : "date";
      const values = meeting.recurring ? meeting.days_of_week : undefined;

      let countQuery = supabase
        .from(table)
        .select(`${column}, start_time, available, user_id, priority`)
        .eq("meeting_id", meetingId);

      if (meeting.recurring && values && values.length > 0) {
        countQuery = countQuery.in(column, values);
      }

      const result = await countQuery;

      if (result.error) {
        console.error("Error fetching availability counts:", result.error);
        return;
      }

      const countData = result.data;
      const uniqueUserIds = [...new Set(countData.map(d => d.user_id))];
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, name")
        .in("id", uniqueUserIds);

      if (profileError) {
        console.error("Error fetching profiles:", profileError);
        return;
      }

      const profileMap = {};
      profileData.forEach(p => { profileMap[p.id] = p.name });
      setTotalPeople(Object.values(profileMap));

      const counts = {};
      const tempAvailability = {};

      countData.forEach(entry => {
        const key = `${entry[column]}-${parseInt(entry.start_time.split(":"))}`;
        if (!tempAvailability[key]) tempAvailability[key] = {};
        tempAvailability[key][entry.user_id] = { available: entry.available, priority: entry.priority };
      });

      Object.entries(tempAvailability).forEach(([key, userAvailabilities]) => {
        counts[key] = { available: [], maybe: [], unavailable: [] };
        uniqueUserIds.forEach(userId => {
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
      // console.log("Counts:", counts);
      setAvailabilityCounts(counts);
    };

    fetchAvailabilities();
    // console.log("Availability:", availability);
    fetchAvailabilityCounts();
  }, [meeting, userId, availability, availabilityCounts]);

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
    <div className="p-4 lg:p-10 bg-[#A6C1ED] min-h-screen text-center">
      <h1 className="lg:hidden text-4xl text-center mt-8 mb-4">{meeting.name}</h1>
      <FormControlLabel
        control={<ViewToggleSwitch checked={viewing} onChange={handleToggle} />}
        label=""
        className="mb-4"
      />

      <div className="lg:grid lg:grid-cols-[3fr_1fr] gap-10">
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
  );
};

export default ViewingPage;



