import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['item-content'],
  classNameBindings: ['isRating'],
  tagName: 'li',
  didRender() {
    this.$().attr('data-user-id', this.get('user.id'));
  },
  click() {
    this.get('toggleIsRating')(this.get('user'));
  }
});
