import Icon from '../assets/Group 5.png';
import PropTypes from 'prop-types';

const MeetingInfoPanel = ({ meeting, viewing, hoverInfo, priority, setPriority }) => {

  const handlePriorityToggle = () => {
    setPriority(!priority);
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="hidden lg:block text-5xl text-center mt-20 mb-8">{meeting.name}</h1>
      
      {viewing ? (
        <div className="mt-6 bg-white p-8 rounded-xl gap-5 w-full">
          {hoverInfo ? (
            <div className="flex justify-around">
              <div>
                <h2 className="text-lg font-bold mb-1">Available</h2>
                {hoverInfo.available.length > 0 && (
                  hoverInfo.available.map((person, idx) => (
                    <div key={idx} className="text-gray-700">{person}</div>
                  ))
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1">Maybe</h2>
                {hoverInfo.maybe.length > 0 && (
                  hoverInfo.maybe.map((person, idx) => (
                    <div key={idx} className="text-gray-700">{person}</div>
                  ))
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1">Unavailable</h2>
                {hoverInfo.unavailable.length > 0 && (
                  hoverInfo.unavailable.map((person, idx) => (
                    <div key={idx} className="text-gray-700">{person}</div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-lg text-gray-500 italic">
              <span className='hidden lg:inline'>Hover over</span><span className='lg:hidden'>Tap on</span> a time slot to see who is available.
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex flex-col space-x-4 bg-white p-8 rounded-xl gap-5">
          <span className="text-2xl">Priority/Non-Priority</span>
          <div className="flex items-center gap-4">
            {priority ? 
            <div className="w-8 h-8 border border-green-500 rounded"><div className='w-4 h-4 mx-auto bg-green-500 mt-[7px]'></div></div> : 
            <button className="w-8 h-8 bg-green-500 border border-green-500 rounded" onClick={handlePriorityToggle}></button>}
            <span className="text-2xl">Yes, I&apos;m Available</span>
          </div>
          <div className="flex items-center gap-4">
            {!priority ? 
            <div className="w-8 h-8 border border-red-500 rounded"><div className='w-4 h-4 mx-auto bg-red-500 mt-[7px]'></div></div> : 
            <button className="w-8 h-8 bg-red-500 border border-red-500 rounded" onClick={handlePriorityToggle}></button>}
            <span className="text-2xl">Only If Needed...</span>
          </div>
        </div>
      )}
      
      <img src={Icon} alt="" className="hidden lg:block w-50 mt-20"/>
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
    maybe: PropTypes.arrayOf(
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
  priority: PropTypes.bool.isRequired,
  setPriority: PropTypes.func.isRequired,
};

export default MeetingInfoPanel;