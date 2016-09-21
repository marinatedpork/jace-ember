import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['item-content'],
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
