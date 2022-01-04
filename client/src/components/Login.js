import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Alert, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios.post("http://localhost:4000/login", data).then((response) => {
      const retrievedData = response.data;

      if (retrievedData.status !== "ok") {
        setError("invalid Email or Password");
      } else if (retrievedData.user) {
        localStorage.setItem("token", retrievedData.user);
        navigate(`/dashboard/${retrievedData.userId}`);
      }
    });
  };
  return (
    <Card>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <h2 className="text-center mb-4" style={{ fontSize: "40px" }}>
          Log In
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group id="email">
            <Form.Label>Enter Your Email: </Form.Label>
            <Form.Control type="email" {...register("email")} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Enter Your Password: </Form.Label>
            <Form.Control type="password" {...register("password")} required />
          </Form.Group>
          <Button className="w-100 mt-3" type="submit">
            Log In
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
