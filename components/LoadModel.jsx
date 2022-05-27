import { useEffect } from "react";
import * as faceapi from "face-api.js";
import { memo } from "react";

const LoadModel = ({ isModelLoaded, setIsModelLoaded }) => {
  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      ])
        .then(() => {
          // console.log("models loaded");
          setIsModelLoaded(true);
        })
        .catch((e) => console.log(e));
    };

    if (isModelLoaded == false) {
      loadModels();
    }
  }, []);
};

export default memo(LoadModel);
