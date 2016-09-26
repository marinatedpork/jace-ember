import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  session: service(),
  pointsChannel: service(),
  init() {
    this.get('pointsChannel');
  },
  leaders: computed('model.@each.overallScore', function() {
    return this.get('model').sortBy('overallScore').reverse();
  }),
  actions: {
    toggleIsRating(user) {
      let wasRating = user.get('isRating');
      let model = this.get('model');
      model.setEach('isViewing', false);
      model.setEach('isRating', false);
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
      let giver = this.get('session.currentUser.id');
      let receiver = user.get('id');
      let subscription = this.get('pointsChannel');
      if (receiver !== giver) {
        this.mobile.badgeInput((reason) => {
          let point = { receiver, giver, type: 'badge', value: 10, reason };
          subscription.send({ action: 'create', point });
        });
      }
    },
    rate(user) {
      let giver = this.get('session.currentUser.id');
      let receiver = user.get('id');
      let subscription = this.get('pointsChannel');
      if (receiver !== giver) {
        let point = { receiver, giver, type: 'regular', value: 1 };
        subscription.send({ action: 'create', point });
      }
    },
    deleteBadge(deletedPoint) {
      let giverId = deletedPoint.get('giver.id');
      let currentUserId = this.get('session.currentUser.id');
      let subscription = this.get('pointsChannel');
      if (currentUserId === giverId) {
        this.mobile.confirmDeletion(() => {
          let point = { id: deletedPoint.get('id') };
          subscription.send({ action: 'delete', point });
        });
      }
    }
  }
});
