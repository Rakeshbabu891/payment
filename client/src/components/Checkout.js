import React, { Component } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { subTotal, tax, orderTotal } from "./Table";
import { uploadLength } from "./Uppy";
import { LinkContainer } from "react-router-bootstrap";
import "./checkout.css";
// import Razorpay from "razorpay";
import axios from 'axios';

class Checkout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
        name:null,
        email:null,
        mobile:null,
        company:null,
        billing_address:null,
        shipping_address:null,
        gst:null,
        city:null,
        pin:null,
        state:null,
        s_name:null,
        s_email:null,
        s_mobile:null,
        s_company:null,
        s_billing_address:null,
        s_shipping_address:null,
        s_gst:null,
        s_city:null,
        s_pin:null,
        s_state:null,
        s_orderId:this.props.orderId,
        s_subTotal:subTotal, 
        s_tax:tax, 
        s_orderTotal:orderTotal,
        s_uploadLength :uploadLength,
        payment_id:null,
        isChecked: false,

      //   options : {
      //     "key_id": "rzp_test_eZln52nrAZCA7H", // Enter the Key ID generated from the Dashboard
      //     "key_secret": 'Sx83pWUnx6xZcWCicGO3YmN7',
      //     "amount": "2000", // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      //     "currency": "INR",
      //     "name": "3ding",
      //     "description": "nothing",
      //     "image": "https://example.com/your_logo",
      //     // "order_id": "order_9A33XWu170gUtm",//Order ID is generated as Orders API has been implemented. Refer the Checkout form table given below
      //     "handler": function (response){
      //         alert(response.razorpay_payment_id);
      //     },
      //     "prefill": {
      //         "name": "rakesh",
      //         "email": "rakeshbabu891@gmail.com"
      //     },
      //     "notes": {
      //         "address": "chennai"
      //     },
      //     "theme": {
      //         "color": "#F37254"
      //     }
      // }
      }
    
  }




 


submitHandler=(event)=>{
event.preventDefault()

console.log(this.state)

// axios.post("http://localhost:5000/user", this.state)
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });

axios.post("http://localhost:5000/orders", this.state)
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

                     }
inputChangerHandler=(event)=>{
event.preventDefault()
console.log(event.target.value)
this.setState({
   [event.target.name]:event.target.value
 
})
}
toggleChange = () => {
  // console.log("check:",this.state.isChecked)
  if(this.state.isChecked == false)
  {
    // this.state.s_name=null
    // this.state.s_email=null
    //   this.state.s_mobile=null
    //   this.state.s_company=null
    //   this.state.s_billing_address=null
    //   this.state.s_shipping_address=null
    //   this.state.s_gst=null
    //   this.state.s_city=null
    //   this.state.s_pin=null
    //   this.state.s_state=null
    
    this.setState({
      s_name:null,
     s_email:null,
    s_mobile:null,
    s_company:null,
    s_billing_address:null,
    s_shipping_address:null,
    s_gst:null,
    s_city:null,
    s_pin:null,
    s_state:null,
      
    })
      console.log("s_name:null=",this.state.s_name)
    
  
  }
}

copyValueHandler=(event)=>{
   
  // console.log("check1:",this.state.isChecked)
  // this.setState({
  //   isChecked: !this.state.isChecked,
  // });
  this.state.isChecked= !this.state.isChecked
  if(this.state.isChecked == true)
  {
  this.setState({
    s_name:this.state.name,
    s_email:this.state.email,
    s_mobile:this.state.mobile,
    s_company:this.state.company,
    s_shipping_address:this.state.billing_address,
    s_gst:this.state.gst,
    s_city:this.state.city,
    s_pin:this.state.pin,
    s_state:this.state.state,
    
  })
  console.log("s_name:copy=",this.state.s_name)
 }
}

razorpayHandler=(e)=>{
   console.log(this.state.s_orderTotal);
//  let total = this.amount.toString();
  e.preventDefault();
  let options = {
     
      "key": "rzp_test_eZln52nrAZCA7H",
      "amount": this.state.s_orderTotal, // 2000 paise = INR 20, amount in paisa
      "name": this.state.name,
      "description": "ordered Items",
      "image": "/your_logo.png",
      "handler": function (response){
        alert(response.razorpay_payment_id);
        this.state.payment_id=response.razorpay_payment_id;
      },
      "prefill": {
        "name": this.state.name,
        "email": this.state.email
      },
      "notes": {
        "address": "Hello World"
      },
      "theme": {
        "color": "#F37254"
      }
    }
   
    let rzp = new window.Razorpay(options);
    rzp.open();
  console.log("payment_id",this.state.payment_id);
}




