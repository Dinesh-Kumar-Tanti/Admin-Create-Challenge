import { useContext } from 'react';
import ExploreCard from '../ExploreCard/ExploreCard';
import { SearchAndFilterContext } from '../../../../context/SearchAndFilterContext';

export default function SearchResults() {
    const { filteredChallenges } = useContext(SearchAndFilterContext);
// console.log(filteredChallenges)
    return (
        
        <div className='bg-[#003145]'>            
        <div className='xlg:relative py-20 md:grid md:grid-cols-2 xlg:grid-cols-3 gap-10 md:max-w-[700px] xlg:max-w-[1170px] xlg:px-10 mx-auto '>
            {
                filteredChallenges.map(challenge => <ExploreCard {...challenge} key={challenge.id} />)
            }
             {
                !filteredChallenges?.length && <p className='xlg:absolute font-bold xlg:left-[443px] xlg:top-10 text-center text-3xl font-poppins text-white '>No events found.</p>
            }
        </div>
        </div>
    )
}