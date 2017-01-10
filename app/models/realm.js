import { TodoSchema } from './realmSchema';
const Realm = require('realm');

export default new Realm({schema: [TodoSchema]});
