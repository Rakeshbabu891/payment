import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Home extends Component {
  render() {
    return <Redirect to="/upload" />;
    // return
    // <Redirect to="/home" />;
    //   <Container>
    //     <div>Home Page</div>
    //     <Button>About</Button>
    //   </Container>
    // );
  }
}

export default Home;
