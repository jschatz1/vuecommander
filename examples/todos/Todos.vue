<template>
  <section>
    <div class="column">
      <div class="level">
        <a class="button level-item" @click="undo">Undo</a>
      </div>
      <input type="text" class="input" placeholder="What do you want to do today?" :value="currentInput" @keydown.enter="submitTodo">
    </div>
    <div class="column">
    <p v-if="!todos.length" class="is-size-2 is-italic has-text-grey-light">Nothing left todo!</p>
    <ul>
      <li v-for="todo in todos">
        <todo :todo="todo"></todo>
      </li>
    </ul>
    </div>
  </section>
</template>
<script>
import TodosModel from './TodosModel';
import Todo from './Todo.vue';
export default {
  name: 'todos',
  components: {
    Todo,
  },
  data() {
    return TodosModel;
  },

  methods: {
    submitTodo(e) {
      this.$context.events.notify('todo.submitted', e.currentTarget.value);
    },

    undo() {
      if(this.$context.history.length){
        this.$context.history.pop().undo();
      }
    }
  }
}
</script>