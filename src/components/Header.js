import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../actions/authActions";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userToken } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { error, user } = userDetails;
  let history = useHistory();
  const logoutHandler = async () => {
    const token = JSON.parse(localStorage.getItem("userToken")).access_token;
    const client_id = "m655m1x5kFgRvagNUNDDERy9nJjE0Qf5CqBsm7aX";

    const formData = new FormData();
    formData.append("client_id", client_id);
    formData.append("token", token);

    axios
      .post(`http://58.84.34.65:8181/api/auth/revoke_token/`, formData)
      .then((res) => {
        dispatch(Logout());
        history.push(`/login`);
      });
  };
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Boilerplate</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userToken ? (
                <>
                  <Navbar>
                    <NavDropdown title={user.first_name} id="username">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/change-password">
                        <NavDropdown.Item>Change Password</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Navbar>
                </>
              ) : (
                <>
                  <Navbar>
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <i className="fas fa-sign-in-alt"></i> Sign In
                      </Nav.Link>
                    </LinkContainer>
                  </Navbar>
                  <Navbar>
                    <LinkContainer to="/users/create">
                      <Nav.Link>
                        <i className="fas fa-user-plus"></i> Sign Up
                      </Nav.Link>
                    </LinkContainer>
                  </Navbar>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
