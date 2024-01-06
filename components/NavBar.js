/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navBarCustom">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image
            src="../Images/TeeMate Final.png"
            width="105px"
            height="55rem"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto me-auto"> {/* Use ms-auto and me-auto for centering */}
            <div
              className="pagesNav"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              <Link passHref href="/">
                <Button className="navLinkButton">Home</Button>
              </Link>
              <Link passHref href="/joinedTeeTimes">
                <Button className="navLinkButton">Joined Tee Times</Button>
              </Link>
              <Link passHref href="/teeTimes">
                <Button className="navLinkButton">All Tee Times</Button>
              </Link>
              <Link passHref href="/teeTime/new">
                <Button className="navLinkButton">Create Tee Time</Button>
              </Link>
              <Link passHref href="/players">
                <Button className="navLinkButton">Players</Button>
              </Link>
              <Link passHref href="/courses">
                <Button className="navLinkButton">Courses</Button>
              </Link>
            </div>
          </Nav>
          <Nav>
            <div className="signOutButton">
              <Button variant="danger" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
