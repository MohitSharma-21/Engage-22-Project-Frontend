import { useRef, useState } from "react";
import styles from "../../styles/signup/modalsignup.module.css";
import Webcam from "react-webcam";
import Image from "next/image";
import axios from "../../utils/axios";
import { useAuth } from "../../context/auth";
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
import { useRouter } from "next/router";

const SignUpModal = ({ username, setUsername, modalIsOpen, setModalsOpen }) => {
  const [items, setItems] = useState([]);
  const [webcamCheck, setWebcamCheck] = useState(false);
  const webcamRef = useRef(null);
  const router = useRouter();

  const { setToken } = useAuth();

  const videoConstraints = {
    width: 980,
    height: 720,
    facingMode: "user",
  };

  const captureSize = {
    width: 1280,
    height: 720,
  };

  if (!modalIsOpen) return;

  const capture = () => {
    if (items.length >= 6) return;

    setItems([
      ...items,
      webcamRef.current.getScreenshot({
        width: captureSize.width,
        height: captureSize.height,
      }),
    ]);
  };

  const removeImages = () => {
    setItems([]);
  };

  const addUser = () => {
    if (!username) {
      return;
    }

    waitToast();

    const dataForApiRequest = {
      username: username,
      images_to_validate: items,
    };

    axios({
      url: "api/auth/sign-up",
      method: "POST",
      data: dataForApiRequest,
    })
      .then(function (res) {
        toast.dismiss();

        if (res.data.error.face) errorToast(res.data.error.face);
        else {
          setToken(res.data.token);
          setModalsOpen(false);
          router.push("/gallery");
          sucsessToast("Signed-up");
        }
      })

      .catch(function (err) {
        toast.dismiss();

        if (err);
        {
          const err_msg =
            err.response.data.unique + " OR " + err.response.data.custom;
          errorToast(err_msg);
          setModalsOpen(false);
        }
      });
  };

  return (
    <div
      className={`m-2 absolute top-24 left-0 right-0 flex justify-center items-center`}
    >
      <div
        className={`${styles.modal} sm:w-full md:w-11/12  mb-5 relative w-3/5`}
      >
        {/* close button */}

        <button
          className={`${styles.closeButton} absolute top-1 right-1 cursor-pointer`}
          onClick={() => {
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

        <div
          className={`${styles.modalContent} h-full rounded-lg flex flex-col justify-center items-center text-center`}
        >
          <h2 className="m-4 text-3xl font-bold text-center">
            Capture your photos
          </h2>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            height={200}
            videoConstraints={videoConstraints}
            mirrored={true}
            onUserMedia={() => setWebcamCheck(true)}
          />

          <div className={`flex justify-center items-center`}>
            {webcamCheck && (
              <button
                onClick={() => {
                  capture();
                }}
                className={`${styles.camerabtn} m-3 px-4 py-1 pb-2 font-semibold flex justify-center items-center rounded-3xl cursor-pointer`}
              >
                Capture
              </button>
            )}
            {items.length > 0 && (
              <button
                onClick={() => {
                  removeImages();
                }}
                className={`${styles.camerabtn}  m-3 px-6 py-1 pb-2 font-semibold flex justify-center items-center rounded-3xl cursor-pointer`}
              >
                Clear
              </button>
            )}
          </div>
          <div className={`m-2 flex flex-wrap justify-center items-center`}>
            {items.map((item, index) => {
              return (
                <div
                  className={`mx-4 select-none flex justify-center items-center flex-wrap overflow-hidden rounded-lg`}
                  key={index}
                >
                  <Image
                    className={`select-none`}
                    src={item}
                    alt={index}
                    width="150"
                    height="150"
                    // layout="responsive"
                    objectFit="contain"
                  />
                </div>
              );
            })}
          </div>
          {items.length > 0 && (
            <button
              onClick={addUser}
              className={`${styles.camerabtn} mt-1 mb-4 px-5 py-1 pb-2 font-semibold flex justify-center items-center rounded-3xl cursor-pointer`}
            >
              Sign-up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
