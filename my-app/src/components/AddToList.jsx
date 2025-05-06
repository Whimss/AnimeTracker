// components/AddToListButton.js
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAnimeActions } from "../context/AnimeActions";

const AddToListButton = ({ anime }) => {
  const { addToList } = useAnimeActions();

  const handleClick = async () => {
    const result = await addToList(anime);
    if (result.success) {
      alert("Anime added to your list!");
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