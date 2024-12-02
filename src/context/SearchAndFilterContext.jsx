import { createContext, useEffect, useState } from 'react'
import { getAllChallenges } from '../utils/dataStore'
import { EVENT_TYPE, LEVEL_TYPE, SORT_FILTERS } from '../constants/filters';

export const SearchAndFilterContext = createContext();

export const SearchandFilterProvider = ({ children }) => {
    
  const [allChallenges, setAllChallenges] = useState([])
  const [filteredChallenges, setFilteredChallenges] = useState([]) 


  const [filter, setFilters] = useState({
    search: '',
    status: [],
    level: [],
    sortBy: SORT_FILTERS[0],
  });

  useEffect(() => {
    setAllChallenges(getAllChallenges());
  }, []);

  useEffect(() => {
    setFilteredChallenges(allChallenges);
  }, [allChallenges]);

  useEffect(() => {

    // will run everytime filter is changed
    let challengesCopy = [...allChallenges];
    challengesCopy = challengesCopy.filter(challenge => challenge?.name?.toLowerCase?.()?.includes?.(filter?.search?.toLowerCase?.()));
    challengesCopy.sort((a, b) => {
        let keyName = '';
        let filterConfig = [];
        if(filter.sortBy === 'level') {
            keyName = 'level';
            filterConfig = LEVEL_TYPE;
        } else if (filter.sortBy === 'date') {
            keyName = 'status';
            filterConfig = EVENT_TYPE;
        }
        // export const LEVEL_TYPE = ['easy', 'medium', 'hard'];

        return filterConfig.indexOf(a[keyName]?.toLowerCase?.()) - filterConfig.indexOf(b[keyName]?.toLowerCase?.());
    });

    if(filter.status.length) {
        challengesCopy = challengesCopy.filter(challenge => filter.status.includes(challenge.status));
    }
    if(filter.level.length) {
        challengesCopy = challengesCopy.filter(challenge => filter.level.includes(challenge.level.toLowerCase()));
    }

    setFilteredChallenges(challengesCopy);
  }, [filter, allChallenges]);

  function onSearchChange(e) {
    setFilters((oldFilter) => ({
      ...oldFilter,
      search: e.target.value,
    }));
  }

  function onEventTypeChanged(e) {
    const { checked, value } = e.target;
    const valueExists = filter.status.includes(value);

    // filter -> if value is all, and checked is true -> then add all filters to filters.date
    if (value === 'all' && checked) {
      setFilters((oldFilter) => ({
        ...oldFilter,
        status: [...(EVENT_TYPE)],
      }));
      return;
    }

    if (value === 'all' && !checked) {
      setFilters((oldFilter) => ({
        ...oldFilter,
        status: [],
      }));
      return;
    }

    // filter -> value does not exist in filters.date and checked is true -> push value to filters.date
    if (!valueExists && checked) {
      setFilters((oldFilter) => ({
        ...oldFilter,
        status: [...oldFilter.status, value],
      }));
      return;
    }

    // filter -> value exists in filters.date and checked is false -> remove value from filters.date
    if (valueExists && !checked) {
      setFilters((oldFilter) => ({
        ...oldFilter,
        status: oldFilter.status.filter((item) => item !== value),
      }));
      return;
    }
  }

  function onLevelChanged(e) {
    const { checked, value } = e.target;
    const valueExists = filter.level.includes(value);

    // filter -> value does not exist in filters.date and checked is true -> push value to filters.date
    if (!valueExists && checked) {
      setFilters((oldFilter) => ({
        ...oldFilter,
        level: [...oldFilter.level, value],
      }));
    }

    // filter -> value exists in filters.date and checked is false -> remove value from filters.date
    if (valueExists && !checked) {
      setFilters((oldFilter) => ({
        ...oldFilter,
        level: oldFilter.level.filter((item) => item !== value),
      }));
    }
  }
  
  function onSortChange(e) {
    const { checked, value } = e.target;
    if(checked) {
        setFilters((oldFilter) => ({
            ...oldFilter,
            sortBy: value,
        }));
    }
  }


  useEffect(()=>{
    setAllChallenges(getAllChallenges())
  },[]);

  return (
    <SearchAndFilterContext.Provider 
        value={{filteredChallenges, onSearchChange, onEventTypeChanged, filter, onSortChange, onLevelChanged}}
    >
        {children}
    </SearchAndFilterContext.Provider>
  )

}

