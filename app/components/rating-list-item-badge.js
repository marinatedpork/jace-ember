import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    let {
      badge,
      deleteBadge
    } = this.getProperties('badge', 'deleteBadge');
    deleteBadge(badge);
  }
});
