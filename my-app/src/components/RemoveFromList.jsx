import React from "react";
import { IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useAnimeActions } from "../context/AnimeActions"; 

const RemoveFromListButton = ({ anime, currentTab }) => {
  const {
    removeFromList,
    removeFromCollection,
  } = useAnimeActions();

  const handleRemove = async () => {
    const mal_id = anime.mal_id;

    switch (currentTab) {
      case "favorite":
        await removeFromCollection("favoriteAnime", mal_id);
        break;
      case "watchLater":
        await removeFromCollection("watchLaterAnime", mal_id);
        break;
      case "inProgress":
        await removeFromCollection("inProgressAnime", mal_id);
        break;
      case "all":
      default:
        await removeFromList(mal_id); // remove from animeLists
        break;
    }
  };

  return (
    <IconButton onClick={handleRemove} color="error">
      <RemoveCircleIcon />
    </IconButton>
  );
};

export default RemoveFromListButton;