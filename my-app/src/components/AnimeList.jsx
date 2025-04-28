import React from "react";
import AnimeCard from "./AnimeCard";
import { ImageList, Box } from "@mui/material";

const AnimeList = (props) => {
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
            padding: 2,
        }}>
            {props.data.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />))}
        </Box>
    );
};
export default AnimeList;
