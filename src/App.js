import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import TrainingList from './components/TrainingList';
import CustomerList from './components/CustomerList';
import CustomerTrainings2 from './components/CustomerTrainings2';
import Calendar from './components/Calendar';
import Home from './components/Home';
import Navigator from './components/Navigator';
import Login from './components/Login';
import { firebaseAuth } from './config';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest, }) => (
  <Route {...rest} render={props => (
    isAuthenticated === true ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

function authUser() {
  return new Promise(function (resolve, reject) {
     firebaseAuth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('User not logged in');
        }             
     });
  });
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null, isAuthenticated : false, isAuthenticating: true};
  }


  // To fix issue with authentication from Firebase coming asynchronously, and pages rendering with login request before authentication succeeds, 
  // added authUser to ComponentDidMount. While waiting for authentication a loading message will be displayed.
  componentDidMount() {
    authUser().then((user) => {
      this.setState({ user: user, isAuthenticated: true });
       this.setState({ isAuthenticating: false });
    }, (error) => {
      this.setState({ user: null, isAuthenticated: false });
       this.setState({ isAuthenticating: false });
       alert(error);
    });
  }


  render() {
    //alert(this.state.isAuthenticated);

    if (this.state.isAuthenticating) { 
      return <p>Loading..</p>;
    } 

    return (
      <div className="App">
        <BrowserRouter>
        <div>
            <Navigator isAuthenticated={this.state.isAuthenticated}/>
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/customers" component={CustomerList} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/all" component={TrainingList} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/trainings" component={CustomerTrainings2} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/calendar" component={Calendar} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
        </div>
        </BrowserRouter>
      </div>
      
    );
  }
}

export default App;
