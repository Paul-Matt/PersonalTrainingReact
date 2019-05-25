import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'

class Navigator extends Component {
    render() {
        return (
            <div>
               <Nav>
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/customers">All customers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/all">Customers and trainings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="trainings">Trainings</Nav.Link>
                </Nav.Item>
                </Nav>; 
            </div>
        );
    }
}

export default Navigator;