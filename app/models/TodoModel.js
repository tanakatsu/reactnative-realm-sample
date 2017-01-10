import realm from './realm';
import { TodoSchema } from './realmSchema';

class TodoModel {
  load_all() {
    const results = realm.objects('Todo');

    // https://github.com/realm/realm-js/issues/323#issuecomment-197070525
    const todos = results.map((result) => {
      var object = {};
      for (let property in TodoSchema.properties) {
        object[property] = result[property];
      }
      return object;
    });

    return todos;
  }

  insert(todo) {
    realm.write(() => {
      realm.create('Todo', todo);
    });
  }

  update(todo) {
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
  }

  destroy(id) {
    realm.write(() => {
      const _todo = realm.objects('Todo').filtered(`id == ${id}`)[0];
      realm.delete(_todo);
    });
  }
}

export default new TodoModel();

