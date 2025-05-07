import React, { createContext, useState } from "react";

export const SearchContext = createContext({
  animeData: [],
  singleData: {},
  search: () => {},
  searchByLetter: () => {},
  setData: () => {},
  setSingle: () => {},
});

export const SearchProvider = ({ children }) => {
  const [animeData, setAnimeData] = useState([]);
  const [singleData, setSingleData] = useState({});

  // Search by query
  const search = async (searchTerm) => {
    let query = searchTerm;

    // Log the query before sending it to the API
    console.log('Search Query:', query);

    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&limit=20`
    );

    // Log the response data to check for errors
    const data = await response.json();
    console.log('Search Results:', data);

    setAnimeData(data.data || []);
    return data;
  };

  // Search by first letter
  const searchByLetter = async (letter, page = 1) => {
    let query = letter;

    // If the first letter is a number, prepend an underscore to avoid API issues
    if (/^\d/.test(letter)) {
      query = `_${letter}`;
    }

    const response = await fetch(
      `https://api.jikan.moe/v4/anime?letter=${query}&page=${page}`
    );
    const data = await response.json();
    setAnimeData(data.data || []);
    return data;
  };

  return (
    <SearchContext.Provider
      value={{
        animeData,
        singleData,
        search,
        searchByLetter,
        setData: setAnimeData,
        setSingle: setSingleData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};