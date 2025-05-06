import React, { createContext, useContext } from "react";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/AuthProvider";

const AnimeActionsContext = createContext();

export const AnimeActionsProvider = ({ children, fetchAnimeList }) => {
  const { user } = useAuth();

  const addToCollection = async (collection, anime, status) => {
    if (!user) return { success: false, message: "User not authenticated" };
    try {
      const userDoc = doc(db, collection, user.uid);
      const animeWithStatus = { ...anime, status };
      await setDoc(userDoc, { [anime.mal_id]: animeWithStatus }, { merge: true });
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
        return { success: true };
      } else {
        return { success: false, message: "No data found" };
      }
    } catch (error) {
      console.error(`Error removing from ${collection}:`, error);
      return { success: false, error };
    }
  };

  const addToList = (anime) => addToCollection("animeLists", anime, "listed");
  const addToWatchLater = (anime) => addToCollection("watchLaterAnime", anime);

  const removeFromList = async (collection, mal_id) => {
    return await removeFromCollection(collection, mal_id);
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

  return (
    <AnimeActionsContext.Provider
      value={{
        addToList,
        addToFavorites,
        addToInProgress,
        addToWatchLater,
        removeFromList,
        removeFromCollection
      }}
    >
      {children}
    </AnimeActionsContext.Provider>
  );
};

export const useAnimeActions = () => useContext(AnimeActionsContext);

