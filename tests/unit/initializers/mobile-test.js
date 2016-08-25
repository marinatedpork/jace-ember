import Ember from 'ember';
import MobileInitializer from 'bachelor-party/initializers/mobile';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | mobile', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  MobileInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
