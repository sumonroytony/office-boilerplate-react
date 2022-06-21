import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const RegisterScreen = ({ location, history }) => {
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, success } = userRegister;

  useEffect(() => {
    if (success) {
      history.push(`/login`);
      dispatch({ type: USER_UPDATE_RESET });
    }
  }, [history, success, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setMessage("Password Do Not Match");
    } else {
      dispatch(
        register(
          username,
          email,
          password,
          confirm_password,
          first_name,
          last_name,
          phone
        )
      );
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirm_password">
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign Up
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
