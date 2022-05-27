import { useRef } from "react";
import styles from "../../styles/sign-in/modalSignIn.module.css";
import Webcam from "react-webcam";
import axios from "../../utils/axios";
import * as faceapi from "face-api.js";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import {
  errorToast,
  infoToast,
  sucsessToast,
  warnToast,
  waitToast,
  updateToast,
} from "../../components/toast";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const SignInModal = ({ username, setUsername, modalIsOpen, setModalsOpen }) => {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraFeedRef = useRef(null);
  const router = useRouter();
  let intervalID;
  const { setToken } = useAuth();

  if (!modalIsOpen) {
    clearInterval(intervalID);
    return;
  }

  const videoConstraints = {
    width: 500,
    height: 350,
    facingMode: "user",
  };
  const captureSize = videoConstraints;
  const webcamSize = videoConstraints;

  const matchFace = async (data, token) => {
    const labeledFaceDescriptors = data.map((x) =>
      faceapi.LabeledFaceDescriptors.fromJSON(x)
    );

    faceapi.matchDimensions(canvasRef.current, webcamSize);

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    intervalID = setInterval(async () => {
      if (!webcamRef.current) {
        clearInterval(intervalID);
        return;
      }

      if (webcamRef && canvasRef) {
        const imgsrc = webcamRef.current.getScreenshot({
          width: captureSize.width,
          height: captureSize.height,
        });

        // converting img into html Element

        const img = document.createElement("img");
        img.src = imgsrc;

        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        if (!canvasRef.current) {
          clearInterval(intervalID);
          return;
        }

        if (webcamRef && canvasRef.current && detections) {

          const resized = faceapi.resizeResults(detections, webcamSize);

          const results = resized.map((d) =>
            faceMatcher.findBestMatch(d.descriptor)
          );

          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, webcamSize.width, webcamSize.height);

          results.forEach((result, i) => {
            const box = resized[i].detection.box;
            const label = result.toString().split(" ");
            const labelName = label[0];
            const labelProb = label[1];

            let drawBox;

            if (labelName == username) {

              drawBox = new faceapi.draw.DrawBox(box, {
                label: labelName,
                boxColor: "green",
                lineWidth: 3,
              });

              setToken(token);
              clearInterval(intervalID);
              router.replace("/");

            } else {

              drawBox = new faceapi.draw.DrawBox(box, {
                label: labelName,
                boxColor: "red",
                lineWidth: 3,
              });
              
            }

            drawBox.draw(canvasRef.current);
          });

          // faceapi.draw.drawDetections(canvasRef.current, resized);
          // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
          // faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
        }
      }
    }, 100);
    return () => clearInterval(intervalID);
  };

  const initiateFaceRecognition = () => {
    getUser();
  };

  const getUser = () => {
    if (!username) {
      return;
    }

    waitToast();

    const dataForApiRequest = {
      username: username,
    };

    axios({
      url: "api/auth/sign-in",
      method: "POST",
      data: dataForApiRequest,
    })
      .then(({ data }) => {
        toast.dismiss();

        clearInterval(intervalID);
        if (data.error) {
          setModalsOpen(false);
          errorToast(err_msg);
          updateToast(id, data.error, 0);
          setModalsOpen(false);
        } else {
          infoToast(
            "Scanning Face, Make sure that your face is in proper lightning"
          );
          matchFace(data.labeledFaceDescriptors, data.token);
        }
      })
      .catch((err) => {
        toast.dismiss();
        // console.log(err);
        
        setModalsOpen(false);
        errorToast("User doesn't exist OR some error ocurred at our end");
      });
  };

  return (
    <div
      className={`absolute top-28 bottom-0 left-0 right-0 flex justify-center items-center`}
    >
      <div
        className={`${styles.modal} sm:w-full lg:w-11/12 w-1/2 pb-2 relative flex flex-col justify-center items-center rounded-xl`}
      >
        <div>
          <button
            className={`${styles.closeButton} absolute top-1 right-1 text-xl font-bold p-0 cursor-pointer`}
            onClick={() => {
              clearInterval(intervalID);
              setModalsOpen(false);
              setUsername("");
            }}
          >
            <Icon
              icon="entypo:circle-with-cross"
              style={{
                width: "40px",
                height: "40px",
              }}
              onClick={() => {
                setModalsOpen(false);
              }}
            />
          </button>
        </div>

        <h2 className="m-3 text-3xl font-bold">Face is Scanning...</h2>
        <div
          className={`mx-1 mb-8 flex justify-center items-center text-center`}
        >
          <div
            ref={cameraFeedRef}
            className={`relative m-1 flex justify-center items-center`}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              // width="100%"
              // height='100%'
              width={webcamSize.width}
              height={webcamSize.height}
              videoConstraints={videoConstraints}
              mirrored={true}
              onUserMedia={() => initiateFaceRecognition()}
            />
            <canvas
              className={`absolute w-full h-full top-0 left-0 right-0 bottom-0`}
              ref={canvasRef}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
