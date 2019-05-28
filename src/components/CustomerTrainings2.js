import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment';
import AddTraining from './AddTraining';
import { Popconfirm, notification, Icon } from 'antd';
import 'antd/dist/antd.css';
import Calendar from './Calendar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, BrowserRouter, Route } from 'react-router-dom';



class CustomerTrainings extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [], open: false, message: '', customerUrl: this.props.location.state.value  };
    }
    
      
    componentDidMount() {
      this.setState({
        customerUrl: this.props.location.state.value
      })
        this.loadTrainings();
      }

      // Fetch trainings
      loadTrainings = () => {
          //alert(`${this.props.location.state.value}/trainings`);
          //alert(this.props.location.state.row.firstname);
          //alert(this.state.customerUrl); 
          //https://customerrest.herokuapp.com/api/customers/1
        fetch(`${this.props.location.state.value}/trainings`)
          .then(response => response.json())
          .then(jsondata => this.setState({ trainings: jsondata.content }))
          .catch(err => console.error(err));
      }

      // Add a new training
      addTraining = newTraining => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
        .then(res => this.loadTrainings(),
          notification.open({
              message: 'Training added',
              description:
              'The new training details have been added.',
              duration:2,
              icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"  />,
          })
        )
        .catch(err => console.error(err));
    }

        deleteTraining = (link) => {
            //alert(link);
            fetch(link, {method: 'DELETE'})
            .then(res => this.loadTrainings(),
                notification.open({
                    message: 'Training deleted',
                    description:
                    'The selected training has been removed.',
                    duration:2,
                    icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"  />,
                })
            )
            .catch(err => console.error(err))       
    };


      render() {
          // To consider: could getHeaderProps: () => (...), or getProps: () => (...) }] be used for this?
          const firstname = this.props.location.state.row.firstname;
          const lastname = this.props.location.state.row.lastname;
          var customer = `${firstname} ${lastname}'s trainings`;
        const columnsAll = [{
            Header: customer,
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
            },
          }, {
            Header: "",
            accessor:"links[0].href", 
            filterable: false,
            sortable: false,
            width: 80,
            Cell: ({value}) => {
                return <div>
                    <Popconfirm
                        title="Are you sure you want to delete this training?"
                        onConfirm={() => this.deleteTraining(value)}
                        placement="leftBottom"
                        okText="Yes"
                        okType="danger"
                        cancelText="Cancel"
                    >
                     <Button variant="danger mt-2" size="sm" >Delete</Button> 
                    </Popconfirm>
                    </div>
            }
          }]
        }
    ];

        return (
            <div>
              <Row className="justify-content-md-center">
                <Col xs lg="2">
                 <AddTraining addTraining={this.addTraining} customer={this.state.customerUrl} />
                </Col>
                <Col xs lg="2">
                  <Link to={{
                    pathname: "/calendar",
                    state: {customerUrl:this.state.customerUrl, 
                            firstname, 
                            lastname}
                    }}>Calendar</Link>
                  </Col>
              </Row>
                    <ReactTable
                        filterable={true}
                        data={this.state.trainings}
                        columns={columnsAll}
                        defaultPageSize={15}
                    />
            </div>
        );
      }
}


export default CustomerTrainings;