import { useContext, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import belowButtonImg from "../assets/Group 2.png";
import nextHeaderImg from "../assets/Group 4.png";
import { UserContext } from "../UserContext";
import supabase from "../helper/supabaseClient"; 

const RecurringPage = () => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const handleClick = () => {
    navigate('/creation'); 
  };

  const [meetingData, setMeetingData] = useState({
    name: "",
    startTime: "9",
    endTime: "20",
    selectedDays: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({ ...meetingData, [name]: value });
  };

  const toggleDay = (day) => {
    setMeetingData((prev) => {
      const alreadySelected = prev.selectedDays.includes(day);
      return {
        ...prev,
        selectedDays: alreadySelected
          ? prev.selectedDays.filter(d => d !== day)
          : [...prev.selectedDays, day]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: meetingData.name,
      startTime: `${meetingData.startTime}:00:00 EST`,
      endTime: `${meetingData.endTime}:00:00 EST`,
      daysOfWeek: meetingData.selectedDays,
      userId: userId,
    };

    const { data, error } = await supabase
      .from("meetings")
      .insert([
        {
          name: requestBody.name,
          start_time: requestBody.startTime,
          end_time: requestBody.endTime,
          user_id: requestBody.userId,
          recurring: true,
          days_of_week: requestBody.daysOfWeek,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting meeting:", error);
      return;
    }
    console.log("Meeting created successfully:", data);
    navigate("/viewing/" + data.id);
  };

  return (
    <div className="lg:grid lg:grid-cols-[2fr_3fr] bg-[#F9D489]">
      <div className="hidden lg:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4672D3" className="size-16 m-8 cursor-pointer" onClick={handleClick}>
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
        </svg>
        <div className="flex flex-col text-center items-center">
          <div className="w-80 text-5xl font-bold text-black text-center mt-28 mb-24">Recurring meeting</div>
          <img src={belowButtonImg} className="w-80" />
        </div>
      </div>

      <div className="bg-[#79A2DC] w-full h-[93vh] flex flex-col gap-10 text-black p-8 lg:p-16">
        <div className="bg-[#FBFBFB] rounded-2xl lg:rounded-[60px] p-[8%] flex-1">
          <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
            <div>
              <div className="flex gap-4 items-center mb-6">
                <p className="text-3xl font-semibold">Create a new event</p>
                <img src={nextHeaderImg} alt="Logo" className="h-8 hidden lg:block" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Name your event..."
                className="border border-[#E8E9E7] rounded-sm border-2 bg-white text-lg px-3 py-2 lg:w-100"
                value={meetingData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-3xl font-semibold">What times might work?</label>
              <div className="flex gap-3 mt-6 items-center">
                <select
                  name="startTime"
                  className="border border-[#E8E9E7] rounded-sm border-2 bg-white text-md px-3 py-2 w-24"
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
                  className="border border-[#E8E9E7] rounded-sm border-2 bg-white text-md px-3 py-2 w-24"
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
              <label className="text-3xl font-semibold">What days work?</label>
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { label: "Sun", value: "Sunday" },
                  { label: "Mon", value: "Monday" },
                  { label: "Tue", value: "Tuesday" },
                  { label: "Wed", value: "Wednesday" },
                  { label: "Thu", value: "Thursday" },
                  { label: "Fri", value: "Friday" },
                  { label: "Sat", value: "Saturday" },
                ].map(({ label, value }) => {
                  const selected = meetingData.selectedDays.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleDay(value)}
                      className={`w-15 h-12 rounded-xl text-lg border-2 
                        ${selected ? 'bg-[#4672D3] text-white border-[#4672D3]' : 'bg-white text-black border-[#E8E9E7]'}
                        hover:scale-105 transition-transform`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="bg-[#4672D3] text-white ml-24 lg:ml-[45%] px-4 py-3 rounded-3xl text-xl w-30">
              Next {'>'} 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

RecurringPage.propTypes = {
  setChoicePage: PropTypes.func.isRequired,
};

export default RecurringPage;
