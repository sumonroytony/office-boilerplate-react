import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const ResetPasswordScreen = ({ history }) => {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [message, setMessage] = useState("");
  let search = window.location.search;
  const key = search.split("=")[1];
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirm_password) setMessage("Password Do Not Match");

    axios
      .post(`http://58.84.34.65:8181/api/reset-password/`, {
        key,
        password,
        confirm_password,
      })
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        setMessage("Something went wrong");
      });
  };

  return (
    <FormContainer>
      <h1>Reset Your Password</h1>
      {message && <Message variant="success">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password again"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Set Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordScreen;
