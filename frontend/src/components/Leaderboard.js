import React, { useEffect, useState } from "react";
import { fetchUsers } from "../redux/body/Stats"; // Importing action creator for fetching users from Redux slice.
import { useDispatch, useSelector } from "react-redux"; // Importing hooks for accessing Redux store.
import { Spinner } from "@chakra-ui/react"; 
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"; // Importing components from Chakra UI for modal functionality.
import io from "socket.io-client"; // Importing socket.io-client library for real-time communication.
const ENDPOINT = "localhost:4000"; // Defining the endpoint for the socket connection.
var socket;

function Leaderboard() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Creating state for controlling modal visibility.
  const dispatch = useDispatch(); // Creating dispatcher function for dispatching Redux actions.
  const [usersDetails, setusersDetails] = useState([]); // Creating state for storing users' details.
  const data = useSelector((state) => state.leaderboard); // Accessing leaderboard data from Redux store.
  const { users, loading } = data; // Destructuring users and loading state from leaderboard data.

  // useEffect to dispatch fetchUsers action and set up socket connection on component mount.
  useEffect(() => {
    dispatch(fetchUsers()); // Dispatching action to fetch users.
    socket = io(ENDPOINT); // Establishing socket connection.
    // eslint-disable-next-line
  }, []);

  // useEffect to update users' details state when users data changes.
  useEffect(() => {
    if (users) {
      setusersDetails(users); // Updating users' details state with fetched users.
    }
  }, [users]);

  // useEffect to listen for real-time updates and fetch users data again when triggered.
  useEffect(() => {
    if (!socket) return; // Ensuring socket is initialized.
    socket.on("sendUsers", () => {
      dispatch(fetchUsers()); // Dispatching action to fetch users on receiving update event.
    });
  }, [users]);

  // Rendering the leaderboard component.
  return (
    <div>
      {/* Button to open the leaderboard modal */}
      <p className="cursor-pointer font-bold text-black" onClick={onOpen}>
        Leaderboard
      </p>
      {/* Modal component for displaying leaderboard */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          position={"relative"}
          padding="5"
          backgroundColor="transparent"
          width={"full"}
        >
          {/* Background overlay */}
          <div className="bg-[rgb(250,159,67)] w-full z-0 absolute h-full rounded-md opacity-80"></div>
          {/* Header */}
          <div className="px-20 text-black font-bold text-2xl py-2 z-10 flex items-center">
            <p> Players Leaderboard </p>
            <ModalCloseButton marginTop={"1.5rem"} />
          </div>
          {/* Leaderboard content */}
          <div className="flex flex-col pb-6  space-y-4  border-[3px] rounded-md py-2 z-10 w-[26rem] ml-4 mt-4 border-[rgb(36,170,226)] text-black">
            {/* Header row */}
            <div className="flex relative justify-between pb-2 border-b-[1px]  border-black">
              <p className="w-[50%] border-r-2 text-center font-bold">Username</p>
              <p className="w-[50%] text-center font-bold">Points</p>
            </div>
            {/* User rows */}
            <div className="max-h-[19rem]  flex flex-col  space-y-4  overflow-y-scroll styleScroll">
              {/* Display spinner while loading */}
              {loading && (
                <div className="flex justify-center h-44 items-center">
                  <Spinner />
                </div>
              )}
              {/* Display users' details */}
              {usersDetails?.length > 0 &&
                !loading &&
                usersDetails.map((user, index) => {
                  return (
                    <div
                      key={index}
                      className="flex border-2 py-[7px] hover:bg-[rgb(36,170,226)] rounded-xl mx-4 px-8 justify-between"
                    >
                      <p className="w-[50%] text-center font-bold text-black">
                        {user.username}
                      </p>
                      <p className="w-[50%] text-center font-bold  text-white">
                        {user.matchesWon}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Leaderboard;
