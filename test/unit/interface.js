'use strict'

const vuec = require('../../dist/vuec.common.js');

var assert = require('assert');
describe('Interface', function() {
  describe('implemented', function() {
    var IHuman = new vuec.Interface("run");
    var human;
    function Human() {
      IHuman.implementedBy(this);
      this.name = "Jeffery"
    }

    it('Should throw an error when not implemented', function() {
      try{
        human = new Human();  
      } catch(err) {
        assert.equal(err.message, 'Class Human does not implement method "run"');
      }
    });

    it('Should not throw an error when implemented properly', function() {
      Human.prototype.run = function() {}
      human = new Human();
      assert.equal(human.name, "Jeffery");
    });
  });
});
