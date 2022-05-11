import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import default_file_image from "../Imgs/default_file_image.png";
import { getFile } from "../ReqLib";
export default function FileCard(props) {
  const handleDownload = () => {
    getFile(props.filename);
  };
  return (
    <div className="fileCardDiv">
      <Card
        style={{ width: "250px" }}
        className="fileCard"
        onClick={handleDownload}
      >
        <Card.Img variant="top" src={default_file_image} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description} </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
