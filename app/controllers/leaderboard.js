import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
	leaders: computed('model.@each.overallScore', function() {
		return this.get('model').sortBy('overallScore').reverse();
	}),
  actions: {
    toggleIsRating(user) {
      this.get('model').setEach('isRating', false);
      user.set('isRating', true);
    },
    rate(user) {
      console.log(user);
      let point = this.store.createRecord('point', {
        receiver: user,
        type: 'regular',
        value: 1
      });
      point.save();
    }
  }
});
