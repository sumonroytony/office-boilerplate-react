import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";

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
    getData();
  }, [dispatch, history, userToken, user]);

  const getData = async () => {
    if (!userToken) {
      history.push("/login");
    } else {
      if (!user.email) await dispatch(getUserDetails());

      setEmail(user.email);
      setPhone(user.phone);
      setFirst_name(user.first_name);
      setLast_name(user.last_name);
    }
  };
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

  const profileImageHandler = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("userToken")).access_token;
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    await axios
      .post(`http://58.84.34.65:8181/api/upload-avatar/`, formData, config)
      .then((res) => {
        dispatch(getUserDetails());
        setMessage("Profile picture updated successfully");
      })
      .catch((err) => {
        setMessage("Something went wrong");
      });
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="success">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {user.avatar_thumb ? (
          <>
            <Image
              thumbnail
              src={`http://58.84.34.65:8181${user.avatar_thumb}`}
            />
            <input
              accept="image/png, image/jpeg"
              type="file"
              onChange={profileImageHandler}
            />
          </>
        ) : (
          <>
            <Image thumbnail src={`logo192.png`} />
            <input
              accept="image/png, image/jpeg"
              type="file"
              onChange={profileImageHandler}
            />
          </>
        )}

        <Form onSubmit={submitHandler}>
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
