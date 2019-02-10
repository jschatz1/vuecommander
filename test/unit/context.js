'use strict'

const vuec = require('../../dist/vuec.common.js');

var assert = require('assert');
describe('Context', function() {
  describe('New Context', function() {
  
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

    var context = new vuec.Context({
      'context.works': Command,
    });

    it('Context should map event', function() {
      assert.strictEqual(context.mapper.maps['context.works'], Command);
    });
  });
});
