import {useEffect, useState} from "react";

const useLocationSearch = (initial_list = []) => {
  const [locationInput, setLocationInput] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
    if (locationInput === '') {
      setFilteredList([]);
    } else {
      const results = initial_list.filter(item =>
        item.toLowerCase().includes(locationInput.toLowerCase())
      );
      setFilteredList(results);
    }
  }, [locationInput, initial_list]);

  return { locationInput, setLocationInput, filteredList, setFilteredList };
}

export default useLocationSearch;
