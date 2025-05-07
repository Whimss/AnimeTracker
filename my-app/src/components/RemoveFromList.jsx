import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useAnimeActions } from "../context/AnimeActions"; 
import { useSnackbar } from "../context/SnackBar";

const RemoveFromListButton = ({ anime, currentTab }) => {
  const {
    removeFromList,
    removeFromCollection,
  } = useAnimeActions();
  const { showSnackbar } = useSnackbar();

  const handleRemove = async () => {
    const mal_id = anime.mal_id;

    let success = false;

    try {
      switch (currentTab) {
        case "favorite":
          success = await removeFromCollection("favoriteAnime", mal_id);
          break;
        case "watchLater":
          success = await removeFromCollection("watchLaterAnime", mal_id);
          break;
        case "inProgress":
          success = await removeFromCollection("inProgressAnime", mal_id);
          break;
        case "all":
        default:
          success = await removeFromList(mal_id); // Remove from animeLists
          break;
      }

      if (success) {
        showSnackbar("Anime removed from list.");
      } else {
        showSnackbar("Failed to remove anime.", "error");
      }
    } catch (error) {
      console.error(error);
      showSnackbar("An error occurred while removing the anime.", "error");
    }
    
  };

  return (
    <Tooltip title="Remove form list">
    <IconButton onClick={handleRemove} color="error">
      <RemoveCircleIcon />
    </IconButton>
    </Tooltip>
  );
};

export default RemoveFromListButton;