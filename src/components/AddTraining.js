import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import DateTime from 'react-datetime';




class AddTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {
        show: false, date: '', duration: '', activity: '', customer: ''
        };
    }


    handleClickOpen = () => {
        this.setState({ show: true });
        this.setState({
            customer: this.props.customer
        })
      };
    
      handleClose = () => {
        //alert(this.state.customer);
        this.setState({ show: false });
      };
    
      handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      }

      onDateChange = (value) => {
        this.setState({date:value});
  }

      saveTraining = () => {
          //alert(this.state.customer);
        const newTraining = {
            date: this.state.date, 
            activity: this.state.activity,
            duration: this.state.duration, 
            customer: this.state.customer,
            
        }
        this.props.addTraining(newTraining);
        this.handleClose();
    }

        handleDateChange = (value) => {
            this.setState({ date: value });
        }
        
      

    render() {


        return (
            <div>
                <Button variant="primary mt-2 mb-2" size="sm" onClick={this.handleClickOpen}>Add new Training</Button>
               
               <Modal show={this.state.show} onHide={this.handleClose}>
                   <Modal.Header closeButton>
                       <Modal.Title>Add new Training</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                   
                   <Form>
                         
                        <Form.Label>Date</Form.Label>
                        <div>
                        <DateTime onChange={this.handleDateChange} 
                                closeOnSelect={true}
                                timeFormat={false}
                                dateFormat="YYYY-M-D"
                                input={true}
                        />
                        </div>
                        <br />
                    
                           <Form.Group controlId="formGridDuration">
                           <Form.Label>Duration (minutes)</Form.Label>
                           <Form.Control name="duration" value={this.state.duration} onChange={this.handleChange}/>
                           </Form.Group>

                       <Form.Group controlId="formGridActivity">
                           <Form.Label>Acivity</Form.Label>
                           <Form.Control name="activity" value={this.state.activity} onChange={this.handleChange}/>
                       </Form.Group>

                       <Button variant="primary mr-2" onClick={this.saveTraining}>
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

export default AddTraining;