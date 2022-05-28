import { useState } from "react";
import Image from "next/image";
import axios from "../../../utils/axios";
import styles from "../../../styles/gallery/index/indexmodal.module.css";
import { Icon } from "@iconify/react";
import {
  errorToast,
  infoToast,
  sucsessToast,
  warnToast,
  waitToast,
  updateToast,
} from "../../toast";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import { useEffect } from "react";

const ImagePreviewModal = ({ base64Img, setFilepath, setModalsOpen }) => {
  const [selfiePersonName, setSelfiePersonName] = useState("");
  const [disableButton, setDisableButton] = useState(false)

  const { getToken } = useAuth();
  const token = getToken();

  useEffect(()=>{
    toast.dismiss();
  },[])

  const uploadSelfie = () => {

    const dataForApiRequest = {
      images: base64Img,
      image_label: selfiePersonName,
    };

    setDisableButton(true)

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
        sucsessToast("Picture added to " + data);

        setSelfiePersonName("");
        setFilepath("");
        setModalsOpen(false);
      })
      .catch((err) => {
        // console.log(err);
        
        toast.dismiss();
        errorToast("some error occurred");

        setFilepath("");
        setSelfiePersonName("");
        setModalsOpen(false);
      });
  };

  return (
    <div
      className={`${styles.modelwrapper} md:top-16 md:h-4/6 w-full h-5/6 absolute top-24 left-0 right-0 m-auto flex justify-center items-center flex-col`}
    >
      <div
        className={`${styles.modal} md:w-11/12 relative w-4/5 h-full m-4  flex justify-center rounded-xl flex-col items-center`}
      >
        {base64Img && (
          <div
            className={`${styles.content} select-none flex justify-center items-center flex-col`}
          >
            <Image
              src={base64Img}
              className={`select-none`}
              alt="img"
              height={400}
              width={400}
              objectFit="contain"
            />
            <input
              className="h-8 m-1 p-2 outline-none border-2 border-solid border-white bg-transparent rounded-md "
              id="inputImagelabel"
              type="text"
              placeholder="Image Label"
              value={selfiePersonName}
              onChange={(e) => {
                setSelfiePersonName(e.target.value);
              }}
            />
            <button
              disabled={disableButton}
              className={`${disableButton==true ?  styles.saveDisable : styles.saveEnable} m-1 mt-2 px-7 py-1 font-semibold cursor-pointer rounded-3xl`}
              onClick={() => uploadSelfie()}
            >
              Save
            </button>
          </div>
        )}
        <Icon
          icon="entypo:circle-with-cross"
          className={`${styles.close} absolute top-1 right-1 text-xl font-bold p-0 cursor-pointer`}
          style={{
            width: "40px",
            height: "40px",
          }}
          onClick={() => {
            setFilepath("");
            setModalsOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default ImagePreviewModal;
