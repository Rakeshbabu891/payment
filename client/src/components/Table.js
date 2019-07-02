import React, { Component } from "react";
import { uploadLength } from "./Uppy";
// import { BrowserRouter as Router, Link, Route } from "react-router-dom";
// import Checkout from "./Checkout";

import { Table, Row, Col } from "react-bootstrap";
import Select from "react-select";
// import Center from "react-center";

var processOptions = [];
var materialOptions = [];
var colorOptions = [];
var qualityOptions = [];
var densityOptions = [];

var filesArray = [];
var subTotal = 0;
var tax = 0;
var orderTotal = 0;

var orderSummary = [];

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    fontSize: 15
    // overflow: "visible"
  })
};
export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.orderId = this.props.orderId;
    // this.orderId = "orderid_1554193108323";

    this.getProcessOptions();
    this.getMaterialOptions("");
    this.getColorOptions("");
    this.getQualityOptions("");
    this.getDensityOptions("");

    this.state = {
      uploadLength: uploadLength,
      filesArray: [],

      defaultProcess: {
        value: "fdm",
        label: "FDM/FFF"
      },
      defaultMaterial: {
        value: "fdm-pla",
        label: "PLA"
      },
      defaultColor: {
        value: "fdm-pla-white",
        label: "White"
      },
      defaultQuality: {
        value: "fdm-300-microns",
        label: "Draft 300 Microns"
      },
      defaultDensity: {
        value: "fdm-density-20",
        label: "20%"
      }
    };
  }

  componentDidMount() {
    console.log("Table Component Mounted");
    this.timer = setInterval(() => this.checkForUploads(), 500);
    this.getFiles();
  }

  checkForUploads() {
    if (filesArray.length !== uploadLength) {
      console.log("Getting Files");
      this.getFiles();
      // console.log(
      //   "Order Length after Getting Files",
      //   filesArray.length,
      //   uploadLength
      // );
    } else {
      // console.log(
      //   "No Change in Order Data Length",
      //   filesArray.length,
      //   uploadLength
      // );
    }
  }

  //Write to DB
  updateOrder() {
    // var index = filesArray.findIndex(file => file._id === fileId);
    console.log("Writing Order to DB");
    filesArray.forEach(file => {
      // console.log("File", file.index, JSON.stringify(file));
      fetch("http://localhost:5000/files/" + file._id, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        // body: JSON.stringify({ a: 1, b: "Textual content" })
        body: JSON.stringify(file)

        // headers: new Headers(),
        // body: JSON.stringify({
        //   name: "Suren",
        //   age: "29"
        // })
      })
        .then(response => response.json())
        .then(resData => {
          console.log(resData);
        });
    });
    // filesArray[index].item = value;
    // // console.log("File ID:", fileId);
    // console.log("File Data:", filesArray[index]);
    // fetch("http://localhost:5000/files/" + fileId, {
    //   method: "PATCH",
    //   headers: new Headers()
    //   // body: JSON.stringify({ item, value })
    // })
    //   .then(response => response.json())
    //   .then(resData => {
    //     console.log("Patch Result:", resData);
    //   });
    // // console.log("File ID:", fileId);
    // // console.log("Order Data:", this.state.filesArray);
  }

  getFiles() {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://localhost:5000/files/"; // site that doesn’t send Access-Control-*
    fetch(url + this.orderId)
      .then(response => response.json())
      .then(resData => {
        filesArray = resData;
        this.setState({ filesArray: resData });
        // console.log("Order Data:", this.state.filesArray);
        // console.log("Global Order Data:", filesArray);
        this.updateDefaultOptions();
        this.calculatePrice();
      });
  }

  // Update Initial Options
  updateDefaultOptions() {
    console.log("Updating Default Options");
    // console.log("Default Process Option:", processOptions[0].value);
    // console.log("Default Material Option:", materialOptions[0].value);

    filesArray.forEach(file => {
      // Default Process
      if (file.process === undefined) {
        file.process = this.state.defaultProcess.value;
      }

      file.processLabel = processOptions.find(
        index => index.value === file.process
      ).label;

      console.log("Default Process", file.process, file.processLabel);

      // Default Material
      if (file.material === undefined) {
        file.material = this.state.defaultMaterial.value;
      }
      file.materialLabel = materialOptions.find(
        index => index.value === file.material
      ).label;
      file.materialPrice = materialOptions.find(
        index => index.value === file.material
      ).materialPrice;

      // console.log(
      //   "Default Material",
      //   file.material,
      //   file.materialLabel,
      //   file.materialPrice
      // );

      // Default Color
      if (file.color === undefined) {
        file.color = this.state.defaultColor.value;
      }
      file.colorLabel = colorOptions.find(
        index => index.value === file.color
      ).label;

      // console.log("Default Color", file.color, file.colorLabel);

      // Default Quality
      if (file.quality === undefined) {
        file.quality = this.state.defaultQuality.value;
      }
      file.qualityLabel = qualityOptions.find(
        index => index.value === file.quality
      ).label;
      file.qualityMultiplier = qualityOptions.find(
        index => index.value === file.quality
      ).qualityMultiplier;

      // console.log(
      //   "Default Quality",
      //   file.quality,
      //   file.qualityLabel,
      //   file.qualityMultiplier
      // );

      // Default Density
      if (file.density === undefined) {
        file.density = this.state.defaultDensity.value;
      }
      file.densityLabel = densityOptions.find(
        index => index.value === file.density
      ).label;
      file.densityMultiplier = densityOptions.find(
        index => index.value === file.density
      ).densityMultiplier;

      if (file.quantity === undefined) {
        file.quantity = 1;
      }

      // console.log(
      //   "Default Density",
      //   file.density,
      //   file.densityLabel,
      //   file.densityMultiplier
      // );

      // this.setState({
      //   defaultProcess.
      //     label: file.processLabel
      //  defaultMaterialLabel: file.materialLabel
      // });
    });
    // console.log(this.state.defaultProcess);
    console.log("Order Data", filesArray);
    // this.calculatePrice();
  }

  // Get Process Options

   process = null;
  getProcessOptions() {
  
    
    const url = "http://localhost:5000/process/"; // site that doesn’t send Access-Control-*
    console.log("before fetch starting");
    fetch(url)
      .then(response => response.json())
      .then(resData => {
        processOptions = resData.map(key => ({
          value: key.process,
          label: key.processLabel
        }));
        console.log("Global Process Options:", processOptions);
       this.process = processOptions;
      });
  }

  // Get Material Options
  getMaterialOptions(process) {
    fetch("http://localhost:5000/materials/" + process)
      .then(response => response.json())
      .then(resData => {
        materialOptions = resData.map(key => ({
          value: key.material,
          label: key.materialLabel,
          process: key.process,
          materialPrice: key.materialPrice
        }));

        // this.setState({
        //   materialOptions: resData.map(key => ({
        //     value: key.materialLabel,
        //     label: key.materialName
        //   }))
        // });
        // console.log("Material Options:", this.state.materialOptions);
        console.log("Global Material Options:", materialOptions);
      });
  }

  // Get Color Options
  getColorOptions(material) {
    fetch("http://localhost:5000/colors/" + material)
      .then(response => response.json())
      .then(resData => {
        colorOptions = resData.map(key => ({
          value: key.color,
          label: key.colorLabel,
          material: key.material
        }));

        // this.setState({
        //   colorOptions: resData.map(key => ({
        //     value: key.colorLabel,
        //     label: key.colorName
        //   }))
        // });
        // console.log("Color Options:", this.state.colorOptions);
        console.log("Global Color Options:", colorOptions);
      });
  }

  // Get Quality Options
  getQualityOptions(process) {
    fetch("http://localhost:5000/quality/" + process)
      .then(response => response.json())
      .then(resData => {
        qualityOptions = resData.map(key => ({
          value: key.quality,
          label: key.qualityLabel,
          process: key.process,
          qualityMultiplier: key.qualityMultiplier
        }));
        // this.setState({
        //   qualityOptions: resData.map(key => ({
        //     value: key.qualityLabel,
        //     label: key.qualityName
        //   }))
        // });
        // console.log("Quality Options:", this.state.qualityOptions);
        console.log("Global Quality Options:", qualityOptions);
      });
  }

  // Get Density Options
  getDensityOptions(process) {
    fetch("http://localhost:5000/density/" + process)
      .then(response => response.json())
      .then(resData => {
        densityOptions = resData.map(key => ({
          value: key.density,
          label: key.densityLabel,
          process: key.process,
          densityMultiplier: key.densityMultiplier
        }));

        // this.setState({
        //   densityOptions: resData.map(key => ({
        //     value: key.densityLabel,
        //     label: key.densityName
        //   }))
        // });
        // console.log("Density Options:", this.state.densityOptions);
        console.log("Global Density Options:", densityOptions);
      });
  }

  // Calculate Price
  calculatePrice() {
    console.log("Calculating Price");

    subTotal = 0;

    filesArray.forEach(file => {
      // console.log(file.material);
      // console.log(qualityOptions);

      file.materialPrice = materialOptions.find(
        index => index.value === file.material
      ).materialPrice;

      file.qualityMultiplier = qualityOptions.find(
        index => index.value === file.quality
      ).qualityMultiplier;

      file.densityMultiplier = densityOptions.find(
        index => index.value === file.density
      ).densityMultiplier;

      file.price = Math.round(
        file.volume *
          file.materialPrice *
          file.qualityMultiplier *
          file.densityMultiplier
      );

      file.itemTotal = file.price * file.quantity;
      subTotal += file.itemTotal;

      console.log(
        file.volume,
        file.materialPrice,
        file.qualityMultiplier,
        file.densityMultiplier,
        file.quantity,
        file.price,
        file.itemTotal
      );
    });

    tax = Math.round((subTotal * 18) / 100);
    orderTotal = subTotal + tax;
    console.log("Sub Total", subTotal);
    console.log("Tax", tax);
    console.log("Total", orderTotal);
    console.log("Order Data", filesArray);

    // this.setState({
    //   orderTotal: orderTotal
    // });
    // orderTotal = this.state.orderTotal;

    this.setState({
      state: this.state
    });
    this.updateOrder();
  }


  render() {
    console.log("process:",this.process)
    return (
      <div>
        <hr />
        <p align="center">
          Select from the required options below to see instant prices. <br />
          Click on ? to understand an option better.
        </p>
        <hr />
        {/* <Col sm={3} xs={12}>
          <Row>
            <Col sm={12} align="right">
              <Button
                variant="outline-success"
                onClick={() => {
                  console.log("Sub Total", subTotal);
                  console.log("Tax", tax);
                  console.log("Order Total", orderTotal);
                }}
              >
                Place Order
              </Button>
            </Col>
          </Row>
        </Col> */}
        {/*  */}
        {/*  */}
        {/* Table */}
        {/*  */}
        {/*  */}
        <Row>
          <Col sm={12} xs={12}>
            <Table responsive align="center">
              <thead>
                <tr align="center">
                  <th className="align-middle">#</th>
                  <th className="align-middle" align="left" width="20%">
                    File Name
                    
                  </th>
                  <th className="align-middle" align="center">
                    Technology
                  </th>
                  <th className="align-middle" align="center">
                    Material
                  </th>
                  <th className="align-middle" align="center">
                    Color
                  </th>
                  <th className="align-middle" align="center">
                    Quality
                  </th>
                  <th className="align-middle" align="center">
                    Density
                  </th>
                  <th className="align-middle" align="center">
                    Price
                  </th>
                  <th className="align-middle" align="center" width="5%">
                    Quantity
                  </th>
                  <th className="align-middle" align="center" width="5%">
                    Item Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.filesArray.map(file => (
                  <tr key={file._id}>
                    {/* Serial Number */}
                    <td className="align-middle">
                      {
                        (file.index =
                          filesArray.findIndex(
                            array => array._id === file._id
                          ) + 1)
                      }
                    </td>

                    {/*  */}
                    {/*  */}
                    {/* File Name */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="left">
                      {file.fileName}
                      <div style={{ fontSize: 12 }}>
                        {Math.round(file.dimensions[0])}*
                        {Math.round(file.dimensions[1])}*
                        {Math.round(file.dimensions[2])} mm,{" "}
                        {Math.round(file.volume)} cc
                      </div>
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Process Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        defaultValue={this.state.defaultProcess}
                        options={processOptions}
                        onChange={value => {
                          console.log("Process Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);
                          filesArray[index].process = value.value;
                          filesArray[index].processLabel = value.label;
                          console.log("File Data", filesArray[index]);
                        }}
                      />
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Material Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        defaultValue={this.state.defaultMaterial}
                        onFocus={() => {
                          console.log(
                            "onFocus Material Options",
                            file.process,
                            materialOptions.filter(
                              material => material.process === file.process
                            )
                          );
                          this.setState({
                            materialOptions: materialOptions.filter(
                              material => material.process === file.process
                            )
                          });
                        }}
                        options={this.state.materialOptions}
                        onChange={value => {
                          console.log("Material Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);

                          filesArray[index].material = value.value;
                          filesArray[index].materialLabel = value.label;
                          filesArray[index].materialPrice = value.materialPrice;

                          console.log("File Data", filesArray[index]);
                          this.calculatePrice();
                        }}
                      />
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Color Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        defaultValue={this.state.defaultColor}
                        onFocus={() => {
                          console.log(
                            "onFocus Color Options",
                            file.material,
                            colorOptions.filter(
                              color => color.material === file.material
                            )
                          );
                          this.setState({
                            colorOptions: colorOptions.filter(
                              color => color.material === file.material
                            )
                          });
                        }}
                        options={this.state.colorOptions}
                        onChange={value => {
                          console.log("Color Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);

                          filesArray[index].color = value.value;
                          filesArray[index].colorLabel = value.label;

                          console.log("File Data", filesArray[index]);
                          this.calculatePrice();
                        }}
                      />
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Quality Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        defaultValue={this.state.defaultQuality}
                        onFocus={() => {
                          console.log(
                            "onFocus Quality Options",
                            file.process,
                            qualityOptions.filter(
                              quality => quality.process === file.process
                            )
                          );
                          this.setState({
                            qualityOptions: qualityOptions.filter(
                              quality => quality.process === file.process
                            )
                          });
                        }}
                        options={this.state.qualityOptions}
                        onChange={value => {
                          console.log("Quality Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);
                          console.log(
                            "Quality Multiplier",
                            value.qualityMultiplier
                          );

                          filesArray[index].quality = value.value;
                          filesArray[index].qualityLabel = value.label;
                          filesArray[index].qualityMultiplier =
                            value.qualityMultiplier;

                          console.log("File Data", filesArray[index]);
                          this.calculatePrice();
                        }}
                      />
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Density Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        defaultValue={this.state.defaultDensity}
                        onFocus={() => {
                          console.log(
                            "onFocus Density Options",
                            file.process,
                            densityOptions.filter(
                              density => density.process === file.process
                            )
                          );
                          this.setState({
                            densityOptions: densityOptions.filter(
                              density => density.process === file.process
                            )
                          });
                        }}
                        options={this.state.densityOptions}
                        onChange={value => {
                          console.log("Density Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);

                          filesArray[index].density = value.value;
                          filesArray[index].densityLabel = value.label;
                          filesArray[index].densityMultiplier =
                            value.densityMultiplier;

                          console.log("File Data", filesArray[index]);
                          this.calculatePrice();
                        }}
                      />
                    </td>

                    <td className="align-middle" align="right">
                      &#8377; {file.price}
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Quantity Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        defaultValue={{
                          value: 1,
                          label: "1"
                        }}
                        options={[
                          {
                            value: 0,
                            label: 0
                          },
                          {
                            value: 1,
                            label: 1
                          },
                          {
                            value: 2,
                            label: 2
                          },
                          {
                            value: 3,
                            label: 3
                          },
                          {
                            value: 4,
                            label: 4
                          },
                          {
                            value: 5,
                            label: 5
                          },
                          {
                            value: 6,
                            label: 6
                          },
                          {
                            value: 7,
                            label: 7
                          },
                          {
                            value: 8,
                            label: 8
                          },
                          {
                            value: 9,
                            label: 9
                          },
                          {
                            value: 10,
                            label: 10
                          }
                        ]}
                        onChange={value => {
                          console.log("Quantity Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);
                          filesArray[index].quantity = value.value;
                          console.log("File Data", filesArray[index]);
                          this.calculatePrice();
                        }}
                      />
                    </td>
                    <td className="align-middle" align="right">
                      &#8377; {file.itemTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* <Row>
          <Col sm={3} xs={12}>
            <Row>
              <Table responsive align="center">
                <thead>
                  <tr align="center">
                    <th className="align-middle" colSpan="2" align="center">
                      Order Summary
                      <Button
                        variant="outline-success"
                        onClick={() => {
                          console.log("Refreshing..");
                          this.getFiles();
                        }}
                      >
                        Refresh
                      </Button>
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
                    <td className="align-middle">Files</td>
                    <td className="align-middle" align="right">
                      {this.state.filesArray.length}
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle">Sub Total</td>
                    <td className="align-middle" align="right">
                      &#8377; {subTotal}
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle">GST 18%</td>
                    <td className="align-middle" align="right">
                      &#8377; {tax}
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle">Total</td>
                    <td className="align-middle" align="right">
                      &#8377; {orderTotal}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              <Col sm={12} align="right">
                <LinkContainer to="/checkout">
                  <Button variant="outline-success">Checkout</Button>
                </LinkContainer>
                <Button
                  variant="outline-success"
                  onClick={() => {
                    console.log("Sub Total", subTotal);
                    console.log("Tax", tax);
                    console.log("Order Total", orderTotal);
                  }}
                >
                  Place Order
                </Button>
              </Col>
            </Row>
          </Col>
        </Row> */}
      </div>
    );
  }
}

export { subTotal, tax, orderTotal };
