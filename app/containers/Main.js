import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Container, Title, Content, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Main extends Component {

  render() {
  return (
    <Container style={styles.container}>
      <Title>Make It Happen</Title>
        <Button block info style={styles.hasmargin} onPress={() => Actions.login()}>
          <Text>Log In</Text>
        </Button>
        <Button block info style={styles.hasmargin} onPress={() => Actions.register()}>
          <Text>Register</Text>
        </Button>
    </Container>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#000',
  },
  hasmargin: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30
  }

});

