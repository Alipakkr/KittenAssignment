import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { getItem } from "../../utils/storage"; // Importing utility function to retrieve data from local storage
import { request } from "../../api/request"; // Importing API request function
import { fetchUsers } from "./Stats"; // Importing action creator to fetch users from the server

const ENDPOINT = "https://kittenassignment.onrender.com/";
var socket;

// Creating a user slice using createSlice from Redux Toolkit
const userSlice = createSlice({
  name: "user",
  initialState: {
    defuseCards: [], // Array to store defuse cards
    openedCard: "", // Currently opened card
    deck: [], // Deck of cards
  },
  reducers: {
    // Reducer function to handle getting user details
    get_user(state, action) {
      if (action.payload.deck) {
        return action.payload; // If deck is present in payload, return entire payload
      } else {
        return {
          ...state,
          username: action.payload.username,
          matchesWon: action.payload.matchesWon,
        }; // If deck is not present, update username and matchesWon
      }
    },
    // Reducer function to handle saving won game
    save_won_game(state, action) {
      return { ...state, user: action.payload };
    },
  },
});

// Exporting the reducer function generated by createSlice
export default userSlice.reducer;

// Exporting action creators
export const { get_user, save_won_game } = userSlice.actions;

// Thunk action creator to fetch user details
export function getUserDetail() {
  return async function getUserDataThunk(dispatch, getstate) {
    const user = getItem("user"); // Retrieve user details from local storage
    dispatch(get_user(user)); // Dispatch action to update user details in state
  };
}

// Thunk action creator to edit user details
export function editUserDetail(userData) {
  return async function editUserDataThunk(dispatch, getstate) {
    localStorage.setItem("user", JSON.stringify(userData)); // Update user details in local storage
    dispatch(get_user(userData)); // Dispatch action to update user details in state
  };
}

// Thunk action creator to update user points
export function updateUserPoints(userData) {
  return async function updateUserPointsThunk(dispatch, getstate) {
    let reqbody = JSON.stringify({
      username: userData.username,
      matchesWon: userData.matchesWon,
    }); // Prepare request body
    let response = await request("PUT", "/users/updateUser", reqbody); // Make request to update user points

    if (response.success) {
      socket = io(ENDPOINT); // Connect to Socket.IO server
      dispatch(fetchUsers()); // Dispatch action to fetch updated users from the server
      socket.emit("updateLeaderBoard"); // Emit event to update leaderboard
    }
  };
}
