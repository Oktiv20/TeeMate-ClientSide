/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Nav.Link passhref="true" href="/">
          <Image
            src="../Images/TeeMate Final.png"
            width="105px"
            height="55rem"
            className="d-inline-block align-top"
          />
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/joinedTeeTimes">
              <Nav.Link>Joined Tee Times</Nav.Link>
            </Link>
            <Link passHref href="/teeTimes">
              <Nav.Link>All Tee Times</Nav.Link>
            </Link>
            <Link passHref href="/teeTime/new">
              <Nav.Link>Create Tee Time</Nav.Link>
            </Link>
            <Link passHref href="/players">
              <Nav.Link>Players</Nav.Link>
            </Link>
            <Link passHref href="/courses">
              <Nav.Link>Courses</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
