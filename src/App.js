import React, { Component } from 'react';
import TrainingList from './components/TrainingList';
import CustomerList from './components/CustomerList';
import CustomerTrainings2 from './components/CustomerTrainings2';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Navigator from './components/Navigator';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <BrowserRouter>
        <div>
            <Link to="/">Home</Link>{' '}
            <Link to="/customers">Customers</Link>{' '}
            <Link to="/all">All trainings and customers</Link>{' '}
            <Link to="/trainings">Trainings by customer</Link>{' '}
            <Switch>
              <Route exact path="/" component={CustomerList} />
              <Route path="/customers" component={CustomerList} />
              <Route path="/all" component={TrainingList} />
              <Route path="/trainings" component={CustomerTrainings2} />
            </Switch>
        </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
