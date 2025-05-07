import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import { useAnimeActions } from "../context/AnimeActions";
import { useSnackbar } from "../context/SnackBar";

const AddToInProgressButton = ({ anime }) => {
  const { addToInProgress } = useAnimeActions();
  const { showSnackbar } = useSnackbar();

  const handleAdd = async () => {
    const result = await addToInProgress(anime);
    if (result.success) {
      showSnackbar("Anime marked as In Progress.");
    } else {
      showSnackbar("Failed to update status.", "error");
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
