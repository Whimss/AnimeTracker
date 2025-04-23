import React from "react";
import { SearchContext } from "../context/search";
import { Typography,Link,Paper,Grid,ImageListItem } from "@mui/material";
import { maxHeight } from "@mui/system";

const AnimeCard = (props) => {
    const title=props.anime.title;
    const imageUrl =props.anime.images.jpg.image_url;
    const synopsis = props.anime.synopsis;
    return (
        
            <Grid container item xs={12}>
                <Paper>
                    <img src={imageUrl} alt={title} style={{maxHeight:300}}/>
                    <Typography variant="h5" component="h2">{title}</Typography>
                </Paper>
                <Typography variant="body2" component="h2" paragraph={true} >{synopsis}</Typography>

            </Grid>
        
    );
};
export default AnimeCard;