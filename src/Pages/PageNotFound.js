import "../index.css";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="homepage">
        <Container>
          <Row>
            <Col>
              <h3>404</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>Page Not Found!</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={() => {
                  navigate("login");
                }}
              >
                Back to Civilization
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default PageNotFound;
