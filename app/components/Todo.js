/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.todo = this.props.model;
  }

  _onPressed() {
    Actions.todo_form({model: this.todo, title: 'Edit todo'});
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onPressed.bind(this)} underlayColor='#F1C40F'>
          <Text style={styles.text}>{this.todo.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
  },
  text: {
    textAlign: 'left',
    fontSize: 24
  }
});
