import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://58.84.34.65:8181/api/forget-password/`, { email })
      .then((res) => {
        setMessage("Please check your email");
      })
      .catch((err) => {
        setMessage("Email not found");
      });
  };
  return (
    <FormContainer>
      <h1>Forgot Password</h1>
      {message && <Message variant="success">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Reset Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;
