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
    file: null,
    description: "",
  });
  const [isError, setIsError] = useState({ show: false, message: "" });

  useEffect(() => {
    getUserFiles().then((res) => {
      setUserFiles(res.data);
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setIsError({ show: false, message: "" });
  };
  const handleShow = () => setShow(true);
  const handleUpload = () => {
    if (file2Upload.description.length > 0 && file2Upload.file != null) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("description", file2Upload.description);
      formData.append("uploaded_file", file2Upload.file);
      fileUploadReq(formData)
        .then(({ data }) => {
          setIsLoading(false);
          if (data.ack) {
            handleClose();
            getUserFiles().then((res) => {
              setUserFiles(res.data);
            });
          } else {
            setIsError({ show: true, message: "Duplicated file name!" });
          }
        })
        .catch((e) => alert("Something went very wrong!"));
    } else {
      setIsError({ show: true, message: "Fill all Fields!" });
    }
  };
  const onFileChange = (e) => {
    setFile2Upload((prevState) => ({
      ...prevState,
      file: e.target.files[0],
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
          {isError.show ? (
            <Alert variant="warning">{isError.message}</Alert>
          ) : (
            <></>
          )}
          <Form>
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
                maxLength={200}
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
                    filename={uf.filename}
                    type={uf.type}
                    description={uf.description}
                    dateadded={uf.DateAdded}
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
