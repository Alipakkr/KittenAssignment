import React, { useEffect, useState } from "react";
import "./App.css"; // Importing CSS file for styling.
import { Routes, Route } from "react-router-dom"; // Importing necessary components from react-router-dom.
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom.
import Header from "./components/Header"; // Importing Header component.
import Cards from "./pages/Cards"; // Importing GamePlayArea component.
import MainLobby from "./pages/MainLobby"; // Importing MainLobby component.

const App = () => {
  let history = useNavigate(); // Using useNavigate hook for navigation.
  const [isLobby, setisLobby] = useState(true); // State variable for managing whether the user is in the lobby or not.
  const user = JSON.parse(localStorage.getItem("user")); // Getting user data from local storage.

  // Effect to redirect users based on their authentication status.
  useEffect(() => {
    if (!user) {
      history("/");
    } else {
      history("/Startgame");
    }
  }, []);

  // Function to set the lobby state.
  const setIsLobby = (value) => {
    setisLobby(value);
  };

  return (
    <div className="h-[100vh] relative overflow-hidden">
      {/* Header component */}
      <Header setIsLobby={setIsLobby} isLobby={isLobby} />

      {/* React Router Routes */}
      <Routes>
        {/* Route for the main lobby */}
        <Route
          path="/"
          exact
          element={<MainLobby setIsLobby={setIsLobby} isLobby={isLobby} />}
        />
        {/* Route for the game play area */}
        <Route
          path="/Startgame"
          exact
          element={<Cards setIsLobby={setIsLobby} isLobby={isLobby} />}
          isPrivate // Protected route
        />
      </Routes>
    </div>
  );
};
export default App;
