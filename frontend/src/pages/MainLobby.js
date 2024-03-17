import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { request } from "../api/request";
import { setItem } from "../utils/storage";
import { setToast } from "../utils/taost"; 
import mainimg from "../assets/Kitten.jpeg";
import Logo from "../assets/Logo.webp";

const MainLobby = (props) => {
  const [username, setUsername] = useState("");
  const { setIsLobby } = props;
  const history = useNavigate(); 
  const toast = useToast();

  // On clicking start game button
  const startGame = async () => {
    // If user clicks button without entering username
    const button = document.getElementById("button");
    if (!username) {
      setToast(toast, "PLEASE", "Enter username to start the game"); 
      return;
    }

    button.value = "STARTING...";
    const response = await request("POST", "/users/createUser", { username });

    if (response.success) {
      setItem("user", response.data);
      setIsLobby(false);
      button.value = "START GAME";
      history("/Startgame");
    }
  };

  const togglePreLoader = () => {
    const elem = document.getElementById("preloader");
    elem.style.display = "none";
  };

  return (
    <main className="flex w-full items-center h-[87vh] justify-end custom-main">
      <div
        id="preloader"
        className="w-full flex flex-col justify-center -space-y-6 items-center h-[100vh] absolute bg-[rgb(36,170,226)] top-0 z-20"
      >
        <img alt="logo" src={Logo}></img>
      </div>
      <img
        alt="Background"
        className="absolute w-full h-[100vh] top-0 z-0"
        src={mainimg}
        onLoad={togglePreLoader}
      ></img>
      <div
        className="z-10  flex flex-col   border-[black] bg-[rgb(36,170,226)] justify-center
         space-y-8 mr-60 rounded-lg px-6 h-72 
         "
      >
        <p className=" text-2xl -mb-4  font-bold text-black">Let's Start the Game</p>
        <input
          type="text"
          placeholder="Enter Your name"
          className="w-80 px-4 py-2  outline-none rounded-lg"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="button"
          value="START GAME"
          id="button"
          className="bg-white rounded-lg w-full py-2 font-bold cursor-pointer  "
          onClick={startGame}
        />
      </div>
    </main>
  );
};

export default MainLobby;
