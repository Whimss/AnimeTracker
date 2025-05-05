import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../components/AuthProvider";
import { db } from "../firebase";
import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const AnimeListManager = ({ anime }) => {
  const { user } = useAuth();

  const handleAddToList = async () => {
    if (!user) return;

    try {
      const userDoc = doc(db, "animeLists", user.uid);
      await setDoc(userDoc, {
        [anime.mal_id]: anime
      }, { merge: true });

      alert("Anime added to your list!");
    } catch (error) {
      console.error("Error saving anime:", error);
    }
  };

  return (
    <Tooltip title="Add to list">
  <IconButton onClick={handleAddToList}>
    <AddCircleIcon color="primary" />
  </IconButton>
</Tooltip>
  );
};

export default AnimeListManager;