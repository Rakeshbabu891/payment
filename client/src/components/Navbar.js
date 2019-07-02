import React, { Component } from "react";

import { Button, Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export default class NavbarComponent extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        sticky="top"
      >
        <LinkContainer to="/">
          <Navbar.Brand>3Ding</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/upload">
                <Nav.Link>Upload</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/checkout">
                <Nav.Link>Checkout</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      // <Navbar default collapseOnSelect>
      //   <Navbar.Header>
      //     <Navbar.Brand>
      //       <Link to="/">3Ding</Link>
      //     </Navbar.Brand>
      //     <Navbar.Toggle />
      //   </Navbar.Header>
      //   <Navbar.Collapse>
      //     <Nav pullRight>
      //       <NavItem eventKey={1} componentClass={Link} to="/">
      //         Home
      //       </NavItem>
      //       <NavItem eventKey={2} componentClass={Link} to="/upload ">
      //         Upload
      //       </NavItem>
      //       <NavItem eventKey={3} componentClass={Link} to="/checkout ">
      //         Checkout
      //       </NavItem>
      //     </Nav>
      //   </Navbar.Collapse>
      // </Navbar>
    );
  }
}
