import styles from "../../styles/sign-in/signin.module.css";
import Modal from "../../components/sign-in/modal";
import { useState } from "react";
import {
  errorToast,
  infoToast,
  sucsessToast,
  warnToast,
  updateToast,
} from "../../components/toast";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function SignIn() {
  const [modalIsOpen, setModalsOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(()=>{
    toast.dismiss();
  },[])

  const checkUsername = () => {
    if (!username) {
      toast.dismiss();
      infoToast("Add Username first");
      return;
    }
    setModalsOpen(true);
  };

  return (
    <div>
      <div
        className={`${styles.above} flex flex-col justify-center items-center`}
      >
        {modalIsOpen == false && (
          <div
            className={`${styles.main} sm:w-11/12 md:w-4/5 w-1/2 h-3/5 flex justify-center items-center rounded-lg`}
          >
            <div
              className={`w-full h-full flex justify-center items-center flex-col`}
            >
              <h2
                className={`sm:w-11/12 w-3/5 border-b-4 border-solid border-white m-1 pb-2 text-center text-3xl font-bold rounded`}
              >
                Sign-in
              </h2>
              <div
                className={`sm:w-3/4 p-1 w-2/5 flex flex-col`}
              >
                <input
                  className={`md:w-11/12 border-b-2 border-solid border-white m-1 mt-4 p-2 outline-none bg-transparent text-xl `}
                  id="inputUsername"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div>
                <button
                  className={`${styles.button} m-2 p-2 px-4 mt-4 text-center text-lg font-semibold rounded-3xl flex justify-center items-center cursor-pointer`}
                  onClick={() => checkUsername()}
                >
                  Move to Face Scanning
                </button>
              </div>
            </div>
          </div>
        )}
        {modalIsOpen && (
          <Modal
            username={username}
            setUsername={setUsername}
            modalIsOpen={modalIsOpen}
            setModalsOpen={setModalsOpen}
          />
        )}
      </div>
    </div>
  );
}
