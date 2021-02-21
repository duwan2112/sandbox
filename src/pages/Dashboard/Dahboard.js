import React from "react";
import {Container, Row, Col} from "reactstrap";
export default function Dashboard() {
  return (
    <Container>
      {" "}
      <Row>
        {" "}
        <Col md={12}>
          <h3 className="page-title">hello Dashboard</h3>
        </Col>{" "}
      </Row>{" "}
    </Container>
  );
}
