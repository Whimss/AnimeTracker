import React, { useEffect } from "react";
import { Paper, Typography, Link, Box, Grid, Stack, Divider } from "@mui/material";
import './SingleAnime.scss';
import AddToFavoritesButton from "./AddToFavorites";
import AddToListButton from "./AddToList";
import AddToInProgressButton from "./AddToInProgress";
import AddToWatchLaterButton from "./AddToWatchLater";

const SingleAnime = (props) => {
    const { title, images, episodes, rating, airing, broadcast, score, url, synopsis, rank, genres, popularity, themes, type } = props.info;
    const { aired } = props.info;
    const airStart = aired?.from
        ? new Date(aired.from).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : "Unknown";
    const airEnd = aired?.to
        ? new Date(aired.to).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : null;
    const image_url = images?.jpg?.image_url || '';

    useEffect(() => {
        console.log(title, image_url);
    }, [title, image_url]);
    useEffect(() => {
  console.log("Genres:", props.info.genres);
  console.log("Themes:", props.info.themes);
}, []);

    return (
        <Box>
            {/* Centered Image */}
            <Box className="SingleAnimeImageWrapper" textAlign="center">
                <img src={image_url} alt={title} className="SingleAnimeImg" />
            </Box>

            {/* Title under the Image */}
            <Box className="SingleAnimeTitleWrapper" textAlign="center" mb={4}>
                <Typography variant="h4" gutterBottom>{title}</Typography>
            </Box>

            {/* Container that holds the content (Synopsis and Info) */}
            <Box className="SingleAnimeContainer" sx={{ bgcolor: 'secondary.main' }}>
                {/* Synopsis Section */}
                <Box className="SingleAnimePaper" p={2} mb={4}>
                    <Typography variant="h5" gutterBottom>Synopsis</Typography>
                    <Typography variant="body1">{synopsis || "No synopsis available."}</Typography>
                </Box>

                {/* Info Section */}
                <Box className="SingleAnimePaper" p={2}>
                    <Typography variant="h5" gutterBottom>Information</Typography>

                    <Grid container spacing={2} className="SingleAnimeInfo">
                        {/* First Column */}
                        <Box className="SingleAnimeColumn">
                            <Typography variant="body1"><strong>Type:</strong> {type}</Typography>
                            <Divider sx={{ my: 1, borderColor: 'primary.main', borderWidth: 1 }} />

                            <Typography variant="body1"><strong>Genres:</strong> {genres?.map(g => g.name).join(', ') || "N/A"}</Typography>
                            <Divider sx={{ my: 1, borderColor: 'primary.main', borderWidth: 1 }} />

                            <Typography variant="body1"><strong>Episodes:</strong> {episodes}</Typography>
                            <Divider sx={{ my: 1, borderColor: 'primary.main', borderWidth: 1 }} />

                            <Typography variant="body1">
                                <strong>Airing:</strong> {airStart} {aired?.to ? `to ${airEnd}` : "(Ongoing)"}
                            </Typography>
                            <Divider sx={{ my: 1, borderColor: 'primary.main', borderWidth: 1 }} />

                            <Typography variant="body1"><strong>Broadcast:</strong> {broadcast?.string}</Typography>
                            <Divider sx={{ my: 1, borderColor: 'primary.main', borderWidth: 1 }} />
                        </Box>

                        {/* Second Column */}
                        <Box className="SingleAnimeColumn">
                            <Typography variant="body1"><strong>Rating:</strong> {rating}</Typography>
                            <Divider sx={{ my: 1, borderColor: 'primary.main', borderWidth: 1 }} />

                            <Typography variant="body1"><strong>Score:</strong> {score}</Typography>
                            <Divider sx={{ my: 1, borderColor: 'primary.main', borderWidth: 1 }} />

                            <Typography variant="body1"><strong>Rank:</strong> {rank}</Typography>
                            <Divider sx={{ my: 1, borderColor: 'primary.main', borderWidth: 1 }} />

                            <Typography variant="body1"><strong>Popularity:</strong> {popularity}</Typography>
                            <Divider sx={{ my: 1, borderColor: 'primary.main', borderWidth: 1 }} />

                            <Typography variant="body1"><strong>Themes:</strong> {themes?.map(t => t.name).join(', ') || "N/A"}</Typography>
                            <Divider sx={{ my: 1, borderColor: 'primary.main', borderWidth: 1 }} />

                            <Link href={url} target="_blank" rel="noopener" variant="body1" mt={3} >
                                View on MyAnimeList
                            </Link>
                        </Box>
                        
                    </Grid>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
                    <AddToListButton anime={props.anime} />
                    <AddToFavoritesButton anime={props.anime} />
                    <AddToWatchLaterButton anime={props.anime} />
                    <AddToInProgressButton anime={props.anime}/>
                </Box>
            </Box>
        </Box>
    );
};

export default SingleAnime;