import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../components/Homepage/Navbar";
import note from "../assets/note3.png";

export default function Homepage() {
  return (
    <Box padding={40}>
      <Image position={"absolute"} right={40} mt={65} w={300} src={note} />
      <Heading mt={30} textAlign={"start"} size={"3xl"} color={"#B5824A"}>
  Welcome to VanillaNote ﾟ｡⋆
</Heading>

      <Heading mt={10} textAlign={"start"} size={"2xl"} color={"#F7E37B"}>
      Let's uncover the details!
      </Heading>
      <Text mt={8} maxW={"50%"} textAlign={"justify"} color={"#9D624B"}>
        
      VanillaNote App is like a friend for your thoughts
        ,simple and fun. No confusing stuff here – just tap and go! Write,
        change, and keep things in order without any head-scratching. Your notes
        follow you everywhere, so you're never far from your genius ideas.
        Finding your notes? Piece of cake. Our app is made for everyone, whether
        you're a tech whiz or just getting started. So, let's keep it easy,
        breezy, and make note-taking a total cinch. Try it out now and see how
        easy notes can be!
      </Text>
    </Box>
  );
}
