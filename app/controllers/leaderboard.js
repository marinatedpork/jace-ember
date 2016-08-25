import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
	leaders: computed('model.@each.overallScore', function() {
		return this.get('model').sortBy('overallScore').reverse();
	}),
  actions: {
    toggleIsRating(user) {
      var wasRating = user.get('isRating');
      this.get('model').setEach('isRating', false);
      if (!wasRating) {
        user.set('isRating', true);
      }
    },
    rate(user) {
      this.store.createRecord('point', {
        receiver: user,
        type: 'regular',
        value: 1
      }).save();
    }
  }
});
