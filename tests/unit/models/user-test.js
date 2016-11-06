import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import setupPoints from '../../helpers/create-points';

moduleForModel('user', 'Unit | Model | user', {
  needs: ['model:point'],
  beforeEach() {
    const self = this;
    const store = self.store();
    self.User = store.modelFor('user');
    Ember.run(() => {
      self.giver = store.createRecord('user', { id: 1 });
      self.receiver = store.createRecord('user', { id: 2 });
      self.points = [
        ...setupPoints(1, 3, 'regular', self.subject, self.fakeReceiver, store),
        ...setupPoints(4, 9, 'brosty', self.subject, self.fakeReceiver, store),
        ...setupPoints(10, 11, 'badge', self.subject, self.fakeReceiver, store)
      ];
      self.receiver.get('points').pushObjects(self.points);
      self.giver.get('pointsGiven').pushObjects(self.points);
    });
  }
});

test('it has a name', function(assert) {
  const name = Ember.get(this.User, 'attributes').get('name');
  assert.ok(name, 'it exists');
  assert.equal(name.type, 'string', 'type that row is');
});

test('it has a phone', function(assert) {
  const phone = Ember.get(this.User, 'attributes').get('phone');
  assert.ok(phone, 'it exists');
  assert.equal(phone.type, 'string', 'type that row is');
});

test('it has a color', function(assert) {
  const color = Ember.get(this.User, 'attributes').get('color');
  assert.ok(color, 'it exists');
  assert.equal(color.type, 'string', 'type that row is');
});

test('has many points', function(assert) {
  const relationship = Ember.get(this.User, 'relationshipsByName').get('points');
  const { options: { inverse } } = relationship;
  assert.equal(relationship.key, 'points', 'has relationship with point');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
  assert.equal(inverse, 'receiver', 'inverse is receiver');
});

test('has many pointsGiven', function(assert) {
  const relationship = Ember.get(this.User, 'relationshipsByName').get('pointsGiven');
  const { options: { inverse } } = relationship;
  assert.equal(relationship.key, 'pointsGiven', 'has relationship with point');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
  assert.equal(inverse, 'giver', 'inverse is giver');
  assert.equal(this.giver.get('pointsGiven.length'), 11);
});

test('has a collection of regular points', function(assert) {
  assert.equal(this.receiver.get('regularPoints.length'), 3);
  assert.equal(this.receiver.get('numberOfRegularPoints'), 3, 'has alias for length');
});

test('has a collection of brosty points', function(assert) {
  assert.equal(this.receiver.get('brosties.length'), 6);
  assert.equal(this.receiver.get('numberOfBrosties'), 6, 'has alias for length');
});

test('has a collection of badge points', function(assert) {
  assert.equal(this.receiver.get('badges.length'), 2);
  assert.equal(this.receiver.get('numberOfBadges'), 2, 'has alias for length');
});