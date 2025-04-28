import React, { useEffect } from "react";
import { Grid } from "@mui/system";
import { Paper, Typography, Link } from "@mui/material";
import './SingleAnime.scss'; 

const SingleAnime = (props) => {
    const { title, images, episodes, rating, airing, broadcast, score, url } = props.info;
    const { aired } = props.info;
    const airStart = aired?.from
        ? new Date(aired.from).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : "Unknown";
    const airEnd = aired?.to
        ? new Date(aired.to).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : null;
    const image_url = images.jpg.image_url;

    useEffect(() => {
        console.log(title, image_url);
    }, [title, image_url]);

    return (
        <Grid container spacing={10} direction="row" justify="center" alignItems="center" alignContent="center" className="SingleAnimeContainer" >
            <Grid>
                <img src={image_url} alt={title} className="SingleAnimeImg" />
            </Grid>
            <Grid>
                <Paper elevation={3} className="SingleAnimeDescription">
                    <Typography variant="h4" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Airing: {airStart} {aired.to ? `to ${airEnd}` : "(Ongoing)"}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Score: {score}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Broadcast: {broadcast.string}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Rating: {rating}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Episodes: {episodes}
                    </Typography>
                    <Link href={url} target="_blank" rel="noopener" variant="body1">
                        View on MyAnimeList
                    </Link>

                </Paper>
            </Grid>
        </Grid>
    );
};

export default SingleAnime;