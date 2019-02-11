import Vue from 'vue';
import { TodoDoneCommand, TodoAddCommand, TodoDeleteCommand } from './TodoCommands';
import Vueglue from '../../dist/vueglue.common.js';

Vue.use(Vueglue);

export default new Vueglue.Context({
  'todo.done': TodoDoneCommand,
  'todo.submitted': TodoAddCommand,
  'todo.delete': TodoDeleteCommand,
});