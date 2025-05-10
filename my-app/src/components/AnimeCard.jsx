import React, { useContext } from "react";
import { SearchContext } from "../context/search";
import { Typography, Link, Paper, Grid,Box } from "@mui/material";
import './AnimeCard.scss';
import { useNavigate } from 'react-router-dom';
import AddToFavoritesButton from "./AddToFavorites";
import AddToListButton from "./AddToList";
import AddToInProgressButton from "./AddToInProgress";
import AddToWatchLaterButton from "./AddToWatchLater";
import RateAnimeButton from "./rateAnime";


const AnimeCard = (props) => {
    const navigate = useNavigate();
    const search = useContext(SearchContext);

    const onClickHandler = () => {
        fetch(`https://api.jikan.moe/v4/anime/${props.anime.mal_id}`).then((response) => response.json()).then((data) => {
            search.setSingle(data.data);
            localStorage.setItem('singleData', JSON.stringify(data.data));
            navigate('/single-view');
        });
    };

    // Check if title and synopsis are not null or undefined
    const title = props.anime.title && props.anime.title.length > 20 ? `${props.anime.title.substring(0, 15)}...` : props.anime.title;
    const synopsis = props.anime.synopsis && props.anime.synopsis.length > 30 ? `${props.anime.synopsis.substring(0, 30)}...` : props.anime.synopsis;

    // Check if image exists to avoid undefined errors
    const imageUrl = props.anime.images?.jpg?.image_url || 'default-image-url.png';  // Use a default image if not available

    return (
        <Grid className="animeCard_container" >
            <Paper className="animeCard_paper">
                <img src={imageUrl} alt={title} style={{ maxHeight: 300 }} />
                <Typography variant="h5" component="h2">{title}</Typography>
                <Typography variant="body2" component="h2" paragraph={true}>{synopsis}</Typography>
                <Link component="button" variant="body1" style={{ marginBottom: 0 }} onClick={onClickHandler}>Learn More</Link>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
                    <AddToListButton anime={props.anime} />
                    <AddToFavoritesButton anime={props.anime} />
                    <AddToWatchLaterButton anime={props.anime} />
                    <AddToInProgressButton anime={props.anime}/>
                </Box>
                <Box><RateAnimeButton anime={props.anime} /></Box>
            </Paper>
        </Grid>
    );
};

export default AnimeCard;
