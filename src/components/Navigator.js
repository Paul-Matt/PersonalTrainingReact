import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

class Navigator extends Component {
    render() {
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
                </Nav>
            
        );
    }
}

export default Navigator;