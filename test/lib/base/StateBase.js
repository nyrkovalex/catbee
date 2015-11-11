var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');
var StateBase = require('../../../lib/base/StateBase');
var ServiceLocator = require('catberry-locator');
var appstate = require('appstate');

function noop () {}

lab.experiment('lib/StateBase', function() {
  var stateBase;
  var locator;

  lab.beforeEach(function(done) {
    locator = new ServiceLocator();
    stateBase = new StateBase(locator);
    done();
  });

  lab.experiment('#runSingal', function() {
    lab.test('return promise', function(done) {
      var name = 'test';
      var fn = appstate.create(name, [noop]);
      locator.registerInstance('signal', { fn, name });

      stateBase.runSignal(name)
        .then(function(result) {
          assert(result);
          assert.equal(typeof result, 'object');
          done();
        });
    });
  });

  lab.experiment('#getWatcher', function() {
    lab.test('return instance of Watcher', function(done) {
      var watcher = stateBase.getWatcher({});
      assert.equal(watcher.constructor.name, 'Watcher');
      done();
    });
  });
});
