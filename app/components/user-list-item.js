import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['item-content', 'user-list-item'],
  classNameBindings: ['isRating'],
  tagName: 'li',
  click() {
    let {
      user,
      toggleIsRating
    } = this.getProperties('user', 'toggleIsRating');
    toggleIsRating(user);
  }
});
