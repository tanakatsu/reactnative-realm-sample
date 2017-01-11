import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, ListView, Text } from 'react-native';
import Todo from '../components/Todo';
import MyButton from '../components/MyButton';

import * as todoActions from '../actions/todoActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Todos extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentWillMount() {
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  componentDidMount() {
    const { state, actions } = this.props;
    if (!state.isLoaded) {
      actions.load_items_from_realm();
    }
  }

  _onPressed() {
    const newTodo = {id: null, title: ''};
    Actions.todo_form({model: newTodo, title: 'Add new todo'});
  }

  render() {
    const { state } = this.props;

    return (
      <View style={styles.container}>
        <MyButton text='+ Add new' onPress={this._onPressed} />
        <ListView
          style={{marginTop: 15}}
          dataSource={this.ds.cloneWithRows(state.todos)}
          renderRow={(rowData) => <Todo model={rowData} />}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65
  }
});

function mapStateToProps(state) {
  return { state: state.todo };
}
function mapActionsToProps(dispatch) {
  return { actions: bindActionCreators(todoActions, dispatch) }
}
export default connect(mapStateToProps, mapActionsToProps)(Todos);
