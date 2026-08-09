import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { readToken, removeToken } from "@/lib/authenticate";

function MainNav() {
  const router = useRouter();

  let token = readToken();

  function logout() {
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand as={Link} href="/">
            VJ Daniel Uy
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/about">
                About
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              <Button as={Link} href="/" variant="outline-light">
                <FaSearch className="me-1" />
                  Search
              </Button>
            </Nav>

            {token && (
              <Nav className="ms-auto">
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} href="/favourites">
                    Favourites
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}

            {!token && (
              <Nav className="ms-auto">
                <Nav.Link as={Link} href="/register">
                  Register
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}

export default MainNav;
