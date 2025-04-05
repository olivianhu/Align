// import Icon from '../assets/Group 5.png';
import PropTypes from 'prop-types';

const AvailabilityGrid = ({ 
  meeting, 
  viewing, 
  availability, 
  availabilityCounts, 
  allAvailability, 
  setHoverInfo,
  toggleAvailability
}) => {
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

  return (
    <div className="grid grid-cols-[2fr_4fr_4fr_4fr_4fr_4fr_4fr_4fr_4fr] pt-6 px-4 bg-[#E8F1FF] rounded-2xl">
      {/* Time Rows */}
      <div>
        {timeSlots.map((time) => (
          <div key={time}>
            <div className="text-right pr-2 mt-3 mb-7">
              {time % 12 || 12} {time < 12 ? "AM" : "PM"}
            </div>
          </div>
        ))}
      </div>
      
      {dateSlots.map((date) => (
        <div key={date.toISOString()}>
          <div className="text-center text-lg">
            {date.toDateString().slice(0, 10)}
          </div>
          {timeSlots.map((time) => {
            const key = `${date.toISOString().split("T")[0]}-${time}`;
            const count = availabilityCounts[key]?.length || 0;
            
            if (viewing) {
              return (
                <div
                  key={key}
                  className="w-full h-12 border cursor-pointer flex items-center justify-center relative"
                  style={{ 
                    backgroundColor: getGradientColor(count, Object.values(allAvailability).length) 
                  }}
                  onMouseEnter={() => {
                    const available = availabilityCounts[key] || [];
                    const allPeople = Object.values(allAvailability);
                    const unavailable = allPeople.filter(p => !available.some(a => a.name === p.name));
                    setHoverInfo({ available, unavailable });
                  }}
                  onMouseLeave={() => setHoverInfo(null)}
                >
                  {count > 0 && <span className="text-black">{count}</span>}
                </div>
              );
            } else {
              const availabilityKey = `${date.toISOString()}-${time}:00:00-05`;
              return (
                <div
                  key={availabilityKey}
                  className={`w-full h-12 border cursor-pointer flex items-center justify-center ${
                    availability[availabilityKey] ? "bg-green-500" : "bg-white"
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
  allAvailability: PropTypes.object.isRequired,
  setHoverInfo: PropTypes.func.isRequired,
  toggleAvailability: PropTypes.func.isRequired,
};

export default AvailabilityGrid;