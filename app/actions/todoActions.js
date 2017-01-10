import * as types from './actionTypes';
import TodoModel from '../models/TodoModel';

// export function add_item(title) {
//   return {
//     type: types.ADD_ITEM,
//     value: title
//   }
// }
//
// export function update_item(todo) {
//   return {
//     type: types.UPDATE_ITEM,
//     value: todo
//   }
// }
//
// export function delete_item(todo) {
//   return {
//     type: types.DELETE_ITEM,
//     value: todo
//   }
// }

export function load_items_from_realm() {
  const todos = TodoModel.load_all();

  return {
    type: types.LOAD_ITEMS,
    value: todos
  }
}

export function add_item_to_realm(title) {
  return (dispatch, getState) => {
    const lastId = getState().todo.lastId;
    TodoModel.insert({id: lastId + 1, title: title});

    dispatch({
      type: types.ADD_ITEM,
      value: title
    })
  }
}

export function update_item_to_realm(todo) {
  TodoModel.update(todo);

  return {
    type: types.UPDATE_ITEM,
    value: todo
  }
}

export function delete_item_to_realm(todo) {
  TodoModel.destroy(todo.id);

  return {
    type: types.DELETE_ITEM,
    value: todo
  }
}


