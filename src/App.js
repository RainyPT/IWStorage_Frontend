import "./index.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="homepage">
        <Container>
          <Row>
            <Col>
              <h3>Welcome to</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>IWStorage</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Your cloud storage solution!</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => navigate("dashboard")}
              >
                Start here!
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
