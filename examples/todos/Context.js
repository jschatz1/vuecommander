import Vue from 'vue';
import { TodoDoneCommand, TodoAddCommand, TodoDeleteCommand } from './TodoCommands';
import VueGlue from 'vueglue';

Vue.use(VueGlue);

export default new VueGlue.Context({
  'todo.done': TodoDoneCommand,
  'todo.submitted': TodoAddCommand,
  'todo.delete': TodoDeleteCommand,
});