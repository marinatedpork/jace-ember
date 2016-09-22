import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    authenticate() {
      let { mobile, store } = this;
      let self = this;
      let {
        email,
        password,
        session
      } = this.getProperties('email', 'password', 'session');

      session.authenticate('authenticator:devise', email, password).then(() => {
        self.transitionToRoute('leaderboard');
      }, ({ errors: [ error ] }) => {
        let [ messageOne, messageTwo ] = error.split('.');
        mobile.get('app').alert(messageOne, messageTwo);
      });
    }
  }
});