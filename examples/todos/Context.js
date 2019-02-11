import Vue from 'vue';
import { TodoDoneCommand, TodoAddCommand, TodoDeleteCommand } from './TodoCommands';
import VueCommander from 'vuecommander';

Vue.use(VueCommander);

export default new VueCommander.Context({
  'todo.done': TodoDoneCommand,
  'todo.submitted': TodoAddCommand,
  'todo.delete': TodoDeleteCommand,
});