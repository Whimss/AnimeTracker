import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useAnimeActions } from "../context/AnimeActions";
import { useAuth } from "../components/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const RateAnimeButton = ({ anime }) => {
  const { rateAnime } = useAnimeActions();
  const { user } = useAuth();
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);

  // Load existing rating on mount
  useEffect(() => {
    const fetchRating = async () => {
      if (!user) return;
      const docRef = doc(db, "animeLists", user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data[anime.mal_id]?.rating) {
          setSelected(data[anime.mal_id].rating);
        }
      }
    };
    fetchRating();
  }, [user, anime.mal_id]);

  const handleRate = async (rating) => {
    setSelected(rating);
    await rateAnime(anime.mal_id, rating);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Tooltip title={`Rate ${star}`} key={star}>
          <IconButton
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            size="small"
          >
            <StarIcon
              sx={{
                color: (hover || selected) >= star ? "#FFFF99" : "#ccc",
              }}
            />
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
};

export default RateAnimeButton;