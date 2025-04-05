import Icon from '../assets/Group 5.png';
import PropTypes from 'prop-types';

const MeetingInfoPanel = ({ meeting, viewing, hoverInfo }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl text-center mt-20 mb-8">{meeting.name}</h1>
      
      {viewing ? (
        <div className="mt-6 bg-white p-8 rounded-xl gap-5 w-full">
          {hoverInfo ? (
            <div className="flex justify-around">
              <div>
                <h2 className="text-lg font-bold mb-1">Available</h2>
                {hoverInfo.available.length > 0 ? (
                  hoverInfo.available.map((person, idx) => (
                    <div key={idx} className="text-gray-700">{person.name}</div>
                  ))
                ) : (
                  <div className="text-gray-400 italic">No one available</div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1">Unavailable</h2>
                {hoverInfo.unavailable.length > 0 ? (
                  hoverInfo.unavailable.map((person, idx) => (
                    <div key={idx} className="text-gray-700">{person.name}</div>
                  ))
                ) : (
                  <div className="text-gray-400 italic">No one unavailable</div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-lg text-gray-500 italic">
              Hover over a time slot to see who is available.
            </div>
          )}
        </div>
      ) : (
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
      )}
      
      <img src={Icon} alt="" className="w-50 mt-20"/>
    </div>
  );
};

MeetingInfoPanel.propTypes = {
  meeting: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  viewing: PropTypes.bool.isRequired,
  hoverInfo: PropTypes.shape({
    available: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    unavailable: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default MeetingInfoPanel;