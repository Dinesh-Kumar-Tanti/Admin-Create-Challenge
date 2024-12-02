import React, { useContext, useEffect, useState } from 'react'
import { SearchAndFilterContext } from '../../../../context/SearchAndFilterContext'

const Pillsfilters = () => {

    const { filter, onEventTypeChanged , onLevelChanged } = useContext(SearchAndFilterContext)

    const [allFilters, setAllFilters] = useState([])

    function onRemoveFilter (label, type) {
if(type==="status"){
    onEventTypeChanged({target:{checked:false, value:label}})
}
else if(type==="level"){
    onLevelChanged({target:{checked:false, value:label}})
}
    }
    


      


    useEffect(() => {
        const statusFilters = filter.status.map((status) => (

            {
                label: status,
                type: "status"
            }

        ))

        const levelFilters = filter.level.map((level) => (
            {
                label: level,
                type: "level"
            }
        ))


        const mergedFilters = [
            
                ...statusFilters,
                ...levelFilters
            
        ]
     console.log(mergedFilters.length)
     setAllFilters(mergedFilters)

    }, [filter.status, filter.level])


    return (
        <div className='flex justify-center flex-wrap lg:flex-nowrap md:justify-start gap-5 mt-10 px-5 pb-14 sm:w-[600px] lg:w-full'>
            {
                allFilters.map((pill, i)=>(
                    <p key={i} className='h-10 rounded-[30px] capitalize px-5 text-sm leading-[14px] font-medium font-poppins bg-[#F8F9FD7D] text-white flex items-center gap-2' >{pill.label}<button onClick={()=>onRemoveFilter(pill.label,pill.type)}> <img className=' min-w-[14px] h-[14px] filter invert' src="/assets/icons/close.png" alt="close pill"/> </button></p> 
                ))
            }

        </div>
    )
}

export default Pillsfilters
