import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";
import { login } from "../actions/authActions";
import Message from "../components/Message";

const LoginScreen = ({ location, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userToken } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userToken) {
      history.push(redirect);
    }
  }, [history, userToken, redirect]);
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(login(username, password));
    await dispatch(getUserDetails());
  };
  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    history.push("/forgot-password");
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Button type="submit" variant="primary">
          Sign In
        </Button>
        <Button
          onClick={forgotPasswordHandler}
          type="button"
          variant="secondary"
        >
          Forgot Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
