function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Interface =
/*#__PURE__*/
function () {
  function Interface() {
    _classCallCheck(this, Interface);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.fields = args;
  }

  _createClass(Interface, [{
    key: "implementedBy",
    value: function implementedBy(cls) {
      this.fields.forEach(function (arg) {
        if (!cls[arg]) {
          throw new Error("Class ".concat(cls.constructor.name, " does not implement method \"").concat(arg, "\""));
        }
      });
    }
  }]);

  return Interface;
}();

var HistoryManager =
/*#__PURE__*/
function () {
  function HistoryManager() {
    _classCallCheck(this, HistoryManager);

    this.history = [];
  }

  _createClass(HistoryManager, [{
    key: "clear",
    value: function clear() {
      this.history = [];
    }
  }, {
    key: "push",
    value: function push(command) {
      return this.history.push(command);
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.history.pop();
    }
  }]);

  return HistoryManager;
}();
var EventManager =
/*#__PURE__*/
function () {
  function EventManager() {
    _classCallCheck(this, EventManager);

    this.listeners = {};
  }

  _createClass(EventManager, [{
    key: "subscribe",
    value: function subscribe(eventType, listener) {
      if (!this.listeners[eventType]) {
        this.listeners[eventType] = [];
      }

      this.listeners[eventType].push(listener);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(eventType, listener) {
      var listeners = this.listeners[eventType];
      if (!listeners) return -1;
      var index = listeners.indexOf(listener);

      if (index > -1) {
        listeners.splice(index, 1);
      }

      this.listeners[eventType] = listeners;
      return index;
    }
  }, {
    key: "notify",
    value: function notify(eventType, data) {
      var listeners = this.listeners[eventType];
      if (!listeners) return -1;
      var notified = [];
      listeners.forEach(function (listener) {
        var payload = {
          eventType: eventType,
          data: data
        };
        listener.update(payload);
        notified.push({
          listener: listener,
          eventType: eventType,
          data: data
        });
      });
      return notified;
    }
  }]);

  return EventManager;
}();
var IEventListener = new Interface('update');

var Mapper =
/*#__PURE__*/
function () {
  function Mapper(events, history) {
    _classCallCheck(this, Mapper);

    this.events = events;
    this.history = history;
    this.maps = {};
    IEventListener.implementedBy(this);
  }

  _createClass(Mapper, [{
    key: "update",
    value: function update(e) {
      var command = new this.maps[e.eventType](e);

      if (this.history) {
        command.saveState();
        this.history.push(command);
      }

      command.execute();
    }
  }, {
    key: "undo",
    value: function undo() {
      if (!this.history) return;
      var command = this.history.pop();
      command.undo();
    }
  }, {
    key: "mapCommand",
    value: function mapCommand(command, eventType) {
      this.events.subscribe(eventType, this);
      this.maps[eventType] = command;
    }
  }, {
    key: "unmapCommand",
    value: function unmapCommand(command, eventType) {
      this.events.unsubscribe(eventType, this);
      delete this.maps[eventType];
    }
  }]);

  return Mapper;
}();

var Context =
/*#__PURE__*/
function () {
  function Context(vm, map) {
    _classCallCheck(this, Context);

    this.events = new EventManager();
    this.history = new HistoryManager();
    this.mapper = new Mapper(this.events, this.history);
    this.mapCommands(map);
    this.injectChildren(vm);
  }

  _createClass(Context, [{
    key: "mapCommands",
    value: function mapCommands(map) {
      var _this = this;

      Object.keys(map).forEach(function (key, index) {
        _this.mapper.mapCommand(map[key], key);
      });
    }
  }, {
    key: "injectChildren",
    value: function injectChildren(vm) {
      var options = vm.$options;

      if (options.context) {
        vm.$context = this;
      } else if (options.parent && options.parent.$context) {
        vm.$context = options.parent.$context;
      }
    }
  }]);

  return Context;
}();

var index = {
  Context: Context,
  IEventListener: IEventListener,
  EventManager: EventManager,
  HistoryManager: HistoryManager,
  Mapper: Mapper,
  Interface: Interface
};

export default index;
