import React from 'react'
import { Link } from 'react-router-dom'
const Hero = () => {
    return (
        <div className='bg-[#003145] text-[#FFFFFF]  pb-20 pt-14 xlg:pt-32 flex flex-col-reverse xlg:flex-row xlg:justify-between'>
            <div className='flex gap-5 pr-10 xlg:pr-0 pl-10 sm:pl-24 lg:pl-36 md:w-[705px]'>
                <div>
                    <div className='w-[8px] h-[116px] bg-[#FFCE5C]'></div>
                </div>
                <div className='flex flex-col gap-14 md:w-[643px] '>
                    <h1 className='text-4xl font-semibold font-poppins w-full xsm:text-5xl sm:text-6xl md:w-[643px] md:h-[112px] md:text-5xl leading-[56px] '>Accelerate Innovation with Global AI Challenges</h1>
                    <p className='font-medium font-poppins text-[#ECECEC] xsm:text-lg sm:text-xl md:w-[531px] md:text-lg leading-7'>AI Challenges that simulate real-world problems. This is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.</p>
                    <Link to='create-challenge'><button className='w-[180px] xsm:w-[198px] h-[40px] xsm:h-[47px] rounded-[10px] leading-[18px] text-center font-semibold font-poppins bg-white hover:bg-slate-200 text-[#003145] xsm:text-lg'>Create Challenge</button>
                    </Link>
                </div>
            </div>
            <div className=" w-full flex justify-center mb-10 xlg:mb-0 xlg:block xlg:w-auto  lg:mr-5 xl:mr-40">
                <img src="assets/icons/rocket-imgg.png" alt="hero-image-rocket" />
                {/* <img src="assets/icons/PicsArt_04-14-04.42 1.svg" alt="hero-image-rocket" /> */}
            </div>
        </div>
    )
}

export default Hero
