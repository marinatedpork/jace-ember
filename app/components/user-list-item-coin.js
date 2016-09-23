import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['coin'],
  classNameBindings: ['colorType', 'backing'],
  colorType: computed('type', function() {
    return {
      'brosty': 'gold',
      'a-badge': 'silver',
      'regular': 'bronze'
    }[this.get('type')];
  }),
  backing: computed('index', function() {
    return ['','backing-one','backing-two'][this.get('index')];
  })
});
