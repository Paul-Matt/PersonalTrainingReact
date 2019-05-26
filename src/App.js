import React, { Component } from 'react';
import TrainingList from './components/TrainingList';
import CustomerList from './components/CustomerList';
import CustomerTrainings2 from './components/CustomerTrainings2';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Navigator from './components/Navigator';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <div>
            <Navigator />
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
