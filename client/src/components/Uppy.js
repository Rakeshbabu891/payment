import { Dashboard } from "@uppy/react";
import React, { Component } from "react";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const Uppy = require("@uppy/core");
const Tus = require("@uppy/tus");

var uploadLength = 0;

export default class UppyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.orderId = this.props.orderId;
    this.uppy = new Uppy({
      meta: { orderId: this.orderId },
      autoProceed: true
    })
      .use(Tus, {
        endpoint: "http://localhost:8000/File",
        // endpoint: 'https://master.tus.io/files/',
        resume: true,
        autoRetry: true,
        retryDelays: [0, 1000, 3000, 5000],
        limit: 0
      })
      .on("upload-success", result => {
        // console.log("Upload Complete", result);
        // console.log("Successful Files:", result.successful);
        // console.log("Failed Files:", result.failed);
        // uploadTimeStamp = Date.now();
        // numberOfFiles = result.successful.length;
      })
      .on("complete", result => {
        // console.log("Upload Complete");
        // console.log("Successful Files:", result.successful);
        // console.log("Failed Files:", result.failed);
        uploadLength = uploadLength + result.successful.length;
        // console.log("Uppy Upload Length", uploadLength);
      });
  }
  componentDidMount() {
    console.log("Uppy Component Mounted");
  }

  render() {
    return (
      <Dashboard
        uppy={this.uppy}
        width={"100%"}
        height={400}
        hideUploadButton={false}
        proudlyDisplayPoweredByUppy={false}
        showLinkToFileUploadResult={false}
      />
    );
  }
}

export { uploadLength };
