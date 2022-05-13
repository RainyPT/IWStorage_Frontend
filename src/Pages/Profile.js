import "../index.css";
import Header from "../Components/Header.js";
import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import default_user_image from "../Imgs/default_user_image.png";
function Profile() {
  let { id } = useParams();

  /*useEffect(() => {
    getUserProfile(id).then((res) => {
      setUserFiles(res.data);
    });
  }, []);*/
  return (
    <>
      <Header />
      <div className="profile">
        <Container>
          <Row>
            <Col></Col>
            <Col style={{ textAlign: "center", color: "white" }}>
              <h1>Profile</h1>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col md="12">
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={default_user_image} />
                <Card.Body>
                  <Card.Title>{id}</Card.Title>
                  <Card.Text>Descrição de {id}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
