import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
	model() {
		return this.store.findAll('user');
	},
  afterModel(model) {
    let { authenticated: { uid } } = this.get('session.data');
    let currentUser = model.findBy('email', uid);
    this.set('session.currentUser', currentUser);
  }
});
