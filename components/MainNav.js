import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

function MainNav() {
  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand>VJ Daniel Uy</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/">
                Books
              </Nav.Link>

              <Nav.Link as={Link} href="/about">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}

export default MainNav;
