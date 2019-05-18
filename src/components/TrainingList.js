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