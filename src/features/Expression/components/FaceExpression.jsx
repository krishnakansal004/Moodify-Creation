import React, { useEffect, useRef, useState } from "react";

import {
  createFaceLandmarker,
  detectExpressions,
} from "../utils/utils";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const faceLandmarker = useRef(null);

  const [expression, setExpression] =
    useState("Detecting...");

  useEffect(() => {
    createFaceLandmarker({
      faceLandmarker,
      videoRef,
    });

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks =
          videoRef.current.srcObject.getTracks();

        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      <h1>Face Expression Detector</h1>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="500"
        height="400"
        style={{
          borderRadius: "10px",
          border: "3px solid black",
        }}
      />

      <h2>{expression}</h2>

      <button
        onClick={() =>
          detectExpressions({
            faceLandmarker,
            videoRef,
            setExpression,
          })
        }
      >
        Detect Expression
      </button>
    </div>
  );
}