import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bg from "../assets/Bgmain.jpeg";
import cardImage from "../assets/Redcard.png";
import defuseCardImg from "../assets/Defusecard.jpeg";
import explodeCard from "../assets/ExplodeCard.png";
import shuffleCard from "../assets/ShuffleCard.png";
import catCard from "../assets/Catcard.jpg";
import Logo from "../assets/Logo.webp";
import Popover from "../components/Popover";
import {
  editUserDetail,
  getUserDetail,
  updateUserPoints,
} from "../redux/body/User";

let processComplete = true;

const GamePlayArea = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [deck, setDeck] = useState([]);
  const [defuseCards, setDefuseCards] = useState([]);
  const [openedCard, setOpenedCard] = useState("");

  // Game cards
  const cards = ["CAT", "DEFUSE", "SHUFFLE", "EXPLODE"];

  useEffect(() => {
    // Fetching user details from local storage
    dispatch(getUserDetail());
    props.setIsLobby(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update game when user details are fetched
    if (!user?.deck) return;
    updateGameState();
  }, [user]);

  // Update user state with new data
  const updateUserState = (data) => {
    const { deck, defuseCards, openedCard, gameStatus } = data;
    // Dispatching action to update user's details in local storage
    dispatch(
      editUserDetail({
        username: user?.username,
        matchesWon:
          gameStatus === "Win"
            ? Number(user?.matchesWon + 1)
            : user?.matchesWon,
        deck,
        defuseCards,
        openedCard,
      })
    );

    // If user won the game then update their points in the database
    if (gameStatus === "Win") {
      dispatch(
        updateUserPoints({
          username: user?.username,
          matchesWon: user?.matchesWon + 1,
        })
      );
    }
  };

  // Send updated data to update user state
  const sendDataToUpdate = (deck, defuseCards, openedCard, gameStatus) => {
    const data = { deck, defuseCards, openedCard, gameStatus };
    updateUserState(data);
  };

  // Update game state based on user actions
  const updateGameState = () => {
    // To update game state on every user action
    if (user?.deck?.length < 5 && user?.deck?.length > 0) {
      setDeck(user?.deck);
      setDefuseCards(user.defuseCards);
      setOpenedCard(user?.openedCard);
    } else if (user?.deck.length === 5) {
      setDeck(user?.deck);
      setDefuseCards([]);
      setOpenedCard("");
    } else {
      setDeck(generateRandomDeck());
      setDefuseCards([]);
      setOpenedCard("");
    }
  };

  // Generate random deck
  const generateRandomDeck = () => {
    // To generate 5 random numbers from 0 to 3
    const c1 = Math.floor(Math.random() * 4);
    const c2 = Math.floor(Math.random() * 4);
    const c3 = Math.floor(Math.random() * 4);
    const c4 = Math.floor(Math.random() * 4);
    const c5 = Math.floor(Math.random() * 4);

    // Making random array by putting random numbers
    let randomDeck = [cards[c1], cards[c2], cards[c3], cards[c4], cards[c5]];

    // Filtering shuffle cards if it is more than 1
    let shuffleCount = 0;
    randomDeck = randomDeck.map((card) => {
      if (card === "SHUFFLE") {
        shuffleCount++;
        if (shuffleCount > 1) {
          card = "CAT";
        }
      }
      return card;
    });
    return randomDeck;
  };

  // Show message (popover) after shuffle, game over, game won
  const showMessageAndReset = (msg, btnText) => {
    setPopupVisible(true);
    setPopupData({ message: msg, btnText });
  };

  // Reveal cards after clicking card deck
  const revealCard = () => {
    if (!processComplete) return;
    processComplete = false;

    // Removing opened card from deck
    let cardsCopy = [...deck];
    const poppedCard = cardsCopy.pop();
    setOpenedCard(poppedCard);
    // Updating deck
    setDeck([...cardsCopy]);

    // If popped card is shuffle card then reset deck
    if (poppedCard === "SHUFFLE") {
      setTimeout(() => {
        sendDataToUpdate(generateRandomDeck(), [], "", "none");
      }, 700);
      showMessageAndReset("Game Shuffled", "Continue");
    } else if (poppedCard === "CAT") {
      if (!cardsCopy.length) {
        // If there are no cards left then resetting deck and firing message
        // User wins
        setTimeout(() => {
          sendDataToUpdate(generateRandomDeck(), [], "", "Win");
        }, 700);
        showMessageAndReset("Winner 🏅", "Play Again");
      } else {
        sendDataToUpdate(cardsCopy, defuseCards, poppedCard, "none");
      }
    } else if (poppedCard === "DEFUSE") {
      if (!cardsCopy.length) {
        // If there are no cards left then resetting deck and firing message
        // User wins
        setTimeout(() => {
          sendDataToUpdate(generateRandomDeck(), [], "", "Win");
        }, 700);
        showMessageAndReset("Winner 🏅", "Play Again");
      } else {
        let updatedDefuseCard = [...defuseCards];
        updatedDefuseCard.push(poppedCard);
        setDefuseCards(updatedDefuseCard);
        sendDataToUpdate(cardsCopy, updatedDefuseCard, poppedCard, "none");
      }
    } else if (poppedCard === "EXPLODE") {
      // Checking if there is a defuse card or not
      if (defuseCards.length) {
        if (!cardsCopy.length) {
          // If there are no cards left then resetting deck and firing message
          // User wins
          setTimeout(() => {
            sendDataToUpdate(generateRandomDeck(), [], "", "Win");
          }, 700);
          showMessageAndReset("Winner 🏅", "Play Again");
        } else {
          // If there is a defuse card
          let updatedDefuseCards = [...defuseCards];
          updatedDefuseCards.pop();
          setDefuseCards(updatedDefuseCards);
          sendDataToUpdate(cardsCopy, updatedDefuseCards, poppedCard, "none");
        }
      } else {
        // If there is no defuse card left
        setTimeout(() => {
          sendDataToUpdate(generateRandomDeck(), [], "", "lost");
        }, 700);
        showMessageAndReset("Game Over", "Play Again");
      }
    }
    processComplete = true;
  };

  // Return card source according to its name
  const setOpenedCardSrc = () => {
    if (openedCard === "") {
      return "";
    } else if (openedCard === "SHUFFLE") {
      return shuffleCard;
    } else if (openedCard === "DEFUSE") {
      return defuseCardImg;
    } else if (openedCard === "CAT") {
      return catCard;
    } else if (openedCard === "EXPLODE") {
      return explodeCard;
    }
  };

  const togglePreLoader = () => {
    let elem = document.getElementById("preloader");
    elem.style.display = "none";
  };

  return (
    <main className="z-40 w-full h-[89vh] py-10 xl:pt-12 px-40">
      <div
        id="preloader"
        className="w-full left-0 flex flex-col justify-center -space-y-6 items-center h-[100vh] absolute bg-[rgb(84,3,25)] top-0 z-20"
      ><img alt="" src={Logo} style={{ height: "30px", width: "30px" }}  ></img>
      </div>
      {popupVisible && (
        <Popover
          popupData={popupData}
          setPopupVisible={setPopupVisible}
          popupVisible={popupVisible}
        />
      )}
      <img
        className="absolute w-full h-[100vh] left-0 top-0 z-0"
        src={bg}
        onLoad={togglePreLoader}
        alt=""
      ></img>
      <section className="flex justify-center space-x-80 z-10 relative h-[80vh]  text-black">
        <div className="z-20 absolute max-h-44  bottom-2  w-96 ">
          <div className="text-center font-semibold">
            Click on the deck to reveal a card.
          </div>
          {deck.map((card, index) => {
            let right = index * 4;
            let top = index * 9.6;
            return (
              <img
                key={card + index}
                onClick={revealCard}
                alt=""
                style={{
                  position: "relative",
                  width: "7rem",
                  left: right.toString() + "rem",
                  bottom: top.toString() + "rem",
                }}
                src={cardImage}
              ></img>
            );
          })}
        </div>

        <section className=" flex flex-col items-center ">
          {/* <h3 className="font-semibold text-black px-7 py-3  font-bold bg-[rgb(250,159,67)] rounded-md">BOMB CARDS</h3> */}
          <h3 className="font-semibold text-black px-7 py-3  font-bold bg-[rgb(250,159,67)] rounded-md">
            {openedCard ? openedCard + " CARD" : "OPENED CARDS "}
          </h3>
          <div className="relative max-h-60 h-60 min-w-[12rem]  flex justify-center items-center">
            <div className="w-full bg-black h-60   absolute opacity-30"></div>

            {openedCard && (
              <img
                className="w-40 z-20 h-50"
                src={setOpenedCardSrc()}
                alt={openedCard}
              />
            )}
          </div>
        </section>

        <section className=" flex flex-col items-center">
          <h3 className="font-semibold text-black px-7 py-3  font-bold bg-[rgb(250,159,67)] rounded-md">BOMB CARDS</h3>
          <div className=" max-h-60 h-60 min-w-[12rem]   relative ">
            <div className="w-full bg-black h-full  absolute opacity-30"></div>

            {defuseCards.map((defuseCard, index) => {
              let right = index * 2;
              let top = index * 12.7;
              return (
                <div
                  key={defuseCard + index}
                  className=" ml-4  mt-3 defuseCard"
                >
                  <img
                    style={{
                      position: "relative",
                      width: "10rem",
                      left: right.toString() + "rem",
                      bottom: top.toString() + "rem",
                      height: "13rem",
                    }}
                    src={defuseCardImg}
                    alt="defuse-card"
                  />
                </div>
              );
            })}
            {!defuseCards?.length && (
              <div className={`openedCard ${"card-zeroState"}`}></div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

export default GamePlayArea;
