import React, { Component } from "react";
import UppyComponent from "./Uppy";
import TableComponent from "./Table";
import SummaryComponent from "./Summary";
import { orderId } from "../App.js";
import { Container, Row, Col } from "react-bootstrap";
// import App from "../App";

class Upload extends Component {
  constructor(props) {
    super(props);
    // this.orderId = `orderid_${Date.now()}`;
    this.orderId = orderId;

    this.state = {};

    console.log("OrderId:", this.orderId);
    // console.log("This:", this);
  }
  componentDidMount() {
    // console.log("App Started");
  }
  render() {
    return (
      <Container>
        <br />
        <Row>
          <Col sm={9} xs={12}>
            <UppyComponent orderId={this.orderId} />
          </Col>
          <Col sm={3} xs={12}>
            {/* Order Summary */}
            <SummaryComponent orderId={this.orderId} />
          </Col>
        </Row>
        <TableComponent orderId={this.orderId} />

        {/* <SummaryComponent /> */}
      </Container>
    );
  }
}

export default Upload;
