// components/AddToListButton.js
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAnimeActions } from "../context/AnimeActions";
import { useSnackbar } from "../context/SnackBar";

const AddToListButton = ({ anime }) => {
  const { addToList } = useAnimeActions();
  const { showSnackbar } = useSnackbar();

  const handleClick = async () => {
    const result = await addToList(anime);
    if (result.success) {
      showSnackbar("Anime added to your list!");
    } else {
      showSnackbar("Failed to add anime.", "error");
    }
  };

  return (
    <Tooltip title="Add to list">
      <IconButton onClick={handleClick}>
        <AddCircleIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default AddToListButton;