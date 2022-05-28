import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import styles from "../../styles/gallery/index.module.css";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useAuth } from "../../context/auth";
import ImagePreviewModal from "../../components/gallery/index/modal";
import FolderListItem from "../../components/gallery/index/FolderListItem";
import useAuthRequired from "../../middlewares/useAuthRequired";
import {
  errorToast,
  infoToast,
  sucsessToast,
  warnToast,
  waitToast,
  updateToast,
} from "../../components/toast";
import { toast } from "react-toastify";


const Gallery = () => {
  const [items, setItems] = useState([]);
  const [filepath, setFilepath] = useState("");
  const [base64Img, setBase64Img] = useState("");
  const [modalIsOpen, setModalsOpen] = useState(false);

  const { getToken } = useAuth();
  const token = getToken();

  useAuthRequired(token);

  useEffect(() => {

    const fetchfolder = () => {
      waitToast()

      axios({
        url: "api/gallery/",
        method: "GET",
        headers: {
          Authorization: "Token " + token,
        },
      })
        .then(({ data }) => {
          setItems(data);

          toast.dismiss();
        })
        .catch((err) => {
          // console.log(err);
        });
    };

    if (token && modalIsOpen==false) {

      fetchfolder();
    }

  }, [modalIsOpen,token]);

  const getFile = (e) => {
    // setFile('')
    // setBase64Img('')
    if (e.target.files.length == 0) return;

    waitToast()
    setFilepath(e.target.value);
    getBase64(e.target.files[0]);
  };

  const getBase64 = (file) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64Img(reader.result.toString());
      setModalsOpen(true);
    };
  };

  return (
    <div>
      <div className={`flex justify-center items-center`}>
        <div
          className={`${styles.content} m-2 p-2 md:w-11/12 w-9/12 flex flex-col justify-center items-center`}
        >
          <h2
            className={`md:w-8/12 w-4/12 mb-2 pb-2 text-4xl tracking-wider font-bold  flex justify-center items-center border-b-4 border-solid border-white rounded`}
          >
            Gallery
          </h2>
          <div
            className={`my-4 w-full flex flex-wrap  items-center text-center`}
          >
            <div
              className={`${styles.captureIcon} mx-3 cursor-pointer flex justify-center items-center`}
            >
              <Link href="/gallery/add-photo">
                <a>
                  <Icon
                    icon="bxs:camera"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </a>
              </Link>
            </div>
            
            <h2 className="text-xl font-semibold">Or</h2>

            <div className={`${styles.uploadIcon} mx-3 cursor-pointer`}>
              <label htmlFor="file">
                <Icon
                  icon="material-symbols:upload-file-rounded"
                  style={{
                    width: "50px",
                    height: "50px",
                    cursor: "pointer",
                  }}
                />
              </label>
              <input
                className="cursor-pointer hidden"
                type="file"
                accept="image/*"
                name="file"
                id="file"
                value={filepath}
                onChange={(e) => {
                  getFile(e);
                }}
              />
            </div>
          </div>

          <div className={`w-full m-0 flex justify-center`}>
            <div
              className={`w-8/12 md:w-full flex flex-row flex-wrap justify-center items-center `}
            >
              {items.map((item, index) => {
                return <FolderListItem key={index} item={item} />;
              })}
            </div>
          </div>

        </div>
      </div>

      {modalIsOpen && (
        <ImagePreviewModal
          base64Img={base64Img}
          setFilepath={setFilepath}
          setModalsOpen={setModalsOpen}
        />
      )}
    </div>
  );
};

export default Gallery;
