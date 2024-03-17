import React, { useEffect } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react"; // Importing necessary Chakra UI components and hooks.

function Popover(props) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Using useDisclosure hook to manage the state of the popover.
  const { popupData, setPopupVisible } = props; // Destructuring props to access popupData and setPopupVisible function.
  const cancelRef = React.useRef(); // Creating a ref to reference the cancel button.

  // useEffect hook to open the popover when the component mounts.
  useEffect(() => {
    onOpen();
    // eslint-disable-next-line
  }, []);

  // Function to close the popover.
  const ClosePopOver = () => {
    setPopupVisible(false); // Calling setPopupVisible function to hide the popover.
    onClose(); // Closing the popover.
  };

  // Rendering the popover component.
  return (
    <div>
      {/* AlertDialog component to display the popover dialog. */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        {/* AlertDialogContent to render the content of the popover. */}
        <AlertDialogContent
          backgroundColor={"rgb(250,159,67)"}
          width={"15rem"}
        >
          {/* Content of the popover */}
          <div className="flex items-center py-8 px-2 flex-col space-y-7 text-black">
            {/* Message */}
            <p className="font-bold text-2xl">{popupData.message}</p>
            {/* Button to close the popover */}
            <button
              className="bg-[rgb(36,170,226)] px-6 font-semibold py-2 rounded-md"
              ref={cancelRef}
              onClick={ClosePopOver}
            >
              {popupData.btnText}
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Popover;
