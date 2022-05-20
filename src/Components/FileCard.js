import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import default_file_image from "../Imgs/default_file_image.png";
import { getFile, getImagePreview } from "../ReqLib";
export default function FileCard(props) {
  const handleDownload = () => {
    getFile(props.filename + props.type);
  };
  return (
    <div className="fileCardDiv">
      <Card className="fileCard">
        <Card.Img variant="top" src={default_file_image} />
        <Card.Body>
          <Card.Title>
            {atob(props.filename).split("-")[0] + props.type}
          </Card.Title>
          <Card.Text>{props.description} </Card.Text>
          <Button variant="primary" onClick={handleDownload}>
            Download
          </Button>
        </Card.Body>
        <Card.Footer>
          {props.dateadded.split("T")[0].split("-")[2] +
            "-" +
            props.dateadded.split("T")[0].split("-")[1] +
            "-" +
            props.dateadded.split("T")[0].split("-")[0] +
            " at " +
            props.dateadded.split("T")[1].split(".")[0]}
        </Card.Footer>
      </Card>
    </div>
  );
}
