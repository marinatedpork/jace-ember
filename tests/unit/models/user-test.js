import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user', {
  needs: ['model:point'],
  beforeEach() {
    this.User = this.store().modelFor('user');
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
});

test('has a collection of regular points', function(assert) {
  const store = this.store();
  Ember.run(() => {
    let user = store.createRecord('user', { id: 1 });
    user.get('points').pushObjects([
      store.createRecord('point', { id: 1, type: 'regular' }),
      store.createRecord('point', { id: 2, type: 'regular' }),
      store.createRecord('point', { id: 3, type: 'brosty' })
    ]);
    assert.equal(user.get('regularPoints.length'), 2);
    assert.equal(user.get('numberOfRegularPoints'), 2, 'has alias for length');
  });
});

test('has a collection of brosty points', function(assert) {
  const store = this.store();
  Ember.run(() => {
    let user = store.createRecord('user', { id: 1 });
    user.get('points').pushObjects([
      store.createRecord('point', { id: 1, type: 'regular' }),
      store.createRecord('point', { id: 2, type: 'brosty' }),
      store.createRecord('point', { id: 3, type: 'brosty' })
    ]);
    assert.equal(user.get('brosties.length'), 2);
    assert.equal(user.get('numberOfBrosties'), 2, 'has alias for length');
  });
});

test('has a collection of badge points', function(assert) {
  const store = this.store();
  Ember.run(() => {
    let user = store.createRecord('user', { id: 1 });
    user.get('points').pushObjects([
      store.createRecord('point', { id: 1, type: 'regular' }),
      store.createRecord('point', { id: 2, type: 'badge' }),
      store.createRecord('point', { id: 3, type: 'badge' })
    ]);
    assert.equal(user.get('badges.length'), 2);
    assert.equal(user.get('numberOfBadges'), 2, 'has alias for length');
  });
});