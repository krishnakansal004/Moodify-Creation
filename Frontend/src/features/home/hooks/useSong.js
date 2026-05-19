import { useContext } from "react";
import { getSong } from "../service/song.api";
import { SongContext } from "../song.context";

export const useSong = () => {
  const context = useContext(SongContext);

  if (!context) {
    throw new Error("useSong must be used within SongContextProvider");
  }

  const { loading, setLoading, song, setSong } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);
    try {
      const data = await getSong({ mood });
      setSong(data.song);
    } catch (error) {
      console.error("Failed to fetch song:", error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, song, handleGetSong };
};