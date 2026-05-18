import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export const createFaceLandmarker = async ({
  faceLandmarker,
  videoRef,
}) => {
  // Load MediaPipe Vision Files
  const vision =
    await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

  // Create FaceLandmarker
  faceLandmarker.current =
    await FaceLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
        },

        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
        numFaces: 1,
      }
    );

  startWebcam({ videoRef });
};

export const startWebcam = async ({
  videoRef,
}) => {
  const stream =
    await navigator.mediaDevices.getUserMedia({
      video: true,
    });

  videoRef.current.srcObject = stream;
};

export const detectExpressions = async ({
  faceLandmarker,
  videoRef,
  setExpression,
}) => {
  if (
    !videoRef.current ||
    !faceLandmarker.current
  )
    return;

  const results =
    faceLandmarker.current.detectForVideo(
      videoRef.current,
      performance.now()
    );

  if (
    results.faceBlendshapes &&
    results.faceBlendshapes.length > 0
  ) {
    const blendshapes =
      results.faceBlendshapes[0].categories;

    const getScore = (name) => {
      const item = blendshapes.find(
        (shape) => shape.categoryName === name
      );

      return item ? item.score : 0;
    };

    // Expression Scores
    const smileLeft =
      getScore("mouthSmileLeft");

    const smileRight =
      getScore("mouthSmileRight");

    const browUp =
      getScore("browInnerUp");

    const jawOpen =
      getScore("jawOpen");

    const frownLeft =
      getScore("mouthFrownLeft");

    const frownRight =
      getScore("mouthFrownRight");

    const eyeBlinkLeft =
      getScore("eyeBlinkLeft");

    const eyeBlinkRight =
      getScore("eyeBlinkRight");

    // Detect Expressions
    if (
      smileLeft > 0.5 ||
      smileRight > 0.5
    ) {
      setExpression("😊 Smiling");
    } else if (
      browUp > 0.2 &&
      jawOpen > 0.3
    ) {
      setExpression("😲 Surprised");
    } else if (jawOpen > 0.5) {
      setExpression("😮 Mouth Open");
    } else if (
      eyeBlinkLeft > 0.7 ||
      eyeBlinkRight > 0.7
    ) {
      setExpression("😉 Blinking");
    } else if (
      frownLeft > 0.5 &&
      frownRight > 0.5
    ) {
      setExpression("😔 Sad");
    } else {
      setExpression("😐 Neutral");
    }
  }
};