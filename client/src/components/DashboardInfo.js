import axios from "axios";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Error from "./Error";
import { Button, ListGroup, Card } from "react-bootstrap";

const DashboardInfo = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(false);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hobby, setHobby] = useState("");
  const [salary, setSalary] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in");
    } else {
      const userArr = [];
      axios
        .get(`https://mern-auth-crud.herokuapp.com/single`, {
          headers: { "x-access-token": token },
        })
        .then((response) => {
          setUserId(response.data.userId);
          console.log(response.data);
          userArr.push(response.data);
          setName(userArr[0]["name"]);
          setEmail(userArr[0]["email"]);
          setHobby(userArr[0]["hobby"]);
          setSalary(userArr[0]["salary"]);
        });
    }
  }, []);
  return error ? (
    <Error error={error} warning={warning} />
  ) : (
    <div className="container align-items-center">
      <Card>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <span style={{ fontSize: "20px", fontWeight: "500" }}>
                Name:{" "}
              </span>
              {name}
            </ListGroup.Item>
            <ListGroup.Item>
              <span style={{ fontSize: "20px", fontWeight: "500" }}>
                Email:{" "}
              </span>
              {email}
            </ListGroup.Item>
            <ListGroup.Item>
              <span style={{ fontSize: "20px", fontWeight: "500" }}>
                Hobby:{" "}
              </span>
              {hobby}
            </ListGroup.Item>
            <ListGroup.Item>
              <span style={{ fontSize: "20px", fontWeight: "500" }}>
                Salary:{" "}
              </span>
              {salary}
            </ListGroup.Item>
          </ListGroup>
          <Button
            onClick={() => navigate(`/dashboard/${userId}`)}
            className="btn-success w-100 mt-3"
          >
            Go to your Profile
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardInfo;
