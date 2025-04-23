import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { SearchContext } from '../context/search';
import { FormControl, Input, IconButton, Grid } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import './Home.scss'

const Home = () => {
    const navigate =useNavigate();
    const search = useContext(SearchContext)
    const [input,setInput]=useState('');

    const handleSearch =(event) => {
        event.preventDefault();
        search.search(input).then((data) => {
        search.setData(data.data);
        localStorage.setItem('myData',JSON.stringify(data.results));
       navigate('/results');
       
        });
    }
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center">
        <div>
          <img alt="ichigo" src={import.meta.env.BASE_URL + 'ichigo.png'} height="420" width="auto" />
        </div>
        <div>
          <form onSubmit={handleSearch} className='home_form'>
            <FormControl className='home_formControl'>
                <Input placeholder="Search for your favorite anime..." value={input} onChange={(event) => setInput(event.target.value)} className='home_input'/>
                <IconButton variant="container" color="primary" type="submit" disabled={!input} onClick={handleSearch} className='home_iconButton'>
                    <SearchIcon/>
                </IconButton>
            </FormControl>
          </form>
        </div>
      </Grid>
    );
};

export default Home;