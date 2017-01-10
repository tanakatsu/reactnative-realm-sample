/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene, ActionConst } from 'react-native-router-flux';

import Todos from './Todos';
import TodoForm from './TodoForm';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import * as reducers from '../reducers/';

const logger = createLogger();
const middlewares = [thunk, logger];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="todos" component={Todos} title="Todos" initial={true} />
            <Scene key="todo_form" component={TodoForm} title="Todo Item" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
