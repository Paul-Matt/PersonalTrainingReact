import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment';

class CustomerTrainings extends Component {
    state = { trainings: [], open: false, message: '' };
      
    
      handleClickOpen = () => {
          //alert(this.props.link);
        
        this.setState({ show: true });
        this.loadTrainings();
      };

      // Fetch trainings
      loadTrainings = () => {
        //alert(this.state.link);
        fetch(this.props.link)
          .then(response => response.json())
          .then(jsondata => this.setState({ trainings: jsondata.content }))
          .catch(err => console.error(err));
      }

      handleClose = () => {
        this.setState({ show: false });
      };
    


      render() {
        const columnsAll = [{
          columns: [
          {
            Header: "Date",
            accessor: "date",
            // Custom filter method for filtering by date. Excerpt from documentation:
            /* Filtering
              filterMethod: (filter, row || rows, column) => {return true}, // A function returning a boolean that specifies the filtering logic for the column
              'filter' == an object specifying which filter is being applied. Format: {id: [the filter column's id], value: [the value the user typed in the filter field], pivotId: [if filtering on a pivot column, the pivotId will be set to the pivot column's id and the `id` field will be set to the top level pivoting column]}
              'row' || 'rows' == the row (or rows, if filterAll is set to true) of data supplied to the table
              'column' == the column that the filter is on */
            // Using moment.js to format date into comparable form
            filterMethod: (filter, row) => {
              const id = filter.id
              return row[id] !== undefined ? String(moment(row[id]).format('D.MM.YYYY, H:mm')).startsWith(filter.value) : true
            },
				    Cell: row => {
				    	return <div>
						    {moment(row.original.date).format('D.MM.YYYY, H:mm')}
              </div>;
            }
          },
          {
            Header: "Duration",
            accessor: "duration"
          },
          {
            Header: "Activity",
            accessor: "activity",
            // Here custom filter transforms input to lower case letters to make comparing easier. The value compared to is also formatted to lower case.
            filterMethod: (filter, row) => {
              const id = filter.id
              return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
            }
          }]
        }
    ];

        return (
            <div>
              <Button variant="secondary mt-2 mb-2" size="sm" onClick={this.handleClickOpen}>Trainings</Button>
            
              <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.customer.firstname} {this.props.customer.lastname}'s trainings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    <ReactTable
                        filterable={true}
                        data={this.state.trainings}
                        columns={columnsAll}
                        defaultPageSize={15}
                    />


                    </Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>
            </div>
        );
      }
}


export default CustomerTrainings;