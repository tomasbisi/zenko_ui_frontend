import React, { Component } from 'react';
import logo from './logo.svg';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './Dashboard.css';



class Dashboard extends Component {
    constructor() {
    super();
    this.state = {
      bucketInfo: {}
    }
  }

  handleSubmit(e) {
    if (this.refs.bucketName.value === '' ||
      this.refs.startDate.value === '' ||
      this.refs.startTime.value === '' ||
      this.refs.endDate.value === '' ||
      this.refs.endTime.value === '') {
      alert('Please fill out all fields!');
    } else {
      this.setState({bucketInfo: {
        bucketName: this.refs.bucketName.value,
        startDate: this.refs.startDate.value,
        startTime: this.refs.startTime.value,
        endDate: this.refs.endDate.value,
        endTime: this.refs.endTime.value
      }}, function() {
        console.log(this.state.bucketInfo);

        // send credentials to back end

        // if all works out go to bucketinfo page
        // otherwise error message has to be generated
        this.props.history.push("/graphs");
      });
    }
  e.preventDefault();
  }


  render() {
    return (

      <div className="App">
    
        <p className="App-intro">
              <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a >Zenko S3 UI</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>     
            </Nav>
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
        </p>

          <div className="BucketInfo">
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <label>Bucket Name</label><br />
          <input type="text" ref="bucketName" />
        </div>
        <div>
          <br />
          <label>Start Date & Time</label><br />
          <input type="date" ref="startDate" />
          <input type="time" ref="startTime" />
        </div>
        <div>
          <br />
          <label>End Date & Time</label><br />
          <input type="date" ref="endDate" />
          <input type="time" ref="endTime" />
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>
      </div>


       </div>


      
   

    );
  }
}

export default Dashboard;