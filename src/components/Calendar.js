import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';


const localizer = BigCalendar.momentLocalizer(moment)



class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = { trainings: [], events: [], customer: this.props.location.state.customerUrl };
      }

      componentDidMount() {
          //alert(this.state.customer);
        this.loadTrainings();
      };
    
     

      // Fetch trainings
      loadTrainings = () => {
        fetch(`${this.props.location.state.customerUrl}/trainings`)
          .then(response => response.json())
          .then(jsondata => {
            this.setState({ trainings: jsondata.content });
            this.createEventList();
          })
          .catch(err => console.error(err));
      }

      createEventList = () => {
        let eventArray = [];
          for (let i = 0; i < this.state.trainings.length; i++) {
            if (this.state.trainings !== null) {
              eventArray[i] = {
                title: `${this.state.trainings[i].activity}`,
                duration: `${this.state.trainings[i].duration}`,
                start: new Date(this.state.trainings[i].date),
                end: new Date(moment(this.state.trainings[i].date).add(this.state.trainings[i].duration, 'm')),
                allDay: false
              }
            }
          }
        this.setState({ events: [...eventArray] });
        //alert(eventArray[0].start);
        //alert(eventArray[0].duration);
        //alert(eventArray[0].end);
      }


    render() {
        return (
            <div style={{ marginTop: 10, marginBottom: 100, marginLeft: "auto", marginRight: "auto", height: "80vh", maxWidth: "80vw" }}>
        
                    <h5>{this.props.location.state.firstname} {this.props.location.state.lastname}'s Trainings Calendar</h5>
                    <BigCalendar
                    localizer={localizer}
                    events={this.state.events}
                    defaultDate={new Date()}
                    views={['month', 'day', 'week']}
                    startAccessor="start"
                    endAccessor="end"
                    />


            </div>
        );
    }
}



export default Calendar;