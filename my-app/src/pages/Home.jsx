import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/search';
import { FormControl, Input, IconButton, Grid, Button, Stack, Pagination } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import './Home.scss'
import AnimeCard from '../components/AnimeCard';

const Home = () => {
  const navigate = useNavigate();
  const search = useContext(SearchContext);
  const [input, setInput] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchAllAnimeByLetter = async (letter) => {
    let allData = [];
    let currentPage = 1;
    let totalPages = 1;
  
    try {
      while (currentPage <= totalPages) {
        const response = await search.searchByLetter(letter, currentPage);
        const pageData = response.data || [];
        allData = [...allData, ...pageData];
  
        totalPages = response.pagination?.last_visible_page || 1;
        currentPage++;
  
        // Delay to avoid rate limiting
        await sleep(500); // 500ms between requests (2 requests/second)
      }
  
      allData.sort((a, b) => a.title.localeCompare(b.title));
      setAnimeList(allData);
      setTotalPages(Math.ceil(allData.length / 20));
    } catch (error) {
      console.error('Error fetching all anime by letter:', error);
    }
  };

  useEffect(() => {
    if (selectedLetter) {
      setAnimeList([]); // clear before fetch
      fetchAllAnimeByLetter(selectedLetter);
      setPage(1); // reset pagination
    }
  }, [selectedLetter]);

  const handleSearch = (event) => {
    event.preventDefault();
    search.search(input).then((data) => {
      search.setData(data.data);
      localStorage.setItem('myData', JSON.stringify(data.data));
      navigate('/results');
    });
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setPage(1); // Reset to the first page when a new letter is selected
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
 

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <div>
        <img alt="ichigo" src={import.meta.env.BASE_URL + 'ichigo.png'} height="420" width="auto" />
      </div>
      <div>
        <form onSubmit={handleSearch} className='home_form'>
          <FormControl className='home_formControl'>
            <Input placeholder="Search for your favorite anime..." value={input} onChange={(event) => setInput(event.target.value)} className='home_input' />
            <IconButton variant="container" color="primary" type="submit" disabled={!input} onClick={handleSearch} className='home_iconButton'>
              <SearchIcon />
            </IconButton>
          </FormControl>
        </form>
      </div>

      {/* Alphabet Buttons */}
      <div className="alphabet-buttons">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
          <Button key={letter} onClick={() => handleLetterClick(letter)} variant="outlined" sx={{ margin: 0.5 }}>
            {letter}
          </Button>
        ))}
      </div>
      

      {/* Display Anime List */}
      <div className="anime-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {animeList.length > 0 ? (
  animeList
    .slice((page - 1) * 20, page * 20)
    .map((anime) => (
      <AnimeCard key={anime.mal_id} anime={anime} />
    ))
) : (
  selectedLetter && <p>No anime found for letter "{selectedLetter}"</p>
)}
      </div>

      {/* Pagination */}
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" />
      </Stack>
    </Grid>
  );
};

export default Home;
