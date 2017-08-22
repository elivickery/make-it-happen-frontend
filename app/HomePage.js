import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AlertIOS
} from 'react-native';
import {
  Router,
  Scene,
  Actions,
  Modal
} from 'react-native-router-flux';
import axios from 'axios';

import Login from './containers/Login';
import Register from './containers/Register';
import User from './containers/User';
import Main from './containers/Main';
import Popup from './containers/Popup';
import Profile from './containers/Profile';


export default class make_it_happen_frontend extends Component {

  constructor() {
    super()

    this.state = {
      accessToken: null,
      logged_in: false
    }


    this.authenticateUser = this.authenticateUser.bind(this)
    this.createUser = this.createUser.bind(this)
  }


  authenticateUser(email, password) {

    axios.post('https://make-it-happen-api.herokuapp.com/api/login', {
        email: email,
        password: password
    })
    .then((response) => {
      this.setState({
        accessToken: response.data.accessToken,
        logged_in: true
      });
      Actions.user({accessToken: this.state.accessToken});
    })
    .catch(function (error) {
      console.log(error.response);
    });
 }


  createUser(username, email, password) {

    axios.post('https://make-it-happen-api.herokuapp.com/api/users', {
        username: username,
        email: email,
        password: password
    })
    .then((response) => {
      this.setState({
        accessToken: response.data.accessToken,
        logged_in: true
      });
      Actions.user({accessToken: this.state.accessToken});
    })
    .catch(function (error) {
      console.log(error.response);
    });
 }


  updateUser(email, password) {

    axios.post('https://make-it-happen-api.herokuapp.com/api/users/', {
        accessToken: response.data.accessToken,
        email: email,
        password: password
    })
    .then((response) => {
      this.setState({
        accessToken: response.data.accessToken,
        logged_in: true
      });
      Actions.user();
    })
    .catch(function (error) {
      console.log(error.response);
    });
 }


  render() {

    return (
      <Router>

      <Modal hideNavBar>

        <Scene key="root">
          <Scene key="main"
            component={Main}
            hideNavBar
            title="Make It Happen"
            initial={!this.state.logged_in}
          />
          <Scene
            key="user"
            component={User}
            hideNavBar
            title="My Goals"
            initial={this.state.logged_in}
            accessToken={this.state.accessToken}
          />
          <Scene
            key="profile"
            component={Profile}
            title="Update Profile"
            accessToken={this.state.accessToken}
            updateUser={this.updateUser}
          />
          <Scene
            key="login"
            component={Login}
            hideNavBar
            title="Login"
            authenticateUser={this.authenticateUser}
          />
          <Scene
            key="register"
            component={Register}
            title="Register"
            hideNavBar
            createUser={this.createUser}
          />
      </Scene>

      <Scene key="popup" component={Popup} title="Keep Going!" />
    </Modal>

    </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
