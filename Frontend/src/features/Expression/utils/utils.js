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
  if (!videoRef.current || !faceLandmarker.current) return;

  // Make sure video is ready
  if (videoRef.current.readyState < 2) return;

  const results = faceLandmarker.current.detectForVideo(
    videoRef.current,
    performance.now()
  );

  if (
    results.faceBlendshapes &&
    results.faceBlendshapes.length > 0
  ) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name) => {
      const item = blendshapes.find(
        (shape) => shape.categoryName === name
      );

      return item ? item.score : 0;
    };

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");

    const browUp = getScore("browInnerUp");
    const jawOpen = getScore("jawOpen");

    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");

    let detectedExpression = "Neutral";

    if (smileLeft > 0.5 || smileRight > 0.5) {
      detectedExpression = "happy";
    } else if (browUp > 0.2 && jawOpen > 0.3) {
      detectedExpression = "surprised";
    } else if (frownLeft > 0.5 && frownRight > 0.5) {
      detectedExpression = "sad";
    }

    setExpression(detectedExpression);
    return detectedExpression;
  }
};