componentDidMount () {
  const script = document.createElement("script");

  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;

  document.body.appendChild(script);
}





  render() {
  
    return (
      <Container>
        {/* <button id="rzp-button1" >Pay</button> */}
       
        <Form onSubmit={this.submitHandler}>
          <br />
          <br />
          <Row>
            <Col sm={6} xs={12} align="center">
              <h3>Billing Details</h3>
              <br />

              <Row>
                <Col sm={4} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="name" onChange={this.inputChangerHandler}  placeholder="Full Name" />
                  {/* Name */}
                </Col>

                <Col sm={5} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="email" onChange={this.inputChangerHandler}  placeholder="Email ID" />
                </Col>
                <Col sm={3} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="mobile" onChange={this.inputChangerHandler}  placeholder="Mobile #" />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={8} xs={12} align="center">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Company Name"
                    name="company"
                    onChange={this.inputChangerHandler} 
                  />
                </Col>
                <Col sm={4} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="gst" onChange={this.inputChangerHandler}  placeholder="GST #" />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12} xs={12} align="center">
                  <Form.Control
                    size="sm"
                    as="textarea"
                    rows="3"
                    placeholder="Billing Address"
                    name="billing_address"
                    onChange={this.inputChangerHandler} 
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={4} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="city" onChange={this.inputChangerHandler}  placeholder="City" />
                  {/* Name */}
                </Col>
                <Col sm={3} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="pin" onChange={this.inputChangerHandler}  placeholder="PIN" />
                </Col>
                <Col sm={5} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="state" onChange={this.inputChangerHandler}  placeholder="State" />
                </Col>
              </Row>
            </Col>
            {/*  */}
            {/*  */}
            {/* Shipping Details */}
            {/*  */}
            {/*  */}

          
            <Col sm={6} xs={12} align="center">
              <h3>Shipping Details</h3>
              
              <Row>
              <Col sm={12} xs={12} align="center">
              <div>
            <input type="checkbox"
            defaultChecked={this.state.isChecked}
            onClick={this.copyValueHandler}
            onChange={this.toggleChange}
          /><em>click here to copy values from billing details</em>
          </div>
                </Col>
             
              </Row>
             
              <Row>
                <Col sm={4} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="s_name" value={this.state.s_name} onChange={this.inputChangerHandler}  placeholder="Full Name" />
                  {/* Name */}
                </Col>
              

                <Col sm={5} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="s_email" value={this.state.s_email} onChange={this.inputChangerHandler}  placeholder="Email ID" />
                </Col>
                <Col sm={3} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="s_mobile" value={this.state.s_mobile} onChange={this.inputChangerHandler}  placeholder="Mobile #" />
                </Col>
              </Row>
             
              <br />

              
              <Row>
                <Col sm={12} xs={12} align="center">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Company Name"
                    name="s_company"
                    value={this.state.s_company}
                    onChange={this.inputChangerHandler} 
                  />
                </Col>
                {/* <Col sm={4} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="s_gst" value={this.state.s_gst} placeholder="GST #" />
                </Col> */}
              </Row>
              <br />
              <Row>
                <Col sm={12} xs={12} align="center">
                  <Form.Control
                    size="sm"
                    as="textarea"
                    rows="3"
                    placeholder="Shipping Address"
                    name="shipping_address"
                    value={this.state.s_shipping_address}
                    onChange={this.inputChangerHandler} 
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={4} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="s_city" value={this.state.s_city} onChange={this.inputChangerHandler}  placeholder="City" />
                  {/* Name */}
                </Col>
                <Col sm={3} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="s_pin"  value={this.state.s_pin} onChange={this.inputChangerHandler}  placeholder="PIN" />
                </Col>
                <Col sm={5} xs={12} align="center">
                  <Form.Control size="sm" type="text" name="s_state" value={this.state.s_state} onChange={this.inputChangerHandler}  placeholder="State" />
                </Col>
              </Row>

            </Col>
          </Row>
          <br />
        <br />
        <h5 align="center">Order Total: {orderTotal}</h5>
        <br />

        <Row>
          <Col sm={12} align="center">
            {/* <LinkContainer to="/home">
              <Button
                // bsStyle={border-radius: 0;background: red;}
                variant="success"
                onClick={() => {
                  console.log("Payment", 100);
                }}
              >
                Proceed to Payment
              </Button>
            </LinkContainer> */}
            <button type="submit" onClick={this.razorpayHandler}>Proceed to payment</button>
          </Col>
        </Row>
        </Form>

      </Container>
    );
  }
}

export default Checkout;

// import React from 'react';
// import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import { Panel, PanelGroup, Accordion } from 'react-bootstrap';

// const panels = {
//   backgroundImage: 'none',
//   color: 'white',
//   backgroundColor: 'red',
//   borderColor: '#ddd',
//   fontSize: '18px'
// }
// const sb = {
//   paddingLeft: '20px',
// }
// const btnDanger = {
//   backgroundColor: 'Red',
//   borderColor: 'Red',
//   borderRadius: '0',
// }

// const fs = {
//   width: '137px',

// }
// const fs2 = {
//   width: '137px',
//   marginLeft: '2px',
// }

// const fs3 = {
//   width: '134px',
//   marginLeft: '2px',
// }
// const fullfs = {
//   paddingBottom: '7px'
// }

