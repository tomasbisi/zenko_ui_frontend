import React, { Component, Datacall } from 'react';
import logo from './logo.svg';
import { Button, Modal} from 'react-bootstrap';
import './Dashboard.css';
import Chart from './Components/Chart'
import DataCall from './Datacall';
import AWS from 'aws-sdk';



let data1 =
  { "timeRange":[1501570800000,1504249199999],
    "storageUtilized":[0,500000],
    "incomingBytes":13352332,
    "outgoingBytes":122342353,
    "numberOfObjects":[0,1],
    "operations":
    {
      "s3:DeleteBucket":0,
      "s3:DeleteBucketCors":0,
      "s3:DeleteBucketWebsite":0,
      "s3:DeleteObjectTagging":0,
      "s3:ListBucket":0,
      "s3:GetBucketAcl":0,
      "s3:GetBucketCors":0,
      "s3:GetBucketWebsite":0,
      "s3:GetBucketLocation":0,
      "s3:CreateBucket":1,
      "s3:PutBucketAcl":0,
      "s3:PutBucketCors":0,
      "s3:PutBucketWebsite":0,
      "s3:PutObject":1,
      "s3:CopyObject":0,
      "s3:UploadPart":0,
      "s3:ListBucketMultipartUploads":0,
      "s3:ListMultipartUploadParts":0,
      "s3:InitiateMultipartUpload":0,
      "s3:CompleteMultipartUpload":0,
      "s3:AbortMultipartUpload":0,
      "s3:DeleteObject":0,
      "s3:MultiObjectDelete":0,
      "s3:GetObject":0,
      "s3:GetObjectAcl":0,
      "s3:GetObjectTagging":0,
      "s3:PutObjectAcl":0,
      "s3:PutObjectTagging":0,
      "s3:HeadBucket":0,
      "s3:HeadObject":0,
      "s3:PutBucketVersioning":0,
      "s3:GetBucketVersioning":0,
      "s3:PutBucketReplication":0,
      "s3:GetBucketReplication":0,
      "s3:DeleteBucketReplication":0
    },
    "bucketName":"utapi-bucket"
  };
let data2 =
  { "timeRange":[1501570800000,1504249199999],
    "storageUtilized":[0,1000],
    "incomingBytes":213133334,
    "outgoingBytes":224345668,
    "numberOfObjects":[0,1],
    "operations":
    {
      "s3:DeleteBucket":0,
      "s3:DeleteBucketCors":0,
      "s3:DeleteBucketWebsite":0,
      "s3:DeleteObjectTagging":0,
      "s3:ListBucket":0,
      "s3:GetBucketAcl":0,
      "s3:GetBucketCors":0,
      "s3:GetBucketWebsite":0,
      "s3:GetBucketLocation":0,
      "s3:CreateBucket":1,
      "s3:PutBucketAcl":0,
      "s3:PutBucketCors":0,
      "s3:PutBucketWebsite":0,
      "s3:PutObject":1,
      "s3:CopyObject":0,
      "s3:UploadPart":0,
      "s3:ListBucketMultipartUploads":0,
      "s3:ListMultipartUploadParts":0,
      "s3:InitiateMultipartUpload":0,
      "s3:CompleteMultipartUpload":0,
      "s3:AbortMultipartUpload":0,
      "s3:DeleteObject":0,
      "s3:MultiObjectDelete":0,
      "s3:GetObject":0,
      "s3:GetObjectAcl":0,
      "s3:GetObjectTagging":0,
      "s3:PutObjectAcl":0,
      "s3:PutObjectTagging":0,
      "s3:HeadBucket":0,
      "s3:HeadObject":0,
      "s3:PutBucketVersioning":0,
      "s3:GetBucketVersioning":0,
      "s3:PutBucketReplication":0,
      "s3:GetBucketReplication":0,
      "s3:DeleteBucketReplication":0
    },
    "bucketName":"utapi-bucket"
  };

let data_chart = [data1, data2, data1, data1, data2];

let objects = {'A':1000, 'B':2000, 'C':4000, 'D':100, 'E':700, 'F': 560, 'G': 231};


class Dashboard extends Component {


	constructor() {
		super();
		this.state = {
			timeRange: {},
			bucketName: {},
			data: [],
			showTimeRange: false,
			showBucketName: false
		}
	}


  componentWillMount() {
    this.setState({
      data:data_chart,
      objects: objects
    });
  }

  handleSubmitTimeRange(e) {
	  return new Promise((resolve, reject) => {
		  if (
			  this.refs.startDate.value === '' ||
			  this.refs.startTime.value === '' ||
			  this.refs.endDate.value === '' ||
			  this.refs.endTime.value === '')
			  {
				  reject('Please fill out all fields!');
			  } else {
				  let startParam = [];
				  let endParam = [];
				  this.setState({
				  timeRange: {
					  startDate: this.refs.startDate.value,
					  startTime: this.refs.startTime.value,
					  endDate: this.refs.endDate.value,
					  endTime: this.refs.endTime.value,
					  epochStart: new Date(this.refs.startDate.value + 'T' + this.refs.startTime.value).getTime(),
					  epochEnd: new Date(this.refs.endDate.value + 'T' + this.refs.endTime.value).getTime(),
					  name: "utapi-bucket1",
					  accesKey: "accessKey1",
					  secretKey: "verySecretKey1",
					  level: "bucket",
					  interval: "15min"
				  }
			  }, (prevState, props) => {
				  fetch('http://backend:8200/api', {
					  method: 'POST',
					  headers: {
						  'Accept': 'application/json',
						  'Content-Type': 'application/json',
					  },
					  body: JSON.stringify({
						  timeRange: this.state.timeRange
					  })
				  })
				  .then((response) => (response.json()))
				  .then((out) => this.setState({ data: out }))
				  .then(() => console.log(this.state.data))
			  });
			  resolve(this.state.data);
		  }
		  e.preventDefault();
		  this.setState({ showTimeRange: false});
	  });
  }


