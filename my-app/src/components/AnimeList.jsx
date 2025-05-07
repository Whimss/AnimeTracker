import React from "react";
import AnimeCard from "./AnimeCard";
import { ImageList, Box } from "@mui/material";
import { AnimeActionsProvider } from "../context/AnimeActions";

const AnimeList = (props) => {
    return (
        <AnimeActionsProvider>
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
        </AnimeActionsProvider>
    );
};
export default AnimeList;
