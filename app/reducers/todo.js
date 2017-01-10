import * as types from '../actions/actionTypes';

const initialState = {
  todos: [],
  lastId: 0
};

export default function todo(state = initialState, action = {}) {
  let _todos;

  switch(action.type) {
    case types.ADD_ITEM:
      _todos = state.todos.concat({id: state.lastId + 1, title: action.value});
      return {
        ...state,
        todos: _todos,
        lastId: state.lastId + 1
      };
    case types.UPDATE_ITEM:
      _todos = state.todos.map((elm) => {
        if (elm.id === action.value.id) {
          elm = action.value;
        }
        return elm;
      });
      return {
        ...state,
        todos: _todos
      };
    case types.DELETE_ITEM:
      _todos = state.todos.filter((elm) => {
        if (elm.id !== action.value.id) {
          return true;
        }
      });
      return {
        ...state,
        todos: _todos
      };
    default: 
      return state;
  }
}
