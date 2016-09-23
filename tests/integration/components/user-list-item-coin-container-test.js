import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-list-item-coin-container', 'Integration | Component | user list item coin container', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user-list-item-coin-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#user-list-item-coin-container}}
      template block text
    {{/user-list-item-coin-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
