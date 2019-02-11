# VueCommander

![VueCommander Logo](logo.png "VueCommander Logo")

See [VueCommander.com](http://vuecommander.com) for documentation and examples.

VueCommander is a Vuejs application framework utilizing the classic ([GoF](https://en.wikipedia.org/wiki/Design_Patterns)) [command](https://en.wikipedia.org/wiki/Command_pattern) and [observer](https://en.wikipedia.org/wiki/Observer_pattern) design patterns, as well as dependency injection (which comes free with JavaScript) for easy and opinionated management of large applications. It provides a clear separation of concerns. VueCommander lets you parameterize methods with different requests, delay or queue a request execution, and support undoable operations.

## Benefits
By using the command design pattern, each action a user takes is self contained in an instance. This has huge benefits in that it can be stored in it's current state and reversed later. Storage of commands is extremely light weight. By creating a class for each command you can separate your business logic into proper methods and have a self contained unit of operation. See Getting Started below.

Undoing is historically implemented using either the command or memento design patterns. The command pattern has the benefit of being lighter weight (from a storage standpoint) because you can choose what you store and how to undo it. 

## Getting Started

See the examples directory for a list of examples.

Clone the repo and run

```
yarn build:examples
```

Compile the source

```
yarn build
```

Run the tests

```
yarn test
```

`Context`: A Context describes commands you would like to map to what events. 

`Commands`: A class with an execute method that cannot receive any parameters. It is a self contained unit of execution. You can use the command class to do all your business logic. You can inject any models you want to change into this command. Those models should be object literals which will act as singletons. 

`Models`: Are object literals which act as singletons.