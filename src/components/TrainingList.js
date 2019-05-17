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
        const columns = [
          {
            Header: "Id",
            accessor: "id"
          },
          {
            Header: "Date",
            accessor: "date",
            filterable: false,
				    Cell: row => {
				    	return <div>
						    {moment(row.original.date).format('D MMM YY, H:mm')}
              </div>;
            }
          },
          {
            Header: "Duration",
            accessor: "duration"
          },
          {
            Header: "Activity",
            accessor: "activity"
          } 
    ];

        return (
            <div>
              <ReactTable
                filterable={true}
                data={this.state.trainings}
                columns={columns}
                defaultPageSize={15}
              />
            </div>
        );
      }
}

export default TrainingList;