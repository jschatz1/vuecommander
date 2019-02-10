import Interface from './Interface';

export class HistoryManager {
  constructor() {
    this.history = [];
  }

  get length() {
    return this.history.length;
  }

  clear() {
    this.history = [];
  }

  push(command) {
    return this.history.push(command);
  }

  pop() {
    return this.history.pop();
  }
}

export class EventManager {

  constructor() {
    this.listeners = {};
  }

  subscribe(eventType, listener) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(listener);
  }

  unsubscribe(eventType, listener) {
    const listeners = this.listeners[eventType];
    if (!listeners) return -1;
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
    this.listeners[eventType] = listeners;
    return index;
  }

  notify(eventType, data) {
    const listeners = this.listeners[eventType];
    if (!listeners) return -1;
    const notified = [];
    listeners.forEach((listener) => {
      const payload = {
        eventType,
        data,
      };
      listener.update(payload);
      notified.push({
        listener,
        eventType,
        data,
      });
    });
    return notified;
  }
}

export const IEventListener = new Interface('update');
