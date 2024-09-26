import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FaPaw, FaRegWindowClose } from "react-icons/fa"; // Importing the paw icon

interface CatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPressChat: () => void;
  cat?: {
    name: string;
    imageSrc?: string;
    personality: string;
    scenario: string;
  } | null;
  isLoggedIn: boolean;
}

// Utility function to capitalize the first letter of each word
const capitalizeWords = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const CatModal: React.FC<CatModalProps> = ({
  isOpen,
  onClose,
  cat,
  onPressChat,
  isLoggedIn,
}) => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleChatPress = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
    } else {
      onPressChat();
    }
  };

  const handleClose = () => {
    setShowLoginMessage(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      placement="center"
      backdrop="blur"
      hideCloseButton={true}
      className="modal-enter"
    >
      <ModalContent className="bg-gradient-to-br from-pink-300 via-purple-300 to-green-300 rounded-lg shadow-lg p-8 mx-4 sm:max-w-lg transition duration-300 transform hover:scale-105">
        <ModalHeader className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 drop-shadow-md">
            {cat?.name}
          </h2>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center">
          <img
            src={cat?.imageSrc}
            alt={cat?.name}
            className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-white mb-4" // Increased size here
          />
          <p className="text-xl font-semibold text-gray-800">
            {cat?.personality && capitalizeWords(cat?.personality)}
          </p>
          <p className="text-md text-gray-600 italic text-center">
            {cat?.scenario}
          </p>
          {showLoginMessage && (
            <div className="bg-white rounded-lg p-4 mt-4 shadow-md">
              <p className="text-sm text-red-500 text-center">
                🐾 Hey there! To chat with {cat?.name}, please log in. We can't
                wait to see you!
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="flex justify-between mt-4">
          <Button
            onPress={handleClose}
            className="bg-white text-gray-800 rounded-lg hover:bg-gray-200 transition duration-300 flex items-center"
          >
            <FaRegWindowClose className="h-5 w-5 mr-2" />
            Close
          </Button>
          <Button
            onPress={handleChatPress}
            className="bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-200 transition duration-300 flex items-center"
          >
            <FaPaw className="h-5 w-5 mr-2" />
            Chat Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CatModal;
