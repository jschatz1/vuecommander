'use strict'

const vueglue = require('../../dist/vueglue.common.js');

var assert = require('assert');
describe('Mapper', function() {
  describe('mapCommand', function() {
    var result = 0;
    var resultFromEvent = 0;
    var eventManager = new vueglue.EventManager();
    var mapper = new vueglue.Mapper(eventManager, null);
    function Command(e) {
      this.event = e;
    }

    Command.prototype.execute = function() {
      result += 1;
      if(!this.event.data) return
      resultFromEvent += this.event.data.num;
    }

    it('Mapper should map command', function() {
      mapper.mapCommand(Command, 'command.events');
      assert.strictEqual(mapper.maps['command.events'], Command);
      mapper.unmapCommand(Command, 'command.events');
    });

    it('Mapper should execute command on event notify', function() {
      mapper.mapCommand(Command, 'command.notify');
      eventManager.notify('command.notify');
      assert.equal(result, 1);
      mapper.unmapCommand(Command, 'command.notify');
    });

    it('Mapper should receive event from command', function() {
      mapper.mapCommand(Command, 'command.events');
      eventManager.notify('command.events', { num: 5 });
      assert.equal(resultFromEvent, 5);
    });
  });
});
