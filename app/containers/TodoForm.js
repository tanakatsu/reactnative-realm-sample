/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, TextInput } from 'react-native';
import MyButton from '../components/MyButton';

import * as todoActions from '../actions/todoActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = { todo: this.props.model };
  }

  _onChangeText(text) {
    this.setState({ todo: Object.assign({}, this.state.todo, { title: text }) });
  }

  _onSubmit() {
    const todo = this.state.todo;

    if (todo.id) {
      this._updateItem(todo);
    } else {
      this._addItem(todo);
    }
  }

  _addItem(todo) {
    const { actions } = this.props;

    actions.add_item_to_realm(this.state.todo.title);
    Actions.todos();
  }

  _updateItem(todo) {
    const { actions } = this.props;

    actions.update_item_to_realm(todo);
    Actions.todos();
  }

  _deleteItem() {
    const { actions } = this.props;

    const todo = this.state.todo;
    actions.delete_item_to_realm(todo);
    Actions.todos();
  }

  render() {
    const { state, actions } = this.props;

    return (
      <View style={styles.container}>
        <TextInput style={styles.textinput} onChangeText={this._onChangeText.bind(this)} value={this.state.todo.title} autoCapitalize='none' autoCorrect={false} />

        <MyButton text='Save' onPress={this._onSubmit.bind(this)} />
        { this.state.todo.id ? <MyButton text='Delete' onPress={this._deleteItem.bind(this)} /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65
  },
  textinput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
});

function mapStateToProps(state) {
  return { state: state.todo };
}
function mapActionsToProps(dispatch) {
  return { actions: bindActionCreators(todoActions, dispatch) }
}
export default connect(mapStateToProps, mapActionsToProps)(TodoForm);
