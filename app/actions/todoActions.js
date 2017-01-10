import * as types from './actionTypes';

export function add_item(title) {
  return {
    type: types.ADD_ITEM,
    value: title
  }
}

export function update_item(todo) {
  return {
    type: types.UPDATE_ITEM,
    value: todo
  }
}

export function delete_item(todo) {
  return {
    type: types.DELETE_ITEM,
    value: todo
  }
}
