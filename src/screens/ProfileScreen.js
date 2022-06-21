import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userToken } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userToken) {
      history.push("/login");
    } else {
      setEmail(user.email);
      setPhone(user.phone);
      setFirst_name(user.first_name);
      setLast_name(user.last_name);
    }
  }, [dispatch, history, userToken, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setMessage("Password Do Not Match");
    } else {
      dispatch(
        updateUserProfile({
          first_name,
          last_name,
          phone,
        })
      );
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        <Form onSubmit={submitHandler}>
          {/* <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group> */}
          <Form.Group controlId="first_name">
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
              readOnly
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              value={phone}
              readOnly
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* <Form.Group controlId="password">
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
          </Form.Group> */}
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
