import React, {useEffect,useContext,useState}from 'react';
import { SearchContext } from '../context/search';

const Results = () => {
    const search = useContext(SearchContext);
    const [dataExists, setDataExists] = useState(true)
    useEffect (() => {
        if (!search.animeData || search.animeData.length === 0){
            try {
                const storedData = JSON.parse(localStorage.getItem('myData'));
                if (storedData && storedData.length > 0) {
                    search.setData(storedData);
                    setDataExists(true);
                  } else {
                    setDataExists(false);
                  }
               
                
                setDataExists(true);
            } catch (error) {
                console.log(error);
                setDataExists(false);
            }
        }
        console.log(search.anime);
    }, [search]);
    return (<div>
        {(dataExists && 'Data Exists') || 'Data Does Not Exist'}
    </div>);
};

export default Results;