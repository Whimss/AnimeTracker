import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAnimeActions } from "../context/AnimeActions";

const AddToWatchLaterButton = ({ anime }) => {
  const { addToWatchLater } = useAnimeActions();

  const handleAdd = async () => {
    const result = await addToWatchLater(anime);
    if (result.success) {
      alert("Anime added to Watch Later!");
    } else {
      alert("Failed to add to Watch Later.");
    }
  };

  return (
    <Tooltip title="Watch Later">
      <IconButton onClick={handleAdd}>
        <VisibilityIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default AddToWatchLaterButton;
