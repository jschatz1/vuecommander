import { IEventListener } from './EventManager';

export default class Mapper {
  constructor(events, history) {
    this.events = events;
    this.history = history;
    this.maps = {};
    IEventListener.implementedBy(this);
  }

  update(e) {
    const command = new this.maps[e.eventType](e);
    if(this.history) {
      command.saveState();
      this.history.push(command);
    }
    command.execute();
  }

  undo() {
    if(!this.history) return;
    const command = this.history.pop();
    command.undo();
  }

  mapCommand(command, eventType) {
    this.events.subscribe(eventType, this);
    this.maps[eventType] = command;
  }

  unmapCommand(command, eventType) {
    this.events.unsubscribe(eventType, this);
    delete this.maps[eventType];
  }
}
