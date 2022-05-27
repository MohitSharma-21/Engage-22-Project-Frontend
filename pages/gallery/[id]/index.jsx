import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "../../../utils/axios";
import styles from "../../../styles/gallery/photolabel.module.css";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import {
  errorToast,
  infoToast,
  sucsessToast,
  warnToast,
  waitToast,
  updateToast,
} from "../../../components/toast";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const IndividualGallery = () => {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [imageLabel, setImageLabel] = useState("");

  const folder_id = router.query.id;

  const { getToken } = useAuth();
  const token = getToken();

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = () => {
    axios({
      url: `api/gallery/${folder_id}`,
      method: "GET",
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then(({ data }) => {
        setItems(data.images);
        setImageLabel(data.image_label);
      })

      .catch(function (err) {
        // console.log(err);
      });
  };

  const deletePhoto = (index, id) => {
    toast.dismiss();

    axios({
      url: `api/gallery/${id}/${index}`,
      method: "PUT",
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then(({ data }) => {
        setItems(items.filter((item, pos) => pos != index));
        sucsessToast("Photo Deleted");
      })

      .catch(function (err) {
        // console.log(err);

        errorToast("some error occurred");
      });
  };

  return (
    <div>
      <div className={`flex justify-center mt-2`}>
        <div
          className={`${styles.content} lg:w-full pb-8 w-4/5 flex flex-col justify-center m-2 `}
        >
          <h2 className="text-3xl m-3 font-bold flex justify-center">
            {imageLabel}
          </h2>

          <div
            className={`lg:w-full w-4/5 m-auto flex justify-center flex-wrap`}
          >
            {items.length > 0 &&
              items.map((item, index) => {
                return (
                  <div
                    className={`${styles.images} m-3 flex justify-center items-center relative overflow-hidden rounded-lg`}
                    key={index}
                  >
                    <Image
                      src={item}
                      className={`${styles.img} select-none flex justify-center items-center overflow-hidden`}
                      alt={index}
                      width={200}
                      height={200}
                      layout="fixed"
                      objectFit="contain"
                      // objectFit="cover"
                    />

                    <Icon
                      icon="entypo:circle-with-cross"
                      className={`${styles.removeIcon} hover:text-red-600 cursor-pointer absolute top-0 right-0`}
                      style={{
                        width: "35px",
                        height: "35px",
                      }}
                      onClick={() => deletePhoto(index, folder_id)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualGallery;
