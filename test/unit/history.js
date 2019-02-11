'use strict'

const vuecommander = require('../../dist/vuecommander.common.js');

var assert = require('assert');
describe('History', function() {
  describe('mapCommand', function() {
    var result = 0;
    var resultFromEvent = 0;
    var eventManager = new vuecommander.EventManager();
    var historyManager = new vuecommander.HistoryManager();
    var mapper = new vuecommander.Mapper(eventManager, historyManager);
    function Command(e) {
      this.event = e;
      this.backup;
    }

    Command.prototype.saveState = function(state) {
      this.backup = 0;
    }

    Command.prototype.undo = function() {

    }

    Command.prototype.execute = function() {
      result += 1;
      if(!this.event.data) return
      resultFromEvent += this.event.data.num;
    }

    it('History should contain a history item on command', function() {
      mapper.mapCommand(Command, 'command.notify');
      eventManager.notify('command.notify', 1);
      assert.equal(historyManager.history.length, 1)
      assert.equal(historyManager.history[0].constructor.name, 'Command')
      mapper.unmapCommand(Command, 'command.notify');
      historyManager.clear()
    });

    it('History should pop off a command', function() {
      mapper.mapCommand(Command, 'command.notify');
      eventManager.notify('command.notify', 1);
      assert.equal(historyManager.history.length, 1)
      historyManager.pop();
      assert.equal(historyManager.history.length, 0)
      mapper.unmapCommand(Command, 'command.notify');
    });
  });
});
