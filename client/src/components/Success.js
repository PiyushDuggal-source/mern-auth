import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";

const Success = () => {
  const remove = () => {
    document.getElementById("hello").style.display = "none";
  };
  return (
    <div className="container m-3" id="hello">
      <Alert status="success">
        <AlertIcon />
        <Box flex="1">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription display="block">Your Logged In.</AlertDescription>
        </Box>
        <CloseButton
          onClick={() => remove()}
          position="absolute"
          right="8px"
          top="8px"
        />
      </Alert>
    </div>
  );
};

export default Success;
