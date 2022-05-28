import { useState } from "react";
import axios from "../../utils/axios";
import { Icon } from "@iconify/react";
import styles from "../../styles/todo/TodoListItem.module.css";
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

export default function TodoListItem({ tasks, task, setTasks, getAllTodos }) {

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const { getToken } = useAuth();
  const token = getToken();

  const deleteTask = (id) => {
    toast.dismiss();

    waitToast()

    axios({
      url: `api/todo/${id}`,
      method: "DELETE",
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then((res) => {
        setTasks(tasks.filter((task) => task._id != id));

        toast.dismiss();
        sucsessToast("Task Deleted");
        
      })
      .catch((err) => {
        toast.dismiss();
        errorToast("some error occurred");

        // console.log(err);
      });
  };

  const updateTask = (id) => {
    toast.dismiss();

    if (!title) {
      setEditMode(false);
      return;
    }

    waitToast()

    const dataForApiRequest = {
      title: title,
    };

    axios({
      url: `api/todo/${id}`,
      method: "PATCH",
      data: dataForApiRequest,
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then(({ data }) => {
        
        setEditMode(false);

        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, title: data.title } : task
          )
        );
        
        setTitle("");

        toast.dismiss();
        sucsessToast("Task Updated");

      })

      .catch(function (err) {
        // console.log(err);
        toast.dismiss();
        errorToast("some error occurred");
      });
  };

  return (
    <div
      className={`${styles.task} m-1 p-1 flex flex-row justify-between items-center rounded-md`}
    >

      {editMode && (
        <div
          className={`${styles.editMode} w-full h-full flex justify-center items-center`}
        >
          <input
            className="w-full h-10 p-2  border-2 border-white border-solid  outline-none bg-transparent rounded-md text-lg my-2 ml-2"
            type="text"
            id="inputTitle"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          {/* done editing button */}
          <button
            className="bg-white rounded-md ml-3 mr-2 cursor-pointer"
            onClick={() => {
              updateTask(task._id);
            }}
          >
            <Icon
              className={styles.iconDone}
              icon="icon-park:check-correct"
              style={{
                width: "50px",
                height: "38px",
                color: "black",
              }}
            />
          </button>
        </div>
      )}

      {editMode == false && (
        <div
          className={`${styles.taskMode} w-full h-full flex justify-center items-center`}
        >
          <div
            className={`${styles.title} overflow-hidden m-1 p-2 ml-2 w-9/12 flex justify-left items-center`}
          >
            {task.title}
          </div>

          <div className={`${styles.taskButton} m-1 mr-2 flex flex-row`}>

            {/* edit button */}
            <button
              className={`${styles.edit} p-1 m-1 bg-white rounded-md cursor-pointer`}
              onClick={() => {
                setEditMode(true);
              }}
            >
              <Icon
                icon="fa-regular:edit"
                style={{
                  width: "35px",
                  height: "35px",
                  color: "black",
                }}
              />
            </button>

            {/* delete button */}
            <button
              className={`${styles.delete} p-1 m-1 bg-white rounded-md cursor-pointer`}
              onClick={() => deleteTask(task._id)}
            >
              <Icon
                icon="fluent:delete-16-filled"
                style={{
                  width: "38px",
                  height: "35px",
                  color: "black",
                }}
              />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
