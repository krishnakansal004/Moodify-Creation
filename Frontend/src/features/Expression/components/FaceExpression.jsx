import React, { useEffect, useRef, useState } from "react";
import "../style/FaceExpression.scss";

import {
  createFaceLandmarker,
  detectExpressions,
} from "../utils/utils";

export default function FaceExpressionDetector({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const faceLandmarker = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    createFaceLandmarker({
      faceLandmarker,
      videoRef,
    });

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const detectedExpression = await detectExpressions({
      faceLandmarker,
      videoRef,
      setExpression,
    });

    onClick(detectedExpression);
  }

  return (
    <div className="face-detector glass-card">
      <h1 className="face-detector__heading">Face Expression Detector</h1>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="face-detector__video"
      />

      <h2 className={`face-detector__expression mood-${expression}`}>
        {expression}
      </h2>

      <div className="face-detector__actions">
        <button className="button" onClick={handleClick}>
          Detect Expression
        </button>
      </div>
    </div>
  );
}