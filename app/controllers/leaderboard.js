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
    brost(user) {
      
    },
    badge(user) {
      let { store, mobile } = this;
      let app = mobile.get('app');
      app.prompt('this outta be good...', `Giving a badge?`,
        (reason) => {
          store.createRecord('point', {
            receiver: user,
            type: 'badge',
            value: 10,
            reason: reason
          }).save().then(() => {
            app.alert(`${reason} badge given!`, 'Sweet! Done.');
          });
        }
      );
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
