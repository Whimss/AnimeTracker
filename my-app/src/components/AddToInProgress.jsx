import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import { useAnimeActions } from "../context/AnimeActions";

const AddToInProgressButton = ({ anime }) => {
  const { addToInProgress } = useAnimeActions();

  const handleAdd = async () => {
    const result = await addToInProgress(anime);
    if (result.success) {
      alert("Anime added to In Progress (and removed from Watch Later if needed).");
    } else {
      alert("Failed to update status.");
    }
  };

  return (
    <Tooltip title="Mark as In Progress">
      <IconButton onClick={handleAdd}>
        <PendingIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default AddToInProgressButton;
