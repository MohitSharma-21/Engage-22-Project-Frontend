import ParticleBackground from "../components/ParticleBackground";
import Navbar from "./Navbar";
import LoadModel from "./LoadModel";
import { useState } from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  return (
    <div>
      <Head>
        <title>Pictures and ToDo Manager</title>
        <meta name="description" content="Here you can manage your Pictures and TODOs. This website uses Face-recognition for your pictures classification and for user authentication too." />
      </Head>

      <ToastContainer
        theme="dark"
        position="bottom-right"
        limit={5}
        draggablePercent={60}
        autoClose={2000}
        pauseOnFocusLoss={false}
      />

      {isModelLoaded && (
        <div>
          <Navbar />
          {children}
          <ParticleBackground />
        </div>
      )}
      
      {!isModelLoaded && (
        <div className=" h-screen flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold tracking-wide text-black ">
            Please wait...
          </h1>
          <h1 className="text-4xl font-bold tracking-wide text-black ">
            Loading Models....
          </h1>
        </div>
      )}

      <LoadModel isModelLoaded={isModelLoaded} setIsModelLoaded={setIsModelLoaded} />
    </div>
  );
};

export default Layout;
