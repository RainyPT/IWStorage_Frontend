import "../index.css";
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
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginReq } from "../ReqLib";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, type: "", message: "" });
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
      loginReq(userCredentials)
        .then(({ data }) => {
          console.log(data.ack);
          if (data.ack) {
            navigate("/dashboard");
          } else {
            setError({
              show: true,
              type: "warning",
              message: data.message,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
      setIsLoading(false);
    } else {
      setError({
        show: true,
        type: "warning",
        message: "Please fill all fields before trying to log in!",
      });
    }
  };
  /*useEffect(() => {
    Axios.get("http://localhost:3001/isAuth", {
      withCredentials: true,
    }).then((res) => setUsername(res.data.user[0].username));
  }, []);*/
  return (
    <>
      <Header />

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
                        Login
                      </Button>
                    </Form>
                    <Link to="/register">or Register</Link>
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

export default Login;
