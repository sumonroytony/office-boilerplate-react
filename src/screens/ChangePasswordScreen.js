import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../actions/authActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
const ChangePasswordScreen = ({ location, history }) => {
  const [old_password, setOld_password] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userToken } = userLogin;
  const userChangePassword = useSelector((state) => state.userChangePassword);
  const { success, error } = userChangePassword;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (!userToken) {
      history.push(redirect);
    }
  }, [history, userToken, redirect]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) setMessage("Password Do Not Match");
    else {
      await dispatch(changePassword(password, confirm_password, old_password));
    }
  };
  return (
    <FormContainer>
      <h1>Change Password</h1>
      {message && <Message variant="danger">{message}</Message>}
      {success && <Message variant="success">Password Updated</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="old_password">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your old password"
            value={old_password}
            onChange={(e) => setOld_password(e.target.value)}
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
        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Change Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ChangePasswordScreen;
