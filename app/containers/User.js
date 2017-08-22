import React, { PropTypes, Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Days from './Days'
import axios from 'axios'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Icon, Container, Title, Item, Input, Content, Button, Footer, Text, List, Fab } from 'native-base';
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

  componentWillMount(){
    console.log(this.props.accessToken)
    // change fetch url to all goals
    axios.get("https://make-it-happen-api.herokuapp.com/api/goals/achieved", {
        access_token: this.props.accessToken
    })
    .then((response) => {
      console.log(response)
      this.setState({
        achieved: response.data
      })
      console.log(this.state.achieved)
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

        <AnimatedCircularProgress
          size={150}
          width={20}
          fill={85}
          tintColor="#00e0ff"
          backgroundColor="#3d5875">
          {
            (fill) => (
              <Text style={styles.points}>
                { this.state.fill }
              </Text>
            )
          }
        </AnimatedCircularProgress>

        <Button
        title="Edit Profile"
        />
          {this.state.current ? <Days title={this.state.current.title} day={this.state.day} accessToken={this.props.accessToken}/> : <Button title="Add A Goal" />}
          {this.state.achieved ? <Text style={styles.centeredgoals}> Achieved Goals </Text> : null}
          <FlatList
            data={this.state.achieved}
            renderItem={({ item }) =>
              <Text style={styles.row}>{item.title}</Text>
            }
        />




      <Container style={styles.container}>
        <Title>My Progress</Title>

       <Text>User access token: {this.props.accessToken}</Text>
          {this.state.current ? <Days title={this.state.current.title} day={this.state.day} accessToken={this.props.accessToken}/> : <Button block info style={styles.hasmargin}><Text>Add A Goal</Text></Button>}
          {this.state.achieved ? <Text style={styles.centeredgoals}> Achieved Goals </Text> : null}

          <List dataArray={this.state.acheived}
            renderRow={(item) =>
              <ListItem>
                <Text>
                <Icon medium class={item.category_id} ios='ios-trophy' android='md-trophy'/>
                {item.title}</Text>
              </ListItem>
            }>
          </List>

          <Fab
            active={this.state.active}
            position="bottomRight"
            onPress={() => Actions.popup()}
            style={styles.actionButton}
            >
            <Icon large ios='ios-flame' android="md-flame" />
          </Fab>
      </Container>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredgoals: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent:'center',
    marginBottom: 10
  },
  hasmargin: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30
  },
  actionButton: {
    backgroundColor: "#FFA500"
  }
})
