import React from 'react'
import cardData from './CardData'
import ChallengeCard from './ChallengeCard'

const ParticipateChallange = () => {

  return (
    <div className='pb-20'>
      <h1 className='sm:max-w-[600px] text-[32px] sm:block flex flex-col gap-7 font-semibold font-poppins leading-5 text-center mx-auto pt-24'><span>Why Participate in </span><span className='text-[#44924C]'>AI Challenges?</span></h1>
      <div className='xlg:w-[1119px] mt-20 mx-auto grid  grid-cols-1 gap-9 xlg:gap-1 justify-items-center xlg:grid-flow-row xlg:grid-cols-2'>
      {
        cardData.map((ele, index)=>{
          const { iconSrc, title, description} = ele;
          return(
            
            <ChallengeCard iconSrc={iconSrc} title={title} description={description} key={index}/>
            
          )
        })
      }
    </div>
    </div>
  )
}

export default ParticipateChallange