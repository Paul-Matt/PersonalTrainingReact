import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddCustomer from './AddCustomer';
import Button from 'react-bootstrap/Button';
import EditCustomer from './EditCustomer';
import CustomerTrainings2 from './CustomerTrainings2';
import { Popconfirm, notification, Icon } from 'antd';
import 'antd/dist/antd.css';
import { Link, BrowserRouter, Route } from 'react-router-dom';


class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [], message: '', show: false };
      }
    
      componentDidMount() {
        this.loadCustomers();
      }
    
      // Fetch customers
      loadCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
          .then(response => response.json())
          .then(jsondata => this.setState({ customers: jsondata.content }))
          .catch(err => console.error(err));
      }

      // Add a new customer
      addCustomer = newCustomer => {
          fetch("https://customerrest.herokuapp.com/api/customers", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newCustomer)
          })
          .then(res => this.loadCustomers(),
            notification.open({
                message: 'Customer added',
                description:
                'The new customer details have been added.',
                duration:2,
                icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"  />,
            })
          )
          .catch(err => console.error(err));
      }

      
      editCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
            })
            .then(res => this.loadCustomers(),
                notification.open({
                    message: 'Customer updated',
                    description:
                    'The customer details have been updated.',
                    duration:2,
                    icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"  />,
                })
            )
            .catch(err => console.error(err));
        }

      deleteCustomer = (link) => {
            fetch(link, {method: 'DELETE'})
            .then(res => this.loadCustomers(),
                notification.open({
                    message: 'Customer deleted',
                    description:
                    'The selected customer has been removed.',
                    duration:2,
                    icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"  />,
                })
            )
            .catch(err => console.error(err))       
    };



      render() {
        const columnsAll = [{
            Header: "Customers",
            columns: [{
              Header: "Firstname",
              accessor: "firstname",
              filterMethod: (filter, row) => {
                const id = filter.id
                return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
              }
            }, {
              Header: "Lastname",
              accessor: "lastname",
              filterMethod: (filter, row) => {
                const id = filter.id
                return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
              }
            }, {
                Header: "Street address",
                accessor: "streetaddress",
                filterMethod: (filter, row) => {
                    const id = filter.id
                    return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
                  }
            }, {
                Header: "Postcode",
                accessor: "postcode"
            }, {
                Header: "City",
                accessor: "city",
                filterMethod: (filter, row) => {
                    const id = filter.id
                    return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
                  }
            }, {
                Header: "Email",
                accessor: "email",
                filterMethod: (filter, row) => {
                    const id = filter.id
                    return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
                  }
            }, {
                Header: "Phone number",
                accessor: "phone"
            }, {
                    Header: "",
                    accessor:"links[0].href",  
                    filterable: false,
                    sortable: false,
                    width: 90,
                    Cell: ({row, value}) => (<EditCustomer editCustomer={this.editCustomer} customer={row} link={value} />)
                }, {
                    Header: "",
                    accessor:"links[0].href", 
                    filterable: false,
                    sortable: false,
                    width: 80,
                    Cell: ({value}) => {
                        return <div>
					        <Popconfirm
                                title="Are you sure you want to delete this customer?"
                                onConfirm={() => this.deleteCustomer(value)}
                                placement="leftBottom"
                                okText="Yes"
                                okType="danger"
                                cancelText="Cancel"
                            >
                             <Button variant="danger mt-2" size="sm" >Delete</Button> 
                            </Popconfirm>
                            </div>
                    }
                }, {
                    Header: "",
                    accessor:"links[1].href", 
                    filterable: false,
                    sortable: false,
                    width: 80,
                    Cell: ({row, value}) => {return <Link to={{
                                            pathname: "/trainings",
                                            state: {value, row}
                                        }}>Trainings</Link>
                                       
                    //Cell: ({row, value}) => (<CustomerTrainings customer={row} link={value} />)
                    //Cell: ({value}) => (<Button color="secondary" size="small" onClick={() => <TrainingsByCustomer link={value} />}>Trainings</Button>)
                                    }
                }
            ]
        }
    ];

        return (
            <div>
                <AddCustomer addCustomer={this.addCustomer} />
              <ReactTable
                filterable={true}
                data={this.state.customers}
                columns={columnsAll}
                defaultPageSize={15}
              />
            </div>
        );
      }
}

export default CustomerList;