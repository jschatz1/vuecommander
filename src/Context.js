import { EventManager, HistoryManager } from './EventManager';
import Mapper from './Mapper'; 

export default class Context {
  constructor(map) {
    this.events = new EventManager();
    this.history = new HistoryManager();
    this.mapper = new Mapper(this.events, this.history);
    this.mapCommands(map);
  }

  mapCommands(map) {
    Object.keys(map).forEach((key,index) => {
      this.mapper.mapCommand(map[key], key);
    });
  }
}