import React, { PropTypes, Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Icon, Container, Title, Item, Input, Content, Button, Text, Fab } from 'native-base'
import { Actions } from 'react-native-router-flux';

export default class Popup extends Component {
  render () {
    return (
      <Container style={styles.backwall}>
        <Image source={{uri: 'https://media.giphy.com/media/3o85xtLX7zCyeeWGLC/giphy.gif'}}
        style={styles.gif}/>
        <Fab large
          position="topRight"
          onPress={() => Actions.pop()}
          style={styles.actionButton}>
          <Icon name="close" />
        </Fab>
      </Container>
    )
  }
}

const styles = StyleSheet.create ({
  backwall: {
    backgroundColor: '#708090',
    flex: 1
  },
  gif: {
     // top: 140,
    // left: -25,
    // position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: 350,
    // height: 200,
    // marginLeft: 20
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  actionButton: {
    backgroundColor: 'transparent'
  }
})
