import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";
import NoteCard from "../components/Notespage/NoteCard/NoteCard";
import GlobalSearchBar from "../components/GlobalSearchBar";
import { createNotes, getNotes } from "../Redux/notes/note.actions";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function NotesPage() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.noteReducer);
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setNotes(data);
    }
  }, [data]);

  const createNote = async () => {
    try {
      await dispatch(createNotes({ title, body, date }));
      setTitle("");
      setBody("");
      setDate("");
      onClose();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleGlobalSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setNotes(data);
    } else {
      const filteredNotes = data.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setNotes(filteredNotes);
    }
  };

  // Sort the notes by date in descending order
  const sortedNotes = [...notes].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Box mt={20} padding={8}>
      <GlobalSearchBar onSearch={handleGlobalSearch} />
      <Grid gap={10} w={"90%"} margin={"auto"} gridTemplateColumns="repeat(4 ,1fr)">
        {sortedNotes?.map((note) => (
          <NoteCard key={note._id} {...note} />
        ))}
      </Grid>

      <>
        <IconButton
          boxShadow={
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
          }
          position={"fixed"}
          w={"80px"}
          h={"80px"}
          borderRadius={50}
          bg={"#FFFDD1"}
          bottom={0}
          right={0}
          onClick={onOpen}
          margin={16}
          icon={<BsPlusLg />}
        ></IconButton>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bg={"#FFFDD1"}>Create New Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Input
                value={title}
                m
                placeholder="Please enter title"
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
              <Textarea
                mt={8}
                value={body}
                placeholder={"Please enter description"}
                onChange={(e) => setBody(e.target.value)}
              ></Textarea>
              <Input
                mt={8}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button bg="#f0d2a2" mr={3} onClick={createNote}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
}
