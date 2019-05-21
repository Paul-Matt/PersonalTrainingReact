import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddCustomer from './AddCustomer';
import Button from 'react-bootstrap/Button';
import EditCustomer from './EditCustomer';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [], open: false, message: '', show: false };
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
          .then(res => this.loadCustomers())
          // Muokkaa omaan alerttiin sopivaksi?
          .then(res => this.setState({open: true, message: 'New customer saved'}))
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
            .then(res => this.loadCustomers())
            .then(res => this.setState({open: true, message: 'Customer saved'}))
            .catch(err => console.error(err));
        }

      deleteCustomer = (link) => {
        //alert(link);
        if (window.confirm("Are you sure?")) {
            fetch(link, {method: 'DELETE'})
            .then(res => this.loadCustomers())
            .then(res => this.setState({open: true, message: 'Customer deleted'}))
            .catch(err => console.error(err))
            
        }
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
                    Cell: ({value}) => <Button variant="danger mt-2" size="sm" onClick={() => this.deleteCustomer(value)}>Delete</Button> 
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