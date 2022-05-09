import "../index.css";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usernameHeaderReq } from "../ReqLib";
import { logoutReq } from "../ReqLib";

export default function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  const logout = async () => {
    logoutReq().then((res) => navigate("/"));
  };

  useEffect(() => {
    usernameHeaderReq().then(({ data }) => {
      setUsername(data.user[0].username);
    });
  }, []);
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>
          <p
            className="title_text"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            IWStorage
          </p>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Item>
            <Navbar.Text>
              {username ? (
                <>
                  Signed in as <Link to="/profile">{username}</Link>{" "}
                  <Button
                    size="sm"
                    style={{ marginLeft: "20px" }}
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
            </Navbar.Text>
          </Nav.Item>
          <Nav.Item></Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
