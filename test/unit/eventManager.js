'use strict'

const vuecommander = require('../../dist/vuecommander.common.js');

var assert = require('assert');
describe('EventManager', function() {
  describe('implemented', function() {
    var eventManager = new vuecommander.EventManager();
    var listener;
    var result = 0;
    function Listener() {
      vuecommander.IEventListener.implementedBy(this)
    }
    Listener.prototype.update = function(e){
      result += e.data;
    }

    it('Should not throw an error when IEventListener implemented properly', function() {
      listener = new Listener();
      assert.equal("Listener", listener.constructor.name);
    });

    it('Should update when subscribed event is notified', function() {
      assert.equal(result, 0);
      listener = new Listener();
      eventManager.subscribe('eventmanager.works', listener);
      eventManager.notify('eventmanager.works', 1);
      assert.equal(result, 1);
      result = 0;
    });

    it('Should not update when unsubscribed event is notified', function() {
      assert.equal(result, 0);
      listener = new Listener();
      eventManager.subscribe('eventmanager.works', listener);
      eventManager.unsubscribe('eventmanager.works', listener);
      eventManager.notify('eventmanager.works', 7);
      assert.equal(result, 7);
    });
  });
});
