// import Icon from '../assets/Group 5.png';
import PropTypes from 'prop-types';
import SignUpModal from './SignUpModal';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

const AvailabilityGrid = ({ 
  meeting, 
  viewing, 
  availability, 
  availabilityCounts, 
  setHoverInfo,
  toggleAvailability,
  handleSignUp,
  totalPeople
}) => {
  const [showModal, setShowModal] = useState(false);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (!viewing && !userId) {
      setShowModal(true);
    }
  }, [viewing, userId]);

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

  const getGradientColor = (count, maxCount) => {
    if (count === 0) return "white"; 
    const intensity = Math.min(1, count / maxCount);
    return `rgba(34, 197, 94, ${intensity})`;
  };

  const getSmallDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateString = date.toDateString();
    return <div className= "text-xs lg:text-lg"> {dateString.slice(0, 3)} <br /> {(months.indexOf(dateString.slice(4, 7)) - 1) + "/" + dateString.slice(8, 10)} </div>;
  }
  

  return (
    <div className="grid p-6 bg-[#E8F1FF] rounded-2xl"
      style={{
        gridTemplateColumns: `2fr repeat(${dateSlots.length}, 4fr)`
      }}
    >
      {/* Time Rows */}
      <div className='lg:mt-3'>
        {timeSlots.map((time) => (
          <div key={time} >
            <div className="text-[11px] lg:text-sm text-right pr-2 mt-[31px] lg:mt-7 mb-3 ">
              {time % 12 || 12} {time < 12 ? "am" : "pm"}
            </div>
          </div>
        ))}
      </div>
      
      <SignUpModal open={showModal} onSignUp={handleSignUp} />
      {dateSlots.map((date) => (
        <div key={date.toISOString()}>
          <div className="text-center">
            {getSmallDate(date)}
          </div>
          {timeSlots.map((time) => {
            const key = `${date.toISOString().split("T")[0]}-${time}`;
            let count = availabilityCounts[key] ? availabilityCounts[key]["available"].length || 0 : 0;
            count += availabilityCounts[key] ? availabilityCounts[key]["maybe"].length / 2 || 0 : 0;
            
            if (viewing) {
              return (
                <div
                  key={key}
                  className="w-full h-12 border cursor-pointer flex items-center justify-center relative"
                  style={{ 
                    backgroundColor: getGradientColor(count, totalPeople.length), 
                  }}
                  onMouseEnter={() => {
                    let available = [];
                    let maybe = [];
                    let unavailable = [];
                    if (!availabilityCounts[key]) {
                      available =  [];
                      maybe = [];
                      unavailable = totalPeople;
                    } else {
                      available =  availabilityCounts[key]['available'] || [];
                      maybe = availabilityCounts[key]['maybe'] || [];
                      unavailable = availabilityCounts[key]['unavailable'] || [];
                    }
                    setHoverInfo({ available, maybe, unavailable });
                  }}
                  onMouseLeave={() => setHoverInfo(null)}
               />
              );
            } else {
              const availabilityKey = `${date.toISOString()}-${time}:00:00-05`;
              return (
                <div
                  key={availabilityKey}
                  className={`w-full h-12 border cursor-pointer flex items-center justify-center ${
                    availability[availabilityKey] ? (availability[availabilityKey][0] ? (availability[availabilityKey][1] ? "bg-green-500" : "bg-red-500") : "bg-white") : "bg-white"
                  }`}
                  onClick={() => toggleAvailability(date, time)}
                />
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

AvailabilityGrid.propTypes = {
  meeting: PropTypes.shape({
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
  }).isRequired,
  viewing: PropTypes.bool.isRequired,
  availability: PropTypes.object.isRequired,
  availabilityCounts: PropTypes.object.isRequired,
  setHoverInfo: PropTypes.func.isRequired,
  toggleAvailability: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  totalPeople: PropTypes.array.isRequired,
};

export default AvailabilityGrid;