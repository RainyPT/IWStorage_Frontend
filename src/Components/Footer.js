import "../index.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col>
            <p
              className="title_text"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              IWStorage
            </p>
          </Col>
          <Col>
            <p>by Francisco Gonçalves & Duarte Gonçalves</p>
          </Col>
          <Col>{new Date().getFullYear().toString()}</Col>
        </Row>
      </Container>
    </div>
  );
}
