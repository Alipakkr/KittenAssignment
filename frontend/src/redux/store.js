// Importing necessary functions and components from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing reducers for user and leaderboard
import leaderboardReducer from "./body/Stats";
import userReducer from "./body/User";

// Configuring the Redux store with combined reducers
const store = configureStore({
  reducer: {
    // Defining reducers for different slices of state
    user: userReducer, // Reducer for user-related state
    leaderboard: leaderboardReducer // Reducer for leaderboard-related state
  }
});

// Exporting the configured Redux store
export default store;
