import React from "react";
// import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Error = ({ warning, error }) => {
  const navigate = useNavigate();

  return (
    <div className="container m-2">
      <Card>
        <Card.Body>
          <div className="container m-2">
            <Alert status={warning ? "warning" : "error"}>
              <AlertIcon />
              {error}
            </Alert>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="btn w-100 mt-3 btn-danger"
          >
            Login
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Error;
