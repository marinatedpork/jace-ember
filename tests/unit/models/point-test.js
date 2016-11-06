// giver: belongsTo('user', { inverse: 'pointsGiven' }),
// receiver: belongsTo('user', { inverse: 'points' }),
// value: attr('number'),
// type: attr('string'),
// reason: attr('string')

import { moduleForModel, test } from 'ember-qunit';

moduleForModel('point', 'Unit | Model | point', {
  needs: [
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
