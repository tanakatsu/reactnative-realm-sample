import { TodoSchema } from './realmSchema';
const Realm = require('realm');

const realm = new Realm({schema: [TodoSchema]});
export default realm;
