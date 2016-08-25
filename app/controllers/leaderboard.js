import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  cableService: Ember.inject.service('cable'),

  setupSubscription: Ember.on('init', function() {
    var consumer = this.get('cableService').createConsumer('ws://localhost:3000/websocket');

    var subscription = consumer.subscriptions.create("PointsChannel", {
      received: (data) => {
        console.log(data);
        if (data.action === 'delete') {
          return this.store.peekRecord('point', data.id).unloadRecord();
        }
        let { id, receiver_id, giver_id, point_type, value, reason } = JSON.parse(data.point);
        let user = this.store.peekRecord('user', receiver_id);
        let point = this.store.createRecord('point', {
          id: id,
          receiver: receiver_id,
          giver: giver_id,
          reason,
          type: point_type,
          value
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
      let { mobile } = this;
      let subscription = this.get('subscription');
      mobile.get('app').prompt('What\'s it for, bro?', `Giving a badge?`,
        (reason) => {
          if (reason.trim().length) {
            mobile.get('app').alert(`${reason} badge given!`, 'Sweet! Done.');
            subscription.send({
              receiver: user.get('id'),
              type: 'badge',
              value: 10,
              reason: reason
            });
          } else {
            mobile.get('app').alert(`Badge needs a title :(`, 'No good bro');
          }
        }
      );
    },
    rate(user) {
      this.get('subscription').send({
        receiver: user.get('id'),
        type: 'regular',
        value: 1,
        reason: 'hello world'
      });
    },
    deleteBadge(point) {
      let { store, mobile } = this;
      let subscription = this.get('subscription');
      let app = mobile.get('app');
      app.confirm('Are you sure?', 'Please confirm, meow.', () => {
        app.alert('Badge deleted!', 'now make another one!');
        subscription.send({
          action: 'delete',
          id: point.get('id')
        });                
      });
    }
  }
});
