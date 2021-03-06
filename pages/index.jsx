import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/auth";
import axios from "../utils/axios";

export default function Home() {
  const [user, setUser] = useState("");
  const { getToken } = useAuth();
  const token = getToken();

  useEffect(() => {

    const getUser = () =>{
      axios({
        url: "api/auth/profile",
        method: "GET",
        headers: {
          Authorization: "Token " + token,
        },
      })
        .then(({ data }) => {
          
          setUser(data.username);
        })

        .catch(function (err) {
          // console.log(err);
        }); 
    }

    if (token) {
      getUser()
    }

  }, [token]);

  return (
    <div className={styles.container}>
      <div className={`${styles.main} flex justify-center items-center`}>
        <div
          className={`${styles.heading} text-center flex flex-col justify-center items-center`}
        >
          {token && (
            <h1 className="w-9/12 pb-2 font-bold text-3xl border-b-4 border-solid border-white rounded">
              Welcome {user}...
            </h1>
          )}

          {!token && (
            <h1 className="w-9/12 pb-2 font-bold text-4xl border-b-4 border-solid border-white rounded">
              Welcome...
            </h1>
          )}

          <div className="p-1 font-bold text-lg tracking-wider">
            Here you can manage your Pictures and ToDos too....
          </div>
        </div>
      </div>
    </div>
  );
}
