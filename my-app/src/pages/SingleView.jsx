import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import { SearchContext } from '../context/search';
import SingleAnime from '../components/SingleAnime';
import { Typography } from '@mui/material';

const SingleView = () => {
    const search = useContext(SearchContext);
    const [dataExists, setDataExists] = useState(true);

    useEffect(() => {
        if (search.singleData === undefined || Object.keys(search.singleData).length === 0) {
            try {
                search.setSingle(JSON.parse(localStorage.getItem('singleData')));
            } catch (error) {
                console.log(error);
                setDataExists(false);
            }
        }
        console.log(search.singleData)
    }, [search]);

    return (
        <div> {(dataExists && <SingleAnime info={search.singleData} />) || (<Typography>No data exists</Typography>)}
        </div>
        );
};

export default SingleView; 