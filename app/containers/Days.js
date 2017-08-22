import React, { PropTypes, Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import axios from 'axios'


export default class Days extends Component {
  constructor(props) {
    super(props);
  }

  buttonPressComplete(){
    axios.patch('https://make-it-happen-api.herokuapp.com/api/days/edit', {
      status: "achieved",
      access_token: this.props.accessToken
    })
    .then((response) => {
      console.log(response);
  });
  }

  buttonPressInComplete(){
    axios.patch('https://make-it-happen-api.herokuapp.com/api/days/edit', {
      status: "failed",
      access_token: this.props.accessToken
    })
    .then((response) => {
      console.log(response);
  });
  }

  render () {
    return (
      <View>
        <Text>
          {this.props.title}
        </Text>
        <Text style={styles.day}>
          {this.props.day}/21 Days
        </Text>
        <Button
          onPress={this.buttonPressComplete}
          title="Completed"
        />
        <Button
          onPress={this.buttonPressInComplete}
          title="Not Completed"
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  day: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    justifyContent:'center',
    marginBottom: 10
  }
})



