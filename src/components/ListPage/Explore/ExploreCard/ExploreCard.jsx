import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { timeLeft, formatEventDate } from "../../../../utils/dateUtils";


const ExploreCard = ({
  id,
  name,
  description,
  image,
  startDate,
  endDate,
  level,
  status,
}) => {
  const isActive = status === 'active';
  const isUpcoming = status === 'upcoming';
  const isPast = status === 'past'; // Adding a check for past events

  // Use the correct date for time calculation
  const initialTimeDiff = timeLeft(isUpcoming ? startDate : endDate);
  const [timeDiff, setTimeDiff] = useState(initialTimeDiff);
  const intervalId = useRef(null);

  useEffect(() => {
    // Update the timer every second
    intervalId.current = setInterval(() => {
      setTimeDiff(timeLeft(isUpcoming ? startDate : endDate));
    }, 1000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [startDate, endDate, isUpcoming]);


  const getBackgroundColor = () => {
    if (isActive) return 'bg-[#44924C3D] text-[#44924C] ' 
    if (isUpcoming) return 'bg-[#F2C94C40] text-[#666666]' 
    if (isPast) return 'bg-[#FF3C002B] text-[#666666]'; 
  };

  return (
    <div className='w-[300px] xxsm:w-[345px] h-[500px] md:w-[330px] font-poppins rounded-[15px] bg-white mx-auto mb-10'>
      {image && (
        <img
          className="w-full h-[174px] object-cover rounded-t-[8px]"
          src={`data:image/png;base64, ${image}`}
          alt=""
        />
      )}

      <div className='w-[246px] h-[247px] flex flex-col justify-between items-center mx-auto mt-6'>
        <div className={`capitalize font-inter text-xs leading-4 text-center font-normal rounded-[5px] w-20 px-3 py-1 ${getBackgroundColor()}`}>
          {status}
        </div>
        <h3 className='text-center capitalize font-semibold text-base leading-[26px]'>{name}</h3>

        {/* Dynamic text based on event status */}
        <p className='text-[#444444] font-medium leading-[14px] text-sm'>
          {isUpcoming
            ? 'Starts in'
            : isActive
            ? 'Ends in'
            : `Ended on`}
        </p>

        {/* Dynamic time or date display */}
        {(isUpcoming || isActive) ? (
          <div>
            <div className='flex flex-col gap-1 w-[126px]'>
              <div className='font-semibold flex justify-between text-lg'>
                <span>{timeDiff.days}</span> : <span>{timeDiff.hours}</span> : <span>{timeDiff.minutes}</span>
              </div>
              <div className='font-medium text-[10px] leading-[10px] flex justify-between'>
                <span>Days</span><span>Hours</span><span>Mins</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className='font-semibold text-lg'>{formatEventDate(new Date(endDate))}</div>
          </div>
        )}

        <NavLink
          to={`details/${id}`}
          className='text-white font-semibold text-sm leading-[18px] text-center w-[182px] h-[42px] bg-[#44924C] rounded-[10px] flex items-center justify-center'
        >
          <span>✓</span>&nbsp;&nbsp;Participate Now
        </NavLink>
      </div>
    </div>
  );
};

export default ExploreCard;