// export default class Contact extends React.Component {
//   handleChange() {
//     var name = document.getElementById("name").value;
//     var email = document.getElementById("email").value;
//     var phone = document.getElementById("phone").value;
//     var address = document.getElementById("address1").value;
//     var city = document.getElementById("city").value;
//     var state = document.getElementById("state").value;
//     var pincode = document.getElementById("pincode").value;
//     document.getElementById("email2").value = email;
//     document.getElementById("phone2").value = phone;
//     document.getElementById("address2").value = address;
//     document.getElementById("city2").value = city;
//     document.getElementById("state2").value = state;
//     document.getElementById("pincode2").value = pincode;

//   }
//   proceed() {
//     var Name = document.getElementById('name').value;
//     var Email = document.getElementById('email').value;
//     var Phone = document.getElementById("phone").value;
//     var Address = document.getElementById("address1").value;
//     var City = document.getElementById("city").value;
//     var State = document.getElementById("state").value;
//     var Pincode = document.getElementById("pincode").value;
//     fetch('http://localhost:3000/addRequests', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: Name,
//         email: Email,
//         phone: Phone,
//         address: Address,
//         city: City,
//         state: State,
//         pincode: Pincode

//       }),

//     })
//   }
//   render() {

//     return (
//       <div id="contactform">
//         <Container fluid>
//           <br></br>
//           <br></br>
//           <Row>
//             <Col sm="2"></Col>
//             <Col sm="4">
//               <Panel>
//                 <Panel.Heading style={panels}>Billing Details</Panel.Heading>
//                 <Panel.Body>
//                   <Form inline style={fullfs}>
//                     <div>

//                       <FormGroup>

//                         <Input type="name" name="name" id="name" placeholder="Name" style={fs} />

//                       </FormGroup>
//                       <FormGroup>

//                         <Input type="name" name="email" id="email" placeholder="Email" style={fs2} />
//                       </FormGroup>
//                       <FormGroup>

//                         <Input type="number" name="phone" id="phone" placeholder="Phone Number" style={fs3} />
//                       </FormGroup>
//                     </div>
//                   </Form>
//                   <Form>
//                     <FormGroup>

//                       <Input type="name" name="companyName" id="cn" placeholder="Company Name" />
//                     </FormGroup>
//                     <FormGroup>

//                       <Input type="name" name="gst" id="gst" placeholder="GST" />
//                     </FormGroup>
//                     <FormGroup>

//                       <Input type="textarea" name="text" id="address1" placeholder="Address" />
//                     </FormGroup>
//                     <FormGroup>

//                       <Input type="name" name="city" id="city" placeholder="City" />
//                     </FormGroup>
//                     <FormGroup>
//                       <Input type="select" name="selectMulti" id="state">

//                         <option>State</option>
//                         <option>Andhra Pradesh</option>
//                         <option>Arunachal Pradesh</option>
//                         <option>Assam</option>
//                         <option>Bihar</option>
//                         <option>Chhattisgarh</option>
//                       </Input>
//                     </FormGroup>

//                     <FormGroup>
//                       <Input type="name" name="city" id="pincode" placeholder="Pincode" />
//                     </FormGroup>
//                   </Form>
//                 </Panel.Body>
//               </Panel>
//             </Col>
//             <Col sm="4">
//               <Panel>
//                 <Panel.Heading style={panels}>Shipping Details</Panel.Heading>
//                 <Panel.Body>
//                   <Form>
//                     <FormGroup check>

//                       <Input type="checkbox" onClick={this.handleChange} />

//                       <p style={sb}>Shipping same as Billing</p>

//                     </FormGroup>

//                     <FormGroup>

//                       <Input type="name" name="email" id="email2" placeholder="Email" />
//                     </FormGroup>
//                     <FormGroup>

//                       <Input type="name" name="password" id="phone2" placeholder="Phone Number" />
//                     </FormGroup>
//                     <FormGroup>

//                       <Input type="textarea" name="text" id="address2" />
//                     </FormGroup>
//                     <FormGroup>

//                       <Input type="name" name="city2" id="city2" placeholder="City" />
//                     </FormGroup>
//                     <FormGroup>
//                       <Input type="select" name="selectMulti" id="state2">

//                         <option>State</option>
//                         <option>Andhra Pradesh</option>
//                         <option>Arunachal Pradesh</option>
//                         <option>Assam</option>
//                         <option>Bihar</option>
//                         <option>Chhattisgarh</option>

//                       </Input>
//                     </FormGroup>
//                     <FormGroup>

//                       <Input type="name" name="pincode2" id="pincode2" placeholder="Pincode" />
//                     </FormGroup>
//                     <br></br>

//                   </Form>
//                 </Panel.Body>
//               </Panel>
//             </Col>
//             <Col sm="2"></Col>
//           </Row>

//         </Container>
//         <Container>
//           <Row>
//             <Col sm="2"></Col>
//             <Col sm="8" align="center">
//               <Button color="danger" style={btnDanger} onClick={this.proceed}>Proceed to Pay</Button>
//             </Col>
//             <Col sm="2"></Col>

//           </Row>

//         </Container>
//       </div>
//     );
//   }
// }
// ReactDOM.render(<Contact />, document.getElementById('host'));
