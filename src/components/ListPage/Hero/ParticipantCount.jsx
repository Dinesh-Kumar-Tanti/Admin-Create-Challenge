import React from 'react'

const ParticipantCount = () => {
  return (
    <div className='h-[400px] lsm:h-[200px] bg-[#002A3B] font-inter text-white flex justify-center items-center'>
      <div className='lg:max-w-[1075px] lg:w-full lg:h-[55px] lg:justify-between flex flex-col lsm:flex-row lsm:justify-center lsm:gap-5 flex-wrap lg:mx-20 max-w-[500px] lsm:max-w-[600px] lsm:px-10 lg:flex-nowrap'>

        <div className='flex gap-5'>
            <img src="assets/icons/Group 1000002515.svg" alt="" />
            <div className='flex flex-col my-auto gap-2'>
                <h2 className='font-bold text-2xl leading-5'>100K+</h2>
                <p className='font-medium leading-5'>AI model submissions</p>
            </div>
        </div>
        <div className='w-[1px] h-[38px] bg-[#C4C4C4] invisible lg:visible'></div>
        <div className='flex gap-5'>
            <img src="assets/icons/Group 1000002516.svg" alt="" />
            <div className='flex flex-col my-auto gap-2'>
                <h2 className='font-bold text-2xl leading-5'>50K+</h2>
                <p className='font-medium leading-5'>Data Scientists</p>
            </div>
        </div>
        <div className='w-[1px] h-[38px] bg-[#C4C4C4] invisible lg:visible'></div>
        <div className='flex gap-5'>
            <img src="assets/icons/Group 1000002518.svg" alt="" />
            <div className='flex flex-col my-auto gap-2 h-'>
                <h2 className='font-bold text-2xl leading-5'>100+</h2>
                <p className='font-medium leading-5'>AI Challenges Hosted</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ParticipantCount
