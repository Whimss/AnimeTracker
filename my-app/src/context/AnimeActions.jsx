import React, { createContext, useContext } from "react";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/AuthProvider";
import { Rating } from "@mui/material";

const AnimeActionsContext = createContext();

export const AnimeActionsProvider = ({ children, fetchAnimeList = () => {} }) => {

  const { user } = useAuth();

  const addToCollection = async (collection, anime, status) => {
    if (!user) return { success: false, message: "User not authenticated" };
    try {
      const userDoc = doc(db, collection, user.uid);
      const animeWithStatus = { ...anime, status };
      await setDoc(userDoc, { [anime.mal_id]: animeWithStatus }, { merge: true });
      fetchAnimeList();
      return { success: true };
    } catch (error) {
      console.error(`Error adding to ${collection}:`, error);
      return { success: false, error };
    }
  };

  const removeFromCollection = async (collection, mal_id) => {
    if (!user) return { success: false, message: "User not authenticated" };
    try {
      const userDoc = doc(db, collection, user.uid);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        const currentData = userSnap.data();
        delete currentData[mal_id];
        await setDoc(userDoc, currentData);
        fetchAnimeList();
        return { success: true };
      } else {
        return { success: false, message: "No data found" };
      }
    } catch (error) {
      console.error(`Error removing from ${collection}:`, error);
      return { success: false, error };
    }
  };

  const addToList = async (anime) => {
    return await addToCollection("animeLists", anime, "listed");
  };

  const addToWatchLater = async (anime) => {
    return await addToCollection("watchLaterAnime", anime, "watch_later");
  };

  const removeFromList = async (mal_id) => {
    return await removeFromCollection("animeLists", mal_id);
  };

  const addToInProgress = async (anime) => {
    if (!user) return { success: false, message: "User not authenticated" };
    try {
      const inProgressRef = doc(db, "inProgressAnime", user.uid);
      const animeWithStatus = { ...anime, status: "in_progress" };
      await setDoc(inProgressRef, { [anime.mal_id]: animeWithStatus }, { merge: true });
  
      // Optionally remove from watchLater
      const watchLaterRef = doc(db, "watchLaterAnime", user.uid);
      const watchLaterSnap = await getDoc(watchLaterRef);
      if (watchLaterSnap.exists()) {
        const watchLaterData = watchLaterSnap.data();
        if (watchLaterData[anime.mal_id]) {
          delete watchLaterData[anime.mal_id];
          await setDoc(watchLaterRef, watchLaterData);
        }
      }
      fetchAnimeList();
      return { success: true };
    } catch (error) {
      console.error("Error moving anime to inProgress:", error);
      return { success: false, error };
    }
  };
  
  const addToFavorites = async (anime) => {
    if (!user) return { success: false, message: "User not authenticated" };
    const favDocRef = doc(db, "favoriteAnime", user.uid);
    const listDocRef = doc(db, "animeLists", user.uid);
    try {
      const animeWithStatus = { ...anime, status: "favorite" };
      await setDoc(favDocRef, { [anime.mal_id]: animeWithStatus }, { merge: true });
  
      const listSnap = await getDoc(listDocRef);
      const listData = listSnap.exists() ? listSnap.data() : {};
      if (!listData[anime.mal_id]) {
        await setDoc(listDocRef, { [anime.mal_id]: animeWithStatus }, { merge: true });
      }
      fetchAnimeList();

      return { success: true };
    } catch (error) {
      console.error("Error adding to favorites and list:", error);
      return { success: false, error:error.message };
    }
  };

  const rateAnime = async (mal_id, rating) => {
  if (!user) return { success: false, message: "User not authenticated" };
  try {
    const docRef = doc(db, "animeLists", user.uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      if (data[mal_id]) {
        data[mal_id].rating = rating; // update rating
        await setDoc(docRef, data);   // save updated object
        fetchAnimeList();
        return { success: true };
      }
    }
    return { success: false, message: "Anime not found in list" };
  } catch (error) {
    console.error("Error rating anime:", error);
    return { success: false, error };
  }
};

  return (
    <AnimeActionsContext.Provider
      value={{
        addToList,
        addToFavorites,
        addToInProgress,
        addToWatchLater,
        removeFromList,
        removeFromCollection,
        rateAnime
      }}
    >
      {children}
    </AnimeActionsContext.Provider>
  );
};

export const useAnimeActions = () => useContext(AnimeActionsContext);

