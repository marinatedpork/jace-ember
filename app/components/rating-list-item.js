import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['item-content'],
  isViewing: false,
  actions: {
    view() {
      this.toggleProperty('isViewing');
    }
  }
});
