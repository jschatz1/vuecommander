import Vue from 'vue';
import { TodoDoneCommand, TodoAddCommand, TodoDeleteCommand } from './TodoCommands';
import Vuec from '../../dist/vuec.common.js';

Vue.use(Vuec);

export default new Vuec.Context({
  'todo.done': TodoDoneCommand,
  'todo.submitted': TodoAddCommand,
  'todo.delete': TodoDeleteCommand,
});