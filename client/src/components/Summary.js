import React, { Component } from "react";
import { Table, Container, Button, Row, Col } from "react-bootstrap";
import { subTotal, tax, orderTotal } from "./Table";
import { LinkContainer } from "react-router-bootstrap";
import { uploadLength } from "./Uppy";

var leadTime;

class SummaryComponent extends Component {
  constructor(props) {
    super(props);
    this.orderId = this.props.orderId;
    this.state = {
      uploadLength: uploadLength,
      subTotal: subTotal,
      tax: tax,
      orderTotal: orderTotal
    };
  }
  componentDidMount() {
    console.log("Summary Component Mounted");
    this.timer = setInterval(() => this.updateSummary(), 500);
  }
  updateSummary() {
    if (subTotal < 500) {
      leadTime = "1 Day";
    } else if (subTotal < 1000) {
      leadTime = "1-2 Days";
    } else if (subTotal < 5000) {
      leadTime = "2-3 Days";
    } else if (subTotal < 10000) {
      leadTime = "2-4 Days";
    } else {
      leadTime = "Custom";
    }

    this.setState({
      uploadLength: uploadLength,
      subTotal: subTotal,
      tax: tax,
      orderTotal: orderTotal,
      leadTime: leadTime
    });
    // console.log(
    //   "Summary",
    //   uploadLength,
    //   this.state.uploadLength,
    //   this.state.subTotal,
    //   this.state.tax,
    //   this.state.orderTotal
    // );
  }
  render() {
    return (
      <Container>
        <Row>
          <Table responsive align="center">
            <thead>
              <tr align="center">
                <th className="align-middle" colSpan="2" align="center">
                  Order Summary
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-middle">Order ID</td>
                <td className="align-middle" align="right">
                  {this.orderId}
                </td>
              </tr>
              <tr>
                <td className="align-middle"># of Files</td>
                <td className="align-middle" align="right">
                  {this.state.uploadLength}
                </td>
              </tr>
              <tr>
                <td className="align-middle">Lead Time</td>
                <td className="align-middle" align="right">
                  {this.state.leadTime}
                </td>
              </tr>
              <tr>
                <td className="align-middle">Sub Total</td>
                <td className="align-middle" align="right">
                  &#8377; {this.state.subTotal}
                </td>
              </tr>
              <tr>
                <td className="align-middle">GST 18%</td>
                <td className="align-middle" align="right">
                  &#8377; {this.state.tax}
                </td>
              </tr>
              <tr>
                <td className="align-middle">
                  <b>Total</b>
                </td>
                <td className="align-middle" align="right">
                  &#8377; {this.state.orderTotal}
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col sm={12} align="center">
            <LinkContainer to="/checkout">
              <Button
                variant="success"
                onClick={() => {
                  console.log("Checkout..");
                }}
              >
                Checkout
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SummaryComponent;