	// TODO: Change bucket Name
  handleSubmitBucketName(e) {
	  this.setState({ showBucketName: false});
  }


  handleChange(e) {

    this.setState({bucketName: {
      name: this.refs.bucketName.value
    }}, function(){
      console.log(this.state.bucketName);
    });
    e.preventDefault();
  }

  openTimeRangeWindow(e) {
	  this.setState({ showTimeRange: true });
  }

  openBucketNameWindow(e) {
	  this.setState({ showBucketName: true });
  }

  render() {

     let closeTimeRange = () => this.setState({ showTimeRange: false});
     let closeBucketName = () => this.setState({ showBucketName: false});

    return (

      <div className="App">
		  <div className="header">
			  <Button id="Sentry" bsStyle="link" bsSize="large">SENTRY</Button>
			  <Button id="link" bsStyle="link" onClick={this.openTimeRangeWindow.bind(this)}>Time range</Button>
			  <Button id="link" bsStyle="link" onClick={this.openBucketNameWindow.bind(this)}>Change bucket name</Button>
		  </div>
	  <Modal show={this.state.showTimeRange} onHide={closeTimeRange} container={this} aria-labelledby="contained-modal-title">
	  <Modal.Body>
	  <div>
	  <form onSubmit={this.handleSubmitTimeRange.bind(this)}>
 	 <div>
 		 <br />
 		 <label style={{color:'black'}}>Start Date & Time</label><br />
 		 <input style={{margin:'5px'}} type="date" ref="startDate" />
 		 <input type="time" ref="startTime" />
 	 </div>
 	 <div>
 		 <br />
 		 <label style={{color:'black'}}>End Date & Time</label><br />
 		 <input style={{margin:'5px'}} type="date" ref="endDate" />
 		 <input type="time" ref="endTime" />
 	 </div>
 	 <div className="buttons">
 		 <br />
 		 <Button onClick={closeTimeRange}>Cancel</Button>
 		 <Button bsStyle="primary" type="submit">Submit</Button>
 	 </div>
 	 </form>
	 </div>
	  </Modal.Body>

	  </Modal>

	  <Modal show={this.state.showBucketName} onHide={closeBucketName} container={this} aria-labelledby="contained-modal-title">
	  <Modal.Body>
	  <div>
			<h4>Enter bucket name</h4>
			<input type="text" placeholder="Bucket name" />
			<div className="buttons">
				<br />
				<Button onClick={closeBucketName}>Cancel</Button>
				<Button bsStyle="primary" onClick={this.handleSubmitBucketName.bind(this)}>Submit</Button>
			</div>
		</div>
	  </Modal.Body>
	  </Modal>

		  <br />
            <Chart data={this.state.data} objects={this.state.objects} textColor='#424242' gridColor='hsla(0, 0%, 75%, 0.84)'/>


       </div>

    );
  }
}

export default Dashboard;
// <p className="App-intro">
// <Navbar inverse collapseOnSelect>
// <Navbar.Header>
// <Navbar.Brand>
// <a>Sentry</a>
// </Navbar.Brand>
// <Navbar.Toggle />
// </Navbar.Header>
//
// <Navbar.Collapse>
// <Nav>
// </Nav>
// <Nav pullRight>
// <NavItem onClick={() => this.setState({ show: true})}>Time Range
//
// <div className="modal-container">
// <Modal show={this.state.show} onHide={close} container={this} aria-labelledby="contained-modal-title">
// <Modal.Header closeButton>
// <Modal.Body>
// <div className="BucketInfo">
// <form onSubmit={this.handleSubmit.bind(this)}>
// <div>
// <br />
// <label style={{color:'black'}}>Start Date & Time</label><br />
// <input style={{margin:'5px'}} type="date" ref="startDate" />
// <input type="time" ref="startTime" />
// </div>
// <div>
// <br />
// <label style={{color:'black'}}>End Date & Time</label><br />
// <input style={{margin:'5px'}} type="date" ref="endDate" />
// <input type="time" ref="endTime" />
// </div>
// <br />
// <input type="submit" value="Submit" />
// </form>
// </div>
// </Modal.Body>
// </Modal.Header>
//
// <Modal.Footer>
// <Button onClick={close}>Close</Button>
// </Modal.Footer>
// </Modal>
// </div>
// </NavItem>
// <NavDropdown eventKey={3} title="Buckets" id="basic-nav-dropdown">
// <MenuItem eventKey={3.1}>Bucket 1</MenuItem>
// <MenuItem eventKey={3.2}>Buchet 2</MenuItem>
// <MenuItem eventKey={3.3}>Bucket 3</MenuItem>
// <MenuItem divider />
//
// </NavDropdown>
// </Nav>
// </Navbar.Collapse>
// </Navbar>
// </p>
