import { useState } from "react";
import axios from "../../utils/axios";
import { Icon } from "@iconify/react";
import styles from "../../styles/todo/AddTodo.module.css";
import { useAuth } from "../../context/auth";
import {
  errorToast,
  infoToast,
  sucsessToast,
  warnToast,
  waitToast,
  updateToast,
} from "../../components/toast";
import { toast } from "react-toastify";

export default function AddTodo({ tasks, setTasks, getAllTodos }) {
  const [title, setTitle] = useState("");
  const { getToken } = useAuth();
  const token = getToken();

  const createTodo = () => {
    toast.dismiss();

    if (!title) {
      infoToast("Please enter task...");
      return;
    }

    const dataForApiRequest = {
      title: title,
    };

    axios({
      url: "api/todo/create",
      method: "POST",
      data: dataForApiRequest,
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then(({ data }) => {
        sucsessToast("Task created");

        setTitle("");
        setTasks([...tasks, data]);
      })
      .catch(function (err) {
        // console.log(err);

        errorToast("Some error occurred");
      });
  };

  return (
    <div
      className={`${styles.addTask} p-1 px-2 flex justify-center items-center rounded-md`}
    >
      <input
        className="p-2 h-10 w-72 outline-none border-2 border-solid border-white bg-transparent rounded-md font-xl"
        type="text"
        id="inputTitle"
        placeholder="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button
        className=" bg-white rounded-md m-3 h-full cursor-pointer"
        onClick={() => createTodo()}
      >
        <Icon
          className={styles.icon}
          icon="fluent:task-list-square-add-24-filled"
          height="1"
          style={{
            width: "40px",
            height: "40px",
            color: "black",
          }}
        />
      </button>
    </div>
  );
}
