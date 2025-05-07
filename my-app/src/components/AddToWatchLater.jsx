import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAnimeActions } from "../context/AnimeActions";
import { useSnackbar } from "../context/SnackBar";

const AddToWatchLaterButton = ({ anime }) => {
  const { addToWatchLater } = useAnimeActions();
  const { showSnackbar } = useSnackbar();

  const handleAdd = async () => {
    const result = await addToWatchLater(anime);
    if (result.success) {
      showSnackbar("Anime added to Watch Later!");
    } else {
      showSnackbar("Failed to add to Watch Later.", "error");
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
