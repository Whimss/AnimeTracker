import React, {useEffect,useContext,useState}from 'react';
import { SearchContext } from '../context/search';
import AnimeList from '../components/AnimeList';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const Results = () => {
   const search = useContext(SearchContext);
    const [dataExists, setDataExists] = useState(true)
    useEffect(() => {
        if (!search.animeData || search.animeData.length === 0) {
          try {
            const localData = JSON.parse(localStorage.getItem('myData'));
            if (localData) {
              search.setData(localData);  // <-- Use your context setter!
              setDataExists(true);
            } else {
              setDataExists(false);
            }
          } catch (error) {
            console.log(error);
            setDataExists(false);
          }
        }
        console.log(search.animeData);
      }, [search]);
      
    return (<Box mt={2}>
        {(dataExists && <AnimeList data={search.animeData}/>) || <Typography variant="h4">Data Does Not Exist</Typography>}
    </Box>); 
  
};

export default Results;