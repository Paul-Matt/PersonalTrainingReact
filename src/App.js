import React, { Component } from 'react';
import TrainingList from './components/TrainingList';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              TrainingList
            </Typography>
          </Toolbar>
        </AppBar>
        <TrainingList />
      </div>
    );
  }
}

export default App;
