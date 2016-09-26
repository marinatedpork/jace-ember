import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  session: Ember.inject.service(),
  cableService: Ember.inject.service('cable'),
  socketUrl: 'ws://localhost:3000/websocket',
  setupSubscription: Ember.on('init', function() {
    let { cableService, socketUrl } = this.getProperties('cableService', 'socketUrl');
    let consumer = cableService.createConsumer(socketUrl);
    let subscription = consumer.subscriptions.create('PointsChannel', {
      received: (data) => {
        if (data.action === 'delete') {
          return this.store.peekRecord('point', data.id).unloadRecord();
        }
        let {
          id,
          receiver_id: receiver,
          giver_id: giver,
          point_type: type,
          value,
          reason
        } = JSON.parse(data.point);
        let user = this.store.peekRecord('user', receiver);
        let point = { id, receiver, giver, reason, type, value };
        user.get('points').pushObject(this.store.createRecord('point', point));
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
    badge(user) {
      let giverId = this.get('session.currentUser.id');
      let userId = user.get('id');
      if (userId !== giverId) {
        let { mobile } = this;
        let subscription = this.get('subscription');
        mobile.get('app').prompt('What\'s it for, bro?', 'Giving a badge?',
          (reason) => {
            if (reason.trim().length) {
              mobile.get('app').alert(`${reason} badge given!`, 'Sweet! Done.');
              subscription.send({
                receiver: user.get('id'),
                giver: giverId,
                type: 'badge',
                value: 10,
                reason: reason
              });
            } else {
              mobile.get('app').alert('Badge needs a title :(', 'No good bro');
            }
          }
        );
      }
    },
    rate(user) {
      let giverId = this.get('session.currentUser.id');
      let userId = user.get('id');
      if (userId !== giverId) {
        this.get('subscription').send({
          receiver: userId,
          giver: giverId,
          type: 'regular',
          value: 1
        });
      }
    },
    deleteBadge(point) {
      let giverId = point.get('giver.id');
      let currentUserId = this.get('session.currentUser.id');
      if (currentUserId === giverId) {
        let { mobile } = this;
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
  }
});
