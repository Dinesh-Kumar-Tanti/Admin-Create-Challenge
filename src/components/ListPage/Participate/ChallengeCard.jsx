import React from 'react'

const ChallengeCard = ({iconSrc, title, description}) => {
  return (
    <div className='lg:mb-6 w-[300px] xxsm:w-[350px]  h-[280px]  sm:w-[542px] sm:h-[276px] flex justify-center rounded-[20px] bg-[#F8F9FD] font-poppins mx-10' >
        <div className='flex flex-col gap-2 w-[280px] sm:w-[471px]  m-auto '>
            <div className=''>
                <img src={iconSrc} alt="icon-img" />
            </div>
            <div className='font-bold text-2xl'>
                {title}
            </div>
            <div className='text-[#64607D] font-medium leading-6 tracking-tight'>
                {description}
            </div>
        </div>
    </div>
  )
}

export default ChallengeCard

