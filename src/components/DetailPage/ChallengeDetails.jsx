import React from 'react';
import useChallengeDetails from '../../hooks/UseChallengeDetails';
import { Link, useNavigate } from 'react-router-dom';

const ChallengeDetails = () => {
  const { challengeDetails } = useChallengeDetails();
  const navigate = useNavigate(); 

  // Helper function to format dates
  function formatEventDate(startDateString, endDateString) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const today = new Date();

    const day = (date) => date.getDate();
    const month = (date) => months[date.getMonth()];
    const year = (date) => date.getFullYear().toString().slice(-2); 

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; 
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const formattedStartDate = `${day(startDate)}${daySuffix(day(startDate))} ${month(startDate)}'${year(startDate)}`;
    const formattedEndDate = `${day(endDate)}${daySuffix(day(endDate))} ${month(endDate)}'${year(endDate)}`;

    if (today < startDate) {
      return `Starts on ${formattedStartDate}`;
    } else if (today >= startDate && today <= endDate) {
      return `Ends on ${formattedEndDate}`;
    } else if (today > endDate) {
      return `Ended on ${formattedEndDate}`;
    }
  }

  // Shortens description to a certain number of words
  function shortenSentence(sentence = '', wordLimit = 12) {
    if (typeof sentence !== 'string') {
      return '';
    }

    const words = sentence.split(' '); 
    if (words.length <= wordLimit) {
      return sentence;
    }

    const shortened = words.slice(0, wordLimit).join(' ');
    return `${shortened}...`;
  }

  // Function to delete the challenge
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this challenge?")) {
      // Get the current challenges from localStorage
      const challenges = JSON.parse(localStorage.getItem('challenge')) || [];

      // Filter out the challenge to be deleted
      const updatedChallenges = challenges.filter((challenge) => challenge.id !== challengeDetails.id);

      // Update localStorage with the new array
      localStorage.setItem('challenge', JSON.stringify(updatedChallenges));

      // Redirect the user back to the home page after deletion
      navigate('/'); // use navigate instead of history.push
      window.alert('Challenge deleted successfully!');
    }
  };

  return (
    <div>
      <div className='relative bg-[#003145] sm:min-h-[419px] min-h-[550px] font-inter lmd:px-32 lsm:px-20 px-10 pt-[6.5rem]'>
        <div className='max-w-[818px] sm:min-h-[240px] min-h-[380px] flex flex-col justify-between'>
          <div>
            
            <div className='lg:max-w-[300px] max-w-[300px] lg:h-[34px] h-[45px] rounded-[5px] bg-[#FFCE5C] flex justify-center items-center'>
              <p className='max-w-[371px] font-semibold text-sm leading-3 flex flex-col gap-2 lg:block'>
                {formatEventDate(challengeDetails?.startDate, challengeDetails?.endDate)}
              </p>
            </div>
            <span className='invisible sm:visible absolute right-16 lmd:right-32  top-[6.7rem] lg:top-[6.3rem]'>
              <Link to='/'>
                <button className='flex items-center gap-5 border-[2px] px-5 py-1 rounded-[10px] text-white text-xl hover:bg-[#02435d]'>
                  <img className='w-5 h-5 filter invert' src="/assets/icons/arrow.png" alt="" />Go Back
                </button>
              </Link>
            </span>
          </div>
          <h1 className='font-poppins font-semibold text-[40px] leading-[48px] text-white'>
            {challengeDetails?.name}
          </h1>
          <p className='text-white'>{shortenSentence(challengeDetails?.description)}</p>
          <button className='flex justify-center items-center gap-2 h-[34px] w-[102px] rounded-[5px] bg-[#F8F9FD] font-semibold text-sm leading-3 text-[#003145]'>
            <img src="/assets/icons/carbon_skill-level-basic.svg" alt="level-icon" /> {challengeDetails?.level}
          </button>
        </div>
      </div>
      <div className='lmd:px-32 lsm:pl-20 px-10 lsm:pr-10 h-[66px] flex justify-between items-center'>
        <span className='font-inter font-bold text-lg border-b-4 border-[#44924C] px-5 py-4'>Overview</span>
        <div className='flex gap-5'>
          <Link to={`/edit-challenge/${challengeDetails?.id}`}>
            <button className='w-[91px] h-[37px] rounded-[10px] bg-[#44924C] text-white font-poppins font-semibold text-center text-[14px] leading-[18px]'>
              Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className='w-[91px] h-[37px] rounded-[10px] border-[1.2px] border-[#DC1414] text-[#DC1414] font-poppins font-semibold text-center text-[14px] leading-[18px]'>
            Delete
          </button>
        </div>
      </div>
      <div className='lmd:px-32 lsm:px-20 px-10 lg:w-10/12 font-poppins font-medium text-lg text-[#64607D] my-12 flex flex-col gap-6'>
        {challengeDetails?.description}
      </div>
    </div>
  );
};

export default ChallengeDetails;
