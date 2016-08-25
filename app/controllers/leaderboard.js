import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  cableService: Ember.inject.service('cable'),

  setupSubscription: Ember.on('init', function() {
    var consumer = this.get('cableService').createConsumer('ws://localhost:3000/websocket');

    var subscription = consumer.subscriptions.create("PointsChannel", {
      received: (data) => {
        let { id, receiver_id, giver_id, point_type, value } = JSON.parse(data.point);
        let user = this.store.peekRecord('user', receiver_id);
        let point = this.store.createRecord('point', {
          id: id,
          receiver: receiver_id,
          giver: giver_id,
          type: point_type,
          value: value
        });
        user.get('points').pushObject(point);
      }
    });

    this.set('subscription', subscription);

  }),

	leaders: computed('model.@each.overallScore', function() {
		return this.get('model').sortBy('overallScore').reverse();
	}),
  actions: {
    toggleIsRating(user) {
      var wasRating = user.get('isRating');
      this.get('model').setEach('isViewing', false);
      this.get('model').setEach('isRating', false);
      if (!wasRating) {
        user.set('isRating', true);
      }
    },
    view(user) {
      var wasViewing = user.get('isViewing');
      this.get('model').setEach('isViewing', false);
      if (!wasViewing) {
        user.set('isViewing', true);
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
      this.get('subscription').send({ receiver: user.get('id'), type: 'regular', value: 1, reason: 'hello world' });
    }
  }
});
