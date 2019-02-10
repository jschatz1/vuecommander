import Vue from 'vue';
import context from './Context';
import Counter from './Counter.vue';

new Vue({
  el: '#app',
  context: context,
  render: h => h(Counter)
});