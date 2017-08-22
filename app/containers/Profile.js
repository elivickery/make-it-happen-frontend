import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AlertIOS
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    this.editUser = this.editUser.bind(this)
  }


  editUser(){
    this.props.updateUser(this.state.email, this.state.password)
  }

  render() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Edit Profile</Text>
      <TextInput
          value={this.state.email}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(email) => this.setState({email})}
          onSubmitEditing={() => this.passwordInput.focus()}
        />
        <TextInput
          value={this.state.password}
          returnKeyType="go"
          keyboardType="default"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(password) => this.setState({password})}
          ref={(input) => this.passwordInput = input}
          onSubmitEditing={this.editUser}
        />
        <Button title="Update" onPress={this.editUser}>
        </Button>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    width:200,
    padding: 3,
    margin: 10
  }
});
