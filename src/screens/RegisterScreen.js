import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [krisiCardNumber, setkrisiCardNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [thana, setThana] = useState('');
  const [message, setMessage] = useState(null);
  const [nid, setNid] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, success } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (success) {
      history.push(`/login`);
      dispatch({ type: USER_UPDATE_RESET });
    }
  }, [history, success, userInfo, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password Do Not Match');
    } else {
      dispatch(
        register(
          name,
          email,
          password,
          krisiCardNumber,
          district,
          thana,
          nid,
          phoneNumber
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
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {!userInfo ? (
          <>
            <Form.Group controlId="nid">
              <Form.Label>NID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your Nid"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number(Bkash,Nogod)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </>
        ) : (
          <Form.Group controlId="email">
            <Form.Label>Krisi Card Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Krisi Card Number"
              value={krisiCardNumber}
              onChange={(e) => setkrisiCardNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
        )}

        <Form.Group controlId="email">
          <Form.Label>District</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="thana">
          <Form.Label>Thana</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Thana"
            value={thana}
            onChange={(e) => setThana(e.target.value)}
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
