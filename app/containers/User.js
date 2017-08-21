import React, { PropTypes, Component } from 'react'
import { View, Text, List, Button, FlatList, StyleSheet } from 'react-native'
import Days from './Days'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';

export default class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      achieved: null,
      day: [],
      current: null
    }
  }

  componentDidMount(){
    // change fetch url to all goals
    axios.get("https://make-it-happen-api.herokuapp.com/api/goals/achieved", {
        access_token: this.props.accessToken
    })
    .then((response) => {
      this.setState({
        goals: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get("https://make-it-happen-api.herokuapp.com/api/days/count", {
        access_token: this.props.accessToken
    })
    .then((response)=> {
      this.setState({
        day: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    // only show popup every 3rd day
    // if(this.state.day % 3 === 0) {
    //   Actions.popup();
    // }

    // add when Day's controller's current method in backend is up.
    // axios.get("https://make-it-happen-api.herokuapp.com/api/days/count")
    // .then((response)=> {
    //   this.setState({
    //     current: response.data
    //   })
    // })
    //     .catch(function (error) {
    //       console.log(error);
    //     });

  }


  //link new goal button when new submit goal form is established.
  render () {
    return (
      <View>

          {this.state.current ? <Days title={this.state.current.title} day={this.state.day} accessToken={this.props.accessToken}/> : <Button title="Add A Goal" />}
          {this.state.achieved ? <Text style={styles.centeredgoals}> Achieved Goals </Text> : null}
          <FlatList
            data={this.state.achieved}
            renderItem={({ item }) =>
              <Text style={styles.row}>{item.title}</Text>
            }
        />
        <Button title="Motivational GIF" onPress={() => Actions.popup()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centeredgoals: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent:'center',
    marginBottom: 10
  },
  row: {
    backgroundColor: '#f4f4f4',
    fontSize: 15,
    color: '#696969'
  }
})
