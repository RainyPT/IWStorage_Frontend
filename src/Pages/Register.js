import "../index.css";
import Axios from "axios";
import Header from "../Components/Header.js";
import React, { useState } from "react";
import Footer from "../Components/Footer";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Modal,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerReq } from "../ReqLib";
function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, type: "", message: "" });
  const [justRegistered, setJustRegistered] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const login = () => {
    if (
      userCredentials.username.length > 0 &&
      userCredentials.password.length > 0
    ) {
      setIsLoading(true);
      registerReq(userCredentials).then(({ data }) => {
        if (data.ack === 1) {
          setIsLoading(false);
          setJustRegistered(true);
        } else {
          setError({
            show: true,
            type: "warning",
            message: data.message,
          });
        }
      });
    } else {
      setError({
        show: true,
        type: "warning",
        message: "Please fill all fields before trying to register!",
      });
    }
  };

  return (
    <>
      <Header />

      <Modal
        size="sm"
        show={justRegistered}
        onHide={() => setJustRegistered(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Thank you for using our web app!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Congrats on registering! You can now log in and fully enjoy our web
          app!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="login">
        {error.show ? (
          <Alert
            onClose={() => setError({ show: false })}
            variant={error.type}
            dismissible
          >
            {error.message}
          </Alert>
        ) : (
          <></>
        )}
        <Container>
          <Row>
            <Col>
              <div className="centerdiv">
                {isLoading ? (
                  <Spinner animation="grow" />
                ) : (
                  <div className="formbox rounded">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Username"
                          onChange={(e) => {
                            setUserCredentials((prevState) => ({
                              ...prevState,
                              username: e.target.value,
                            }));
                          }}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={(e) => {
                            setUserCredentials((prevState) => ({
                              ...prevState,
                              password: e.target.value,
                            }));
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <Button variant="primary" onClick={login}>
                        Register
                      </Button>
                    </Form>
                    <Link to="/login">or Login</Link>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Register;
