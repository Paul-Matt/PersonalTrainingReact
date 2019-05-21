import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class EditCustomer extends Component {
    state = {
        show: false, firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    };

    handleClickOpen = () => {
        this.setState({ show: true });
        this.setState({
            firstname: this.props.customer.firstname, 
            lastname: this.props.customer.lastname, 
            streetaddress: this.props.customer.streetaddress, 
            postcode: this.props.customer.postcode, 
            city: this.props.customer.city, 
            email: this.props.customer.email, 
            phone: this.props.customer.phone
        })
      };
    
      handleClose = () => {
        this.setState({ show: false });
      };
    
      handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      }

    saveCustomer = () => {
        const customer = {
            firstname: this.state.firstname, 
            lastname: this.state.lastname, 
            streetaddress: this.state.streetaddress, 
            postcode: this.state.postcode, 
            city: this.state.city, 
            email: this.state.email, 
            phone: this.state.phone
        }

        this.props.editCustomer(this.props.link, customer);
        this.handleClose();
    }

    render() {
        return (
            <div>
                <Button variant="primary mt-2 mb-2" size="sm" onClick={this.handleClickOpen}>Edit</Button>
               
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Street address</Form.Label>
                            <Form.Control name="streetaddress" value={this.state.streetaddress} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPostcode">
                            <Form.Label>Postcode</Form.Label>
                            <Form.Control name="postcode" value={this.state.postcode} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" value={this.state.city} onChange={this.handleChange}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" value={this.state.email} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPhone">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control name="phone" value={this.state.phone} onChange={this.handleChange}/>
                            </Form.Group>
                        </Form.Row>
                        
                        <Button variant="primary mr-2" onClick={this.saveCustomer}>
                        Save
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                        </Button>
                    </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default EditCustomer;