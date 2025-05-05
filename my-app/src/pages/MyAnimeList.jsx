import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/AuthProvider";
import { Grid, Paper, Typography } from "@mui/material";
import AnimeCard from "../components/AnimeCard";

const MyAnimeList = () => {
    const { user } = useAuth();
    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        const fetchAnimeList = async () => {
            if (!user) return;

            const docRef = doc(db, "animeLists", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const animeArray = Object.values(data); // Convert keyed object to array
                setAnimeList(animeArray);
            } else {
                setAnimeList([]);
            }
        };

        fetchAnimeList();
    }, [user]);

    if (!animeList.length) {
        return <Typography variant="h6" sx={{ m: 2 }}>No anime in your list yet.</Typography>;
    }

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {animeList.map((anime) => {
                const title = anime.title && anime.title.length > 20 ? `${anime.title.substring(0, 15)}...` : anime.title;
                const synopsis = anime.synopsis && anime.synopsis.length > 30 ? `${anime.synopsis.substring(0, 30)}...` : anime.synopsis;
                const imageUrl = anime.images?.jpg?.image_url || 'default-image-url.png';

                return (
                    <Grid className="animeCard_container" container item xs={12} key={anime.mal_id}>
                        <Paper className="animeCard_paper">
                            <img src={imageUrl} alt={title} style={{ maxHeight: 300 }} />
                            <Typography variant="h5" component="h2">{title}</Typography>
                            <Typography variant="body2" component="h2" paragraph={true}>{synopsis}</Typography>
                            
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default MyAnimeList;
