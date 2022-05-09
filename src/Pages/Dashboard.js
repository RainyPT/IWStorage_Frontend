import "../index.css";
import Header from "../Components/Header.js";
import React, { useState } from "react";
import Footer from "../Components/Footer";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";

function Dashboard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>File Title</Form.Label>
              <Form.Control type="text" autoFocus />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose File</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <Header />
      <div className="dashboard">
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <h1>Dashboard</h1>
            </Col>
            <Col>
              <Button className="rounded-circle" onClick={handleShow}>
                <b>+</b>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <hr />
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
