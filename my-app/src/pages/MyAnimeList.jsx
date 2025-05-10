import React, { useEffect, useState, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/AuthProvider";
import { Grid, Paper, Typography, Box, Tabs, Tab } from "@mui/material";
import AnimeCard from "../components/AnimeCard";
import AddToFavoritesButton from "../components/AddToFavorites";
import AddToInProgressButton from "../components/AddToInProgress";
import RemoveFromListButton from "../components/RemoveFromList";
import AddToWatchLaterButton from "../components/AddToWatchLater";
import { AnimeActionsProvider } from "../context/AnimeActions";
import RateAnimeButton from "../components/rateAnime";

const MyAnimeList = () => {
  const { user } = useAuth();
  const [animeList, setAnimeList] = useState({
    all: [],
    favorite: [],
    inProgress: [],
    watchLater: [],
  });
  const [tabValue, setTabValue] = useState("all"); // Start with 'all'

  const fetchAllLists = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    fetchAllLists();
  }, [fetchAllLists]);

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
      <AnimeActionsProvider fetchAnimeList={fetchAllLists}>
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

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
            px: 2,
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          {[...filteredList]
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((anime) => {
              const title = anime.title?.length > 20 ? `${anime.title.substring(0, 15)}...` : anime.title;
              const synopsis = anime.synopsis?.length > 30 ? `${anime.synopsis.substring(0, 30)}...` : anime.synopsis;
              const imageUrl = anime.images?.jpg?.image_url || "default-image-url.png";

              return (
                <Box
                  key={anime.mal_id}
                  sx={{
                    width: 250,
                    bgcolor: "secondary.main",
                    p: 2,
                   
                    boxShadow: 3,
                    textAlign: "center",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={title}
                    style={{
                      height: 300,
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Typography  variant="h5" component="h2" sx={{ mt: 1 }}>
                    {title}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    {tabValue !== "favorite" && <AddToFavoritesButton anime={anime} />}
                    {tabValue !== "inProgress" && <AddToInProgressButton anime={anime} />}
                    {tabValue !== "watchLater" && <AddToWatchLaterButton anime={anime} />}
                    <RemoveFromListButton anime={anime} currentTab={tabValue} />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                    <RateAnimeButton anime={anime} />
                  </Box>
                </Box>
              );
            })}
        </Box>
      </AnimeActionsProvider>
    </>
  );

};

export default MyAnimeList;
