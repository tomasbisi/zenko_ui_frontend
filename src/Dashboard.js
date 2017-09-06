import React, { Component } from 'react';
import logo from './logo.svg';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './Dashboard.css';

class Dashboard extends Component {
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
      </div>
    );
  }
}

export default Dashboard;