import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['item-content'],
  classNameBindings: ['isRating'],
  tagName: 'li',
  click() {
    this.get('toggleIsRating')(this.get('user'));
  }
});
