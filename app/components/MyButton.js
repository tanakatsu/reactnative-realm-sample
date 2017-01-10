/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class MyButton extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.button} onPress={this.props.onPress} underlayColor='#F1C40F'>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: '#6495ED',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    padding: 10
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
});
