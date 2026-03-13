import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceScannerK() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const CRIMINAL_IMAGES = [
    "/criminal_faces/criminal1.jpg",
    "/criminal_faces/criminal2.jpg"
  ];

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [capturedFace, setCapturedFace] = useState(null);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [verificationResult, setVerificationResult] = useState("");

  useEffect(() => {

    const loadModels = async () => {

      const MODEL_URL = "/models";

      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

      console.log("Models Loaded");

      const labeledDescriptors = await Promise.all(
        CRIMINAL_IMAGES.map(async (imgPath, index) => {

          const img = await faceapi.fetchImage(imgPath);

          const detection = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();

          return new faceapi.LabeledFaceDescriptors(
            "criminal_" + index,
            [detection.descriptor]
          );

        })
      );

      const matcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

      setFaceMatcher(matcher);
      setModelsLoaded(true);

      console.log("Face matcher ready");

    };

    loadModels();

  }, []);

  const startCamera = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    const video = videoRef.current;

    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };

  };

  const captureFace = async () => {

    if (!videoRef.current || videoRef.current.videoWidth === 0) {
      alert("Start camera first");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(videoRef.current, 0, 0);

    const image = canvas.toDataURL("image/jpeg");

    setCapturedFace(image);

    

    const detection = await faceapi
      .detectSingleFace(videoRef.current)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!faceMatcher) {
      alert("Face matcher not ready yet");
      return;
    }

    if (!detection) {
      alert("No face detected");
      return;
    }

    const bestMatch = faceMatcher.findBestMatch(detection.descriptor);

    console.log("Match result:", bestMatch);

    if (bestMatch.label !== "unknown") {
      setVerificationResult("⚠ Criminal Match Detected – Security Alert");
    } else {
      setVerificationResult("✔ Face Clear");
    }
    // stop camera
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

  };

  useEffect(() => {

    if (!modelsLoaded) return;

    const interval = setInterval(async () => {

      if (!videoRef.current) return;

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.SsdMobilenetv1Options()
      );

      const canvas = canvasRef.current;

      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      };

      faceapi.matchDimensions(canvas, displaySize);

      const resized = faceapi.resizeResults(detections, displaySize);

      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resized);

    }, 300);

    return () => clearInterval(interval);

  }, [modelsLoaded]);

  return (
    <div className="max-w-xl mx-auto p-6">

      <h2 className="text-xl font-bold mb-4">
        Facial Recognition
      </h2>

      {!capturedFace && (
        <div style={{ position: "relative" }}>

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "640px",
              height: "480px",
              background: "black"
            }}
          />

          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{
              position: "absolute",
              top: 0,
              left: 0
            }}
          />

        </div>
      )}
{!capturedFace && (
  <>
      <button
        onClick={startCamera}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Start Camera
      </button>

      <button
        onClick={captureFace}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4 ml-4"
      >
        Capture Face
      </button>
</>
)}
      {capturedFace && (
        <div className="mt-4">
          <p className="font-semibold">Captured Face</p>
          <img src={capturedFace} width="200" alt="Captured Face" />
        </div>
      )}

      {verificationResult && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-lg font-semibold">
          {verificationResult}
        </div>
      )}

    </div>
  );
}