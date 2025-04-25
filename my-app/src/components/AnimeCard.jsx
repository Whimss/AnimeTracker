import React from "react";
import { SearchContext } from "../context/search";
import { Typography,Link,Paper,Grid,ImageListItem } from "@mui/material";
import { maxHeight } from "@mui/system";
import './AnimeCard.scss';
import {useNavigate} from 'react-router-dom';

const AnimeCard = (props) => {
    const navigate =useNavigate();
    const onClickHandler = () =>{
        navigate('/single-view');
    };
    const title=props.anime.title;
    const imageUrl =props.anime.images.jpg.image_url;
    const synopsis = props.anime.synopsis;
    return (
        
            <Grid  className="animeCard_container"container item xs={12}>
                <Paper className="animeCard_paper">
                    <img src={imageUrl} alt={title} style={{maxHeight:300}}/>
                    <Typography variant="h5" component="h2">{title}</Typography>
                    <Typography variant="body2" component="h2" paragraph={true} >{synopsis}</Typography>
                    <Link component="button" variant="body1" style={{marginBottom:0}} onClick={onClickHandler}>Learn More</Link>
                </Paper>
                
            </Grid>
        
    );
};
export default AnimeCard;