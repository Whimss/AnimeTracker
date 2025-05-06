import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/AuthProvider";
import { Grid, Paper, Typography, Box, Tabs, Tab } from "@mui/material";
import AnimeCard from "../components/AnimeCard";
import AddToFavoritesButton from "../components/AddToFavorites";
import AddToInProgressButton from "../components/AddToInProgress";
import RemoveFromListButton from "../components/RemoveFromList";
import AddToWatchLaterButton from "../components/AddToWatchLater";

const MyAnimeList = () => {
    const { user } = useAuth();
    const [animeList, setAnimeList] = useState({
        all: [],
        favorite: [],
        inProgress: [],
        watchLater: [],
      });
    const [tabValue, setTabValue] = useState("all"); // Start with 'all'

    useEffect(() => {
        const fetchAllLists = async () => {
          if (!user) return;
    
          const collections = {
            all: "animeLists",
            favorite: "favoriteAnime",
            inProgress: "inProgressAnime",
            watchLater: "watchLaterAnime",
          };
    
          const fetchCollection = async (collectionName) => {
            const docRef = doc(db, collectionName, user.uid);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? Object.values(docSnap.data()) : [];
          };
    
          const [allList, favoriteList, inProgressList, watchLaterList] =
            await Promise.all([
              fetchCollection(collections.all),
              fetchCollection(collections.favorite),
              fetchCollection(collections.inProgress),
              fetchCollection(collections.watchLater),
            ]);
    
          setAnimeList({
            all: allList,
            favorite: favoriteList,
            inProgress: inProgressList,
            watchLater: watchLaterList,
          });
        };
    
        fetchAllLists();
      }, [user]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const filteredList = (() => {
        switch (tabValue) {
          case "favorite":
            return animeList.favorite;
          case "inProgress":
            return animeList.inProgress;
          case "watchLater":
            return animeList.watchLater;
          case "all":
          default:
            return animeList.all;
        }
      })();

    return (
        <>
            {/* Tabs */}
            <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', textAlign: 'center', mb: 2 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    centered
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab value="all" label="All Anime" sx={{ fontSize: '1.1rem', fontWeight: '500' }} />
                    <Tab value="inProgress" label="In Progress" sx={{ fontSize: '1.1rem', fontWeight: '500' }} />
                    <Tab value="favorite" label="Favorites" sx={{ fontSize: '1.1rem', fontWeight: '500' }} />
                    <Tab value="watchLater" label="Watch Later" sx={{ fontSize: '1.1rem', fontWeight: '500' }} />
                </Tabs>
            </Box>

            {/* Anime Cards */}
            <Grid container spacing={2} sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
                {[...filteredList]
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((anime) => {
                        const title = anime.title?.length > 20 ? `${anime.title.substring(0, 15)}...` : anime.title;
                        const synopsis = anime.synopsis?.length > 30 ? `${anime.synopsis.substring(0, 30)}...` : anime.synopsis;
                        const imageUrl = anime.images?.jpg?.image_url || 'default-image-url.png';

                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
                                <Paper sx={{ p: 2, backgroundColor: 'secondary.main' }}>
                                    <img src={imageUrl} alt={title} style={{ maxHeight: 300, width: '100%', objectFit: 'cover' }} />
                                    <Typography variant="h6">{title}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    {tabValue !== 'favorite' && (
                                        <AddToFavoritesButton anime={anime} />
                                    )}
                                    {tabValue !== 'inProgress' && (
                                        <AddToInProgressButton anime={anime} />
                                    )}
                                    {tabValue !== 'watchLater' && (
                                        <AddToWatchLaterButton anime={anime} />
                                    )}
                                    <RemoveFromListButton anime={anime} currentTab={tabValue} />
                                </Box>
                                </Paper>
                                
                            </Grid>
                        );
                    })}
            </Grid>
        </>
    );

};

export default MyAnimeList;
