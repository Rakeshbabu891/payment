import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import Upload from "./components/Upload";
import Checkout from "./components/Checkout";
import Download from "./components/Download";
import NavbarComponent from "./components/Navbar";
// import NavbarC from "./components/NavbarComponent";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";

var orderId = 0;

class App extends Component {
  constructor(props) {
    super(props);
    console.log("The Beginning...");
    this.orderId = Date.now();
    orderId = this.orderId;
  }

  render() {
    return (
      // <Container fluid={true}>
      <Router>
        <div>
          <NavbarComponent />
          <Route exact path="/" component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/download" component={Download} />
        </div>
      </Router>
      // </Container>
    );
  }
}

export default App;
export { orderId };
