import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { firebaseAuth } from '../config';

class Navigator extends Component {


    logout = () => {
        //alert("log out");
        return firebaseAuth().signOut()
      }  


    render() {

        let logLink = null;
        //alert(this.props.isAuthenticated);
        if (this.props.isAuthenticated)
            logLink = <button className="btn btn-link" onClick={this.logout}>Logout</button>;
        else
            logLink = <Link className="nav-link" to="/login">Login</Link>;

           
        
            return (
        
               <Nav fill variant="tabs">
                <Nav.Item>
                    <Nav.Link  href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/customers">All customers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/all">Customers and trainings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/trainings" disabled>Trainings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    {logLink}
                </Nav.Item>
                </Nav>
            
        );
    }
}

export default Navigator;