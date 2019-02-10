import TodosModel from './TodosModel';

function remapIndices(todos) {
  return todos.map((todo, index) => {
    todo.id = index;
    return todo;
  });
}

export class TodoDoneCommand {
  constructor(e) {
    this.backup;
    this.event = e;
    this.todo = this.event.data;
  }

  saveState() {
    this.backup = TodosModel.todos[this.todo.id].done;
  }

  undo() {
    TodosModel.todos[this.todo.id].done = this.backup;
  }

  execute() {
    TodosModel.todos[this.todo.id].done = !TodosModel.todos[this.todo.id].done;
  }
}

export class TodoAddCommand {
  constructor(e) {
    this.backup;
    this.event = e;
  }

  saveState() {
    this.backup = TodosModel.todos.length;
  }

  undo() {
    TodosModel.todos.splice(this.backup, 1);
    TodosModel.todos = remapIndices(TodosModel.todos);
  }

  execute() {
    const todo = {
      id: TodosModel.todos.length,
      content: this.event.data,
      done: false,
    }
    TodosModel.todos.push(todo);
    TodosModel.currentInput = '';
  }
}

export class TodoDeleteCommand {
  constructor(e) {
    this.backup;
    this.event = e;
  }

  saveState() {
    this.backup = TodosModel.todos[this.event.data.id];
  }

  undo() {
    TodosModel.todos.splice(this.backup.id, 0, this.backup);
    TodosModel.todos = remapIndices(TodosModel.todos);
  }

  execute() {
    TodosModel.todos.splice(this.event.data.id, 1);
    TodosModel.todos = remapIndices(TodosModel.todos);
  }
}