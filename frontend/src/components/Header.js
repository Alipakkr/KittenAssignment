// Importing necessary modules and components from React and other files.
import React from "react";
import Logo from "../assets/Logo.webp"; // Importing the logo image.
import Leaderboard from "./Leaderboard"; // Importing the Leaderboard component.
import Rules from "./Rules"; // Importing the Rules component.
import { useNavigate } from "react-router-dom"; // Importing hook for programmatic navigation.
import { useSelector } from "react-redux"; // Importing hook for accessing Redux store.
import { removeItem } from "../utils/storage"; // Importing utility function for removing items from storage.

// Defining the Header component.
const Header = (props) => {
  // Accessing user data from the Redux store.
  const user = useSelector((state) => state.user);

  // Initializing the navigate hook for programmatic navigation.
  let history = useNavigate();
  const { setIsLobby, isLobby } = props;

  // Function to handle exiting the game.
  const exitGame = () => {
    // Removing user data from local storage.
    removeItem("user");
    setIsLobby(true);
    // Redirecting to the lobby page.
    history("/");
  };

  // Rendering the JSX for the Header component.
  return (
    <section className="flex relative z-10 text-white items-center justify-between">
      {!isLobby ? (
        // Rendering the logo and game title if not in the lobby.
        <div className="flex items-center">
          <img alt="" className="w-15"  style={{ height: "130px", width: "130px", marginTop: "-40px", marginLeft:"60px" }} src={Logo} />
        </div>
      ) : (
        <div></div> // Rendering nothing if in the lobby.
      )}
      {!isLobby && user?.username && (
        // Rendering user details if user is logged in and not in the lobby.
        <div className="flex space-x-8"     >
          <div className="flex bg-[rgb(250,159,67)] px-7 py-3 text-xxl rounded-md space-x-6">
            
            <p className="text-black font-bold size-xxl">Username : </p>
            <p className="font-bold  text-black">{user.username}</p>
          </div>
          <div className="flex bg-[rgb(250,159,67)] px-7 py-3 text-xxl rounded-md space-x-6">
            <p className="text-black  font-bold">Total Points :</p>
            <p className="font-bold   text-black">{user.matchesWon}</p>
          </div>
        </div>
      )}
      {/* Rendering Rules and Leaderboard components */}
      <div className="flex bg-[rgb(250,159,67)]  px-7 py-3 text-xxl rounded-md space-x-6"  >
      {/* <div className="flex text-xl px-14 py-4 space-x-8 items-center rounded-md"> */}
        <Rules />
        {!isLobby && <Leaderboard />}
        {/* Rendering Exit button */}
        {!isLobby && (
          <p onClick={exitGame} className="cursor-pointer font-xxl text-black font-bold">
            Exit
          </p>
        )}
      </div>
    </section>
  );
};

// Exporting the Header component to be used in other parts of the application.
export default Header;
