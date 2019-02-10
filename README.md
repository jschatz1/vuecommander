# Vuec

Vuec is a Vuejs application framework utilizing the classic ([GoF](https://en.wikipedia.org/wiki/Design_Patterns)) [command](https://en.wikipedia.org/wiki/Command_pattern) and [observer](https://en.wikipedia.org/wiki/Observer_pattern) design patterns, as well as dependency injection (which comes free with JavaScript) for easy and opinionated management of large applications. It provides a clear separation of concerns. Vuec lets you parameterize methods with different requests, delay or queue a request execution, and support undoable operations.

## Benefits
By using the command design pattern, each action a user takes is self contained in an instance. This has huge benefits in that it can be stored in it's current state and reversed later. Storage of commands is extremely light weight. By creating a class for each command you can separate your business logic into proper methods and have a self contained unit of operation. See Getting Started below.

Undoing is historically implemented using either the command or memento design patterns. The command pattern has the benefit of being lighter weight (from a storage standpoint) because you can choose what you store and how to undo it. 

## Getting Started
Start by creating a project with the Vue CLI. Add files to create the following structure (A Vue CLI plugin is in the works):

```
/commands
  - HelloCommand.js
/components
  - Hello.vue
/models
  - HelloModel.js
context.js
main.js
App.vue
```

`Commands`: A class with an execute method that cannot receive any parameters. It is a self contained unit of execution. You can use the command class to do all your business logic. You can inject any models you want to change into this command. Those models should be object literals which will act as singletons. 

`Models`: Are object literals which act as singletons. 

### `models/HelloModel.js`

```javascript
export default {
  message: 'Hello',
};
```

### `commands/HelloCommand.js`

```javascript
import HelloModel from '@/models/HelloModel';

export default class HelloCommand {
  constructor(event) {
    this.event = event;
  }

  execute() {
    HelloModel.message = this.event.data;
  }
}
```

### `Context.js`

```javascript
import HelloCommand from '@/commands/HelloCommand';
import { EventManager } from '@/events/EventManager';
import Mapper from '@/Mapper';

export const events = new EventManager();
export const mapper = new Mapper(events);

export function initContext() {
  mapper.mapCommand(HelloCommand, 'Hello.ButtonClicked');
  mapper.mapCommand(HelloCommand, 'Hello.InputChanged');
}
```

### `components/Hello.vue`

```vue
<template>
  <div class="hello">
    <p>{{ message }}</p>
    <input type="text" @input="inputUpdated" />
  </div>
</template>

<script>
import HelloModel from '@/models/HelloModel';
import { events } from '@/Context';

export default {
  name: 'Hello',
  data() {
    return HelloModel;
  },
  methods: {
    inputUpdated(e) {
      events.notify('Hello.InputChanged', e.currentTarget.value);
    },
  },
};
</script>
```

### `App.vue`
Update your `App.vue` to add a `beforeCreate` lifecycle hook and add in your component.

```vue
import { initContext } from '@/Context';
import Hello from '@/components/Hello';

export default {
  name: 'App',
  beforeCreate() {
    initContext();
  },
  components: {
    Hello,
  },
};
```