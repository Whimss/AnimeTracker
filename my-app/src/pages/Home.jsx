import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/search';
import { FormControl, Input, IconButton, Grid, Button, Stack, Pagination,CircularProgress,Typography } from '@mui/material';
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
  const [loading, setLoading] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchAllAnimeByLetter = async (letter) => {
    let allData = [];
    let currentPage = 1;
    let totalPages = 1;

    try {

       setLoading(true);
      // Initial request to get the first page and totalPages
      const response = await search.searchByLetter(letter, currentPage);
      const pageData = response.data || [];
      totalPages = response.pagination?.last_visible_page || 1; // Set total pages based on the API response

      // Add the first page's data to the list
      allData = [...allData, ...pageData];

      // Loop through remaining pages
      while (currentPage < totalPages) {
        currentPage++;
        const nextPageResponse = await search.searchByLetter(letter, currentPage);
        const nextPageData = nextPageResponse.data || [];
        allData = [...allData, ...nextPageData];

        // Delay between requests to prevent rate-limiting
        await sleep(500);
      }

      // Sort the data alphabetically
      allData.sort((a, b) => a.title.localeCompare(b.title));

      // Update the anime list state
      setAnimeList(allData);
      setTotalPages(Math.ceil(allData.length / 50)); // Set the total pages based on the total length of data

    } catch (error) {
      console.error('Error fetching all anime by letter:', error);
    } finally {
      setLoading(false); // Stop loading once the request is complete
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
          <Button key={letter} onClick={() => handleLetterClick(letter)} variant="outlined" sx={{
            margin: 0.5,
            minWidth: 40,
            height: 40,
            borderRadius: '50%',
            padding: 0,
            textAlign: 'center',
            lineHeight: '40px',

            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white',
              borderColor: 'primary.main',
            },
          }}>
            {letter}
          </Button>
        ))}
      </div>


      {/* Display Anime List */}
      {loading && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <CircularProgress sx={{color:'secondary.main'}} />
          <Typography variant="h6" style={{ marginTop: 10 }}>This may take a while...</Typography>
        </div>
      )}

      {/* Display Anime List */}
      {!loading && (
        <div className="anime-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {animeList.length > 0 ? (
            animeList.slice((page - 1) * 50, page * 50).map((anime, index) => (
              <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
            ))
          ) : (
            selectedLetter && <p>No anime found for letter "{selectedLetter}"</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" />
      </Stack>
    </Grid>
  );
};

export default Home;
