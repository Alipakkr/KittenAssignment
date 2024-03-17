import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"; // Importing necessary Chakra UI components and hooks.

function Rules() {
  // Using useDisclosure hook to manage the state of the modal.
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Rendering the Rules component.
  return (
    <div>
      {/* Button to open the modal */}
      <p className="cursor-pointer font-bold text-black" onClick={onOpen}>
        Game Rules
      </p>
      {/* Modal component to display the game rules */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {/* ModalContent to render the content of the modal */}
        <ModalContent position={"relative"} backgroundColor="transparent">
          {/* Background overlay */}
          <div className="bg-[rgb(250,159,67)] w-full z-0 absolute h-full rounded-md opacity-80"></div>
          {/* Header */}
          <div className="px-28 text-black font-bold text-2xl py-2 z-10 flex items-center">
            <p> 👾Game Rules👾 </p>
            {/* Close button */}
            <ModalCloseButton />
          </div>
          {/* List of game rules */}
          <ul className="list-disc z-10 px-10 pb-4 text-lg font-semibold space-y-3 text-black">
            {/* Rule 1 */}
            <li>
              🐱 If a cat card is drawn from the deck, it's removed from play.
            </li>
            {/* Rule 2 */}
            <li>
              💣 If an exploding kitten (bomb) card is drawn, the player loses the game.
            </li>
            {/* Rule 3 */}
            <li>
              🔧 If a defusing card is drawn, it's removed from the deck. This card can be used to defuse one bomb that might appear in future draws.
            </li>
            {/* Rule 4 */}
            <li>
              🔄 If a shuffle card is drawn, the game restarts, and the deck is replenished with 5 new cards.
            </li>
          </ul>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Rules;
