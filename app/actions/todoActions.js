import * as types from './actionTypes';
import realm from './realm';
import { TodoSchema } from './realmSchema';

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

export function load_items_from_realm() {
  const results = realm.objects('Todo');

  // https://github.com/realm/realm-js/issues/323#issuecomment-197070525
  const todos = results.map((result) => {
    var object = {};
    for (let property in TodoSchema.properties) {
      object[property] = result[property];
    }
    return object;
  });

  return {
    type: types.LOAD_ITEMS,
    value: todos
  }
}

export function add_item_to_realm(title) {
  return (dispatch, getState) => {
    const lastId = getState().todo.lastId;
    realm.write(() => {
      realm.create('Todo', {id: lastId + 1, title: title});
    });

    dispatch({
      type: types.ADD_ITEM,
      value: title
    })
  }
}

export function update_item_to_realm(todo) {
  realm.write(() => {
    const _todo = realm.objects('Todo').filtered(`id == ${todo.id}`)[0];
    const properties = Object.keys(TodoSchema.properties).filter((elm) => {
      if (elm === 'id') {
        return false;
      }
      return true;
    });
    properties.forEach((p) => {
      _todo[p] = todo[p];
    });
  });

  return {
    type: types.UPDATE_ITEM,
    value: todo
  }
}

export function delete_item_to_realm(todo) {
  realm.write(() => {
    const _todo = realm.objects('Todo').filtered(`id == ${todo.id}`)[0];
    realm.delete(_todo);
  });

  return {
    type: types.DELETE_ITEM,
    value: todo
  }
}


