import React from "react";
import FaceExpressionDetector from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";

const Home = () => {
  const { handleGetSong } = useSong();

  return (
    <div className="home-page">
      <div className="home-page__content">
        <FaceExpressionDetector onClick={(expression) => handleGetSong({ mood: expression })} />
        <Player />
      </div>
    </div>
  );
};

export default Home;
