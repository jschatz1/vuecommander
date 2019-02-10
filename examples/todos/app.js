import Vue from 'vue';
import context from './Context';
import Todos from './Todos.vue';

new Vue({
  el: '#app',
  context: context,
  render: h => h(Todos),
});