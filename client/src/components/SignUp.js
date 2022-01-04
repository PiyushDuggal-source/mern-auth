import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button, Form, Card, Alert } from "react-bootstrap";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);

  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("pass deos not match");
    } else {
      const afunc = async () => {
        const user = await axios
          .post("http://localhost:4000/signUp", data)
          .then((response) => response.data);

        if (user.error) {
          setError(user.error);
          return;
        }
        navigate("/login");
      };
      afunc();
    }
  };
  return (
    <Card>
      <Card.Body>
        {error ? <Alert variant="danger">{error}</Alert> : ""}
        <h2 className="text-center mb-4" style={{ fontSize: "40px" }}>
          Sign Up
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group id="name">
            <Form.Label>Enter Your Name: </Form.Label>
            <Form.Control type="text" {...register("name")} required />
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>Enter Your Email: </Form.Label>
            <Form.Control type="email" {...register("email")} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Enter Your Password: </Form.Label>
            <Form.Control type="password" {...register("password")} required />
          </Form.Group>
          <Form.Group id="confirmPassword">
            <Form.Label>Confirm Your Password: </Form.Label>
            <Form.Control
              type="password"
              {...register("confirmPassword")}
              required
            />
          </Form.Group>

          <Button className="w-100 mt-3" type="submit">
            Sign Up
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignUp;
