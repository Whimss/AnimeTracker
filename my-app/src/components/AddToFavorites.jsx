// components/AddToFavoritesButton.js
import React from "react";
import { useSnackbar } from "../context/SnackBar"; // Adjust path if needed
import { useAnimeActions } from "../context/AnimeActions";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

const AddToFavorites = ({ anime }) => {
  const { addToFavorites } = useAnimeActions();
  const { showSnackbar } = useSnackbar();

  const handleClick = async () => {
    const result = await addToFavorites(anime);
    if (result.success) {
      showSnackbar("Added to Favorites!");
    } else {
      showSnackbar("Failed to add to Favorites", "error");
    }
  };

  return (
    <Tooltip title="Add to Favorites">
    <IconButton onClick={handleClick}>
      <FavoriteIcon color="primary" />
    </IconButton>
    </Tooltip>

  );
};

export default AddToFavorites;