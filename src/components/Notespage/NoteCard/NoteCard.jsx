// NoteCard.jsx
import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteNotes, updateNotes } from "../../../Redux/notes/note.actions";

export default function NoteCard({ title, body, date, _id }) {
  const dispatch = useDispatch();
  const [tempTitle, setTitle] = useState(title);
  const [tempBody, setBody] = useState(body);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();

  const updateNote = () => {
    dispatch(updateNotes(_id, { title: tempTitle, body: tempBody }));
    onClose();
  };

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card bg="#F1EAAB">
      <CardBody>
        <VStack spacing={4}>
          <Heading>{tempTitle}</Heading>
          <Text>{tempBody}</Text>
          <Text fontSize="sm" color="#A88877">
            Date: {formattedDate}
          </Text>

          <Flex gap={2}>
            <>
              <Button bg="#FCFD98" onClick={onOpen}>
                Update
              </Button>

              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Update Note</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    {/* Add your input and textarea fields here */}
                    <input
                      value={tempTitle}
                      placeholder="Please enter title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      value={tempBody}
                      placeholder="Please enter description"
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button bg={"#fedb16"} mr={3} onClick={updateNote}>
                      Update
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>

            <Button
              bg={"#FFFDD1"}
              onClick={() => {
                dispatch(deleteNotes(_id));
              }}
            >
              Delete
            </Button>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
}

