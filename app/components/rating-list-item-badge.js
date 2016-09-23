import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['badge-item-container'],
  click() {
    let {
      badge,
      deleteBadge
    } = this.getProperties('badge', 'deleteBadge');
    deleteBadge(badge);
  }
});
