import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import axios from "../../utils/axios";
import styles from "../../styles/gallery/add-photo.module.css";
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

const AddPhoto = () => {
  const webcamRef = useRef(null);
  const [selfie, setSelfie] = useState("");
  const [selfiePersonName, setSelfiePersonName] = useState("");
  const [clickSelfie, setClickSelfie] = useState(false);
  const [showSelfie, setShowSelfie] = useState(false);

  const { getToken } = useAuth();
  const token = getToken();

  const videoConstraints = {
    width: 500,
    height: 350,
    facingMode: "user",
  };

  const captureSize = videoConstraints;
  // const webcamSize = videoConstraints;
  const webcamSize = {
    width: 500,
    height: 360,
  };

  const capture = () => {
    setSelfie(
      webcamRef.current.getScreenshot({
        width: webcamSize.width,
        height: webcamSize.height,
      })
    );
  };

  const clearSelfie = () => {
    setSelfie("");
  };

  const uploadSelfie = () => {
    const dataForApiRequest = {
      images: selfie,
      image_label: selfiePersonName,
    };

    waitToast();

    axios({
      url: "api/gallery/upload",
      method: "POST",
      data: dataForApiRequest,
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then(({ data }) => {
        toast.dismiss();
        sucsessToast("Selfie added to " + data);

        setShowSelfie(false);
        setSelfiePersonName("");
        setSelfie("");
      })
      .catch((err) => {
        // console.log(err);

        toast.dismiss();
        errorToast("some error occurred");
      });
  };

  return (
    <div>
      <div className={`flex justify-center m-4`}>
        <div
          className={`${styles.content} p-2 w-4/5 flex flex-col justify-center`}
        >
          <h2 className="text-3xl mb-4 font-bold flex justify-center items-center">
            Capture Selfie
          </h2>
          <div className={`flex justify-center`}>
            {showSelfie == false && (
              <Webcam
                className={`md:w-full md:h-full`}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="40%"
                // height='100%'
                // width={webcamSize.width}
                // height={webcamSize.height}
                videoConstraints={videoConstraints}
                mirrored={true}
                onUserMedia={() => {
                  setClickSelfie(true);
                }}
              />
            )}

            {/* selfie image */}
            {showSelfie == true && (
              <div className={`relative flex justify-center items-center`}>
                <Image
                  src={selfie}
                  alt="selfie"
                  width={webcamSize.width}
                  height={webcamSize.height}
                  // layout="fixed"
                  objectFit="contain"
                />
              </div>
            )}
          </div>

          {showSelfie == false && clickSelfie == true && (
            <div className={`m-4 mt-0 flex justify-center items-center`}>
              <button
                className="bg-white m-1 rounded-full p-3"
                onClick={() => {
                  setClickSelfie(false);
                  setShowSelfie(true);
                  capture();
                }}
              >
                {/* camera  */}
                <Icon
                  icon="ant-design:camera-filled"
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "black",
                  }}
                />
              </button>
            </div>
          )}

          {showSelfie == true && (
            <div className={`m-2 mt-0 flex justify-center items-center`}>
              <button
                className=" bg-white m-1 rounded-full p-2"
                onClick={() => {
                  // setClickSelfie(true);
                  setShowSelfie(false);
                  clearSelfie();
                }}
              >
                {/* Retake */}
                <Icon
                  icon="mdi:camera-retake"
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "black",
                  }}
                />
              </button>
            </div>
          )}

          {showSelfie == true && (
            <div className={`flex flex-col justify-center items-center`}>
              <p className="m-1 font-semibold tracking-wide text-lg text-center">
                Enter persons name if this is his first picture here..
              </p>
              <div className="flex flex-row justify-center items-center flex-wrap">
                <input
                  className=" border-2 border-solid border-white h-8 p-2 m-2 outline-none  bg-transparent rounded-md"
                  id="inputImagelabel"
                  type="text"
                  placeholder="Image Label"
                  value={selfiePersonName}
                  onChange={(e) => {
                    setSelfiePersonName(e.target.value);
                  }}
                />
                <button
                  className={`${styles.saveButton} m-1 px-6 py-1 font-semibold cursor-pointer rounded-3xl`}
                  onClick={() => {
                    setClickSelfie(false);
                    uploadSelfie();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;
