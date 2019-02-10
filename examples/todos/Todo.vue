<template>
  <div class="box level">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            {{todo.content}}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item button" :class="{'is-info': todo.done}" @click="todoDone">
              <span class="icon is-small">
                <i class="fas fa-check" aria-hidden="true"></i>
              </span>
              <span>Done</span>
            </a>
            <a class="level-item button is-danger is-outlined" v-if="todo.done" @click="todoDelete">
              <span class="icon is-small">
                <i class="fas fa-trash-alt" aria-hidden="true"></i>
              </span>
              <span>Delete</span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  name: 'todo',
  props: ['todo'],
  methods: {
    todoDone() {
      this.$context.events.notify('todo.done', this.todo);
    },

    todoDelete() {
      this.$context.events.notify('todo.delete', this.todo);
    }
  }
}
</script>