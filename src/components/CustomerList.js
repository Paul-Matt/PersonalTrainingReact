import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddCustomer from './AddCustomer';
import Button from 'react-bootstrap/Button';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [], open: false, message: '' };
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
            }]
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