import React, { Component } from "react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import Dashboard from "@uppy/react/lib/Dashboard";

const Uppy = require("@uppy/core");
const Tus = require("@uppy/tus");

class App extends Component {
  constructor(props) {
    super(props);
    this.orderId = `orderid_${Date.now()}`;
    this.state = {
      filesInOrder: []
    };
    console.log("OrderId:", this.orderId);
    console.log("This:", this);
  }

  componentWillMount() {
    console.log("Uppy Started");

    this.host = "localhost:8000"; //or yoursite.com(where your node code lives and acts as uppy server)
    this.uppy = new Uppy({
      meta: { orderId: this.orderId },
      debug: false,
      autoProceed: true,
      restrictions: {
        maxFileSize: 100000000, //uppy options
        maxNumberOfFiles: 50,
        minNumberOfFiles: 1,
        allowedFileTypes: false
      },
      onBeforeFileAdded: (currentFile, files) => {
        console.log("Current File", currentFile);
      },
      onBeforeUpload: files => {
        console.log("Files", files);
      }
    })
      .use(Tus, {
        endpoint: "http://localhost:8000/uploads",
        resume: true,
        autoRetry: true,
        retryDelays: [0, 1000, 3000, 5000],
        limit: 0
      })
      .on("complete", result => {
        console.log("Upload Complete");
        console.log("Successful Files:", result.successful);
        console.log("Failed Files:", result.failed);
        //        this.setState({ uploadStatus: result.successful.length });
        this.getFiles();
      });
  }
  getFiles() {
    fetch("http://localhost:5000/files/" + this.orderId)
      .then(response => response.json())
      .then(resData => {
        this.setState({ filesInOrder: resData });
        console.log(resData);
      });
  }

  render() {
    return (
      <div>
        <Dashboard //uppy dashboard component
          uppy={this.uppy}
          plugins={[""]}
        />
        <hr />
        <button className="btn" onClick={() => this.getFiles()}>
          Get Quote
        </button>
        <br />
        orderId: {this.orderId}
        {this.state.filesInOrder.map(file => (
          <li key={file._id}>
            FileName: {file.fileName}, Bounding Box: {file.boundingBox}, Volume:{" "}
            {file.volume}
          </li>
        ))}
      </div>
    );
  }
}

export default App;
