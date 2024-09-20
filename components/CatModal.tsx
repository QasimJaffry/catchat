import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface CatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPressChat: any;
  cat: {
    name: string;
    imageSrc: string;
    personality: string;
    scenario: string;
  };
  isLoggedIn: boolean;
}

const CatModal: React.FC<CatModalProps> = ({
  isOpen,
  onClose,
  cat,
  onPressChat,
  isLoggedIn,
}) => {
  console.log(isLoggedIn, "isLoggedIn");
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      backdrop={"blur"}
      hideCloseButton={true}
      className="backdrop-blur-sm flex items-center justify-center"
    >
      <ModalContent className="bg-gradient-to-br from-purple-200 to-indigo-300 rounded-lg shadow-lg p-6 mx-4 sm:max-w-lg">
        {(onClose) => (
          <>
            <ModalHeader className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{cat?.name}</h2>
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <img
                src={cat?.imageSrc}
                alt={cat?.name}
                className="w-28 h-28 rounded-full object-cover shadow-md mb-4"
              />
              <p className="text-lg font-semibold text-gray-700">
                {cat?.personality}
              </p>
              <p className="text-md text-gray-600">{cat?.scenario}</p>
            </ModalBody>
            <ModalFooter className="flex justify-between mt-4">
              <Button onPress={onClose} className="rounded-lg">
                Close
              </Button>
              <Button
                onPress={() => {
                  if (!isLoggedIn) {
                    alert("Login first");
                  } else {
                    onPressChat();
                  }
                }}
                className="rounded-lg"
              >
                Chat Now
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CatModal;
