import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['coin-container'],
  coins: computed('value', function() {
    return this.get('value').toString().split('');
  })
});
