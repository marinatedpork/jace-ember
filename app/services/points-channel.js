import Ember from 'ember';

const { Service, inject: { service } } = Ember;

export default Service.extend({
  store: service(),
  cable: service(),
  name: 'PointsChannel',
  url: 'ws://localhost:3000/websocket',
  init() {
    let { cable, url, name } = this.getProperties('cable', 'url', 'name');
    let { subscriptions } = cable.createConsumer(url);
    let received = this.received.bind(this);
    let subscription = subscriptions.create(name, { received });
    this.set('subscription', subscription);
  },
  received({ action, point }) {
    this.in[action].bind(this)(point);
  },
  send({ action, point }) {
    this.out[action].bind(this)(point);
  },
  in: {
    delete({ id }) {
      this.get('store').peekRecord('point', id).unloadRecord();
    },
    create({ id, receiver_id, giver_id, point_type, value, reason }) {
      let store = this.get('store');
      let receiver = store.peekRecord('user', receiver_id);
      let giver = store.peekRecord('user', giver_id);
      let attrs = { id, receiver, giver, reason, type: point_type, value };
      let point = store.createRecord('point', attrs);
      giver.get('pointsGiven').pushObject(point);
      receiver.get('points').pushObject(point);
    }
  },
  out: {
    delete({ id }) {
      this.get('subscription').send({ action: 'delete', id: id });
    },
    create(data) {
      this.get('subscription').send(data);
    }
  }
});
