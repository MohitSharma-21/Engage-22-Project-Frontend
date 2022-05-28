import styles from "../../styles/todo/index.module.css";
import { Icon } from "@iconify/react";
import { useState } from "react";
import axios from "../../utils/axios";
import TodoListItem from "../../components/todo/TodoListItem";
import { useEffect } from "react";
import AddTodo from "../../components/todo/AddTodo";
import { useAuth } from "../../context/auth";
import useAuthRequired from '../../middlewares/useAuthRequired'
import {
  errorToast,
  infoToast,
  sucsessToast,
  warnToast,
  waitToast,
  updateToast,
} from "../../components/toast";

import { toast } from "react-toastify";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  const { getToken } = useAuth();
  const token = getToken();

  useAuthRequired(token);

  useEffect(() => {
    toast.dismiss();

    if(token){
      getAllTodos();
    }
    
  }, [token]);

  const getAllTodos = () => {
    waitToast()

    axios({
      url: "api/todo/",
      method: "GET",
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then(({ data }) => {
        
        setTasks(data);

        toast.dismiss();
      })
      .catch(function (err) {
        // console.log(err);
      });
      
  };

  return (
    <div>
      <div
        className={`m-2  flex justify-center flex-col items-center `}
      >
        <div>
          <h2 className="m-4 text-2xl font-bold">ToDo</h2>
        </div>

        <AddTodo tasks={tasks} setTasks={setTasks} getAllTodos={getAllTodos} />

        <h4 className="m-2 text-lg tracking-wide font-bold">
          Tasks to complete
        </h4>

        {tasks.length > 0 &&
          tasks.map((task, index) => {
            return (
              <TodoListItem
                key={index}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Todo;
