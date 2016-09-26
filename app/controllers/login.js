import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  session: service(),
  authenticator: 'authenticator:devise',
  actions: {
    authenticate() {
      let self = this;
      let {
        email,
        password,
        session,
        authenticator
      } = this.getProperties('email', 'password', 'session', 'authenticator');
      session.authenticate(authenticator, email, password).then(() => {
        self.transitionToRoute('leaderboard');
      }, ({ errors: [ error ] }) => {
        let [ messageOne, messageTwo ] = error.split('.');
        self.mobile.get('app').alert(messageOne, messageTwo);
      });
    }
  }
});