import "../index.css";
import Header from "../Components/Header.js";
import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Spinner,
  Alert,
  FormControl,
} from "react-bootstrap";
import { fileUploadReq, getUserFiles } from "../ReqLib";
import FileCard from "../Components/FileCard";

function Dashboard() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userFiles, setUserFiles] = useState([]);
  const [file2Upload, setFile2Upload] = useState({
    title: "",
    file: null,
    description: "",
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getUserFiles().then((res) => {
      setUserFiles(res.data);
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setIsError(false);
  };
  const handleShow = () => setShow(true);
  const handleUpload = () => {
    if (
      file2Upload.title.length > 0 &&
      file2Upload.description.length > 0 &&
      file2Upload.file != null
    ) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", file2Upload.title);
      formData.append("description", file2Upload.description);
      formData.append("uploaded_file", file2Upload.file);
      fileUploadReq(formData)
        .then((res) => {
          setIsLoading(false);
          handleClose();
          window.location.reload();
        })
        .catch((e) => alert("Something went very wrong!"));
    } else {
      setIsError(true);
    }
  };
  const onFileChange = (e) => {
    setFile2Upload((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  };
  const onFileTitleChange = (e) => {
    setFile2Upload((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  const onFileDescChange = (e) => {
    setFile2Upload((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isError ? (
            <Alert variant="warning">Please fill all fields</Alert>
          ) : (
            <></>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>File Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={onFileTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose File</Form.Label>
              <Form.Control
                type="file"
                name="uploaded_file"
                onChange={onFileChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={onFileDescChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <>Upload</>
            )}
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
            <Col>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-primary">Search</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            {userFiles.length > 0 ? (
              userFiles.map((uf, index) => (
                <Col key={index} md="4">
                  <FileCard
                    title={uf.title}
                    filename={uf.filename}
                    description={uf.description}
                  />
                </Col>
              ))
            ) : (
              <Col>
                <h1>You dont got files D:!</h1>
              </Col>
            )}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
