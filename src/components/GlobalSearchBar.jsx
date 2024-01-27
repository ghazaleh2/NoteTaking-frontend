// GlobalSearchBar.jsx

import React, { useState } from "react";
import { Input, IconButton, HStack, Box, Spacer } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const GlobalSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Trigger the search logic
    console.log("Searching for:", searchTerm);
    onSearch(searchTerm);
  };
  

  return (
    <Box mx="auto" maxW="md" mb={8}>
      <HStack spacing={2} p={2} bg="#FFFDD1" borderRadius="md">
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="xs"
          variant="unstyled"
          textAlign="center"
        />
        <IconButton
          icon={<SearchIcon />}
          onClick={handleSearch}
          size="sm"
          colorScheme="yellow"
        />
      </HStack>
      <Spacer mb={4} />
    </Box>
  );
};

export default GlobalSearchBar;
