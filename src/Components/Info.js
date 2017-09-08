import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import '../css/Info.css';
import registerServiceWorker from '../registerServiceWorker';
import Chart from './Chart'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

let data1 =
 	{	"timeRange":[1501570800000,1504249199999],
 		"storageUtilized":[0,5],
 		"incomingBytes":6,
 		"outgoingBytes":0,
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
 	{	"timeRange":[1501570800000,1504249199999],
 		"storageUtilized":[0,10],
 		"incomingBytes":12,
 		"outgoingBytes":2,
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

let datas = [data1, data2, data1, data1, data2];
class Info extends Component {
	constructor() {
		super();

		this.state = {
			data: []
		}
	}

	componentWillMount() {
		this.getData();
	}

	componentDidMount(){
		document.body.style.backgroundColor = "#eee"// Set the style
	}

	getData() {
		// Ajax calls here
		this.setState({
			data: datas
		});
	}

	render() {
		return (
			<div className="header">
				<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						Zenko S3 UI
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavDropdown eventKey={3} title="Time Range" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>Action</MenuItem>
							<MenuItem eventKey={3.2}>Another action</MenuItem>
							<MenuItem eventKey={3.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3}>Separated link</MenuItem>
						</NavDropdown>
						<NavDropdown eventKey={3} title="Buckets" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>Action</MenuItem>
							<MenuItem eventKey={3.2}>Another action</MenuItem>
							<MenuItem eventKey={3.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
        </Navbar>
		<div className="charts">
			<Chart data={this.state.data } textColor='#424242' gridColor='hsla(0, 0%, 75%, 0.84)'/>
      </div>
	  </div>
    );
  }
}

export default Info;
