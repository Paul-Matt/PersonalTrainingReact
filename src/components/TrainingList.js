import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment';

class TrainingList extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [], open: false, message: '' };
      }
    
      componentDidMount() {
        this.loadTrainings();
      }
    
      // Fetch trainings
      loadTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
          .then(response => response.json())
          .then(jsondata => this.setState({ trainings: jsondata }))
          .catch(err => console.error(err));
      }


      render() {
        const columnsAll = [{
          columns: [
          {
            Header: "Id",
            accessor: "id"
          },
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
        }, {
            Header: "Customer",
            columns: [{
              Header: "Firstname",
              accessor: "customer.firstname",
              filterMethod: (filter, row) => {
                const id = filter.id
                return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
              }
            }, {
              Header: "Lastname",
              accessor: "customer.lastname",
              filterMethod: (filter, row) => {
                const id = filter.id
                return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
              }
            }]
        }
    ];

        return (
            <div>
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

export default TrainingList;