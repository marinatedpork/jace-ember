import Ember from 'ember';

export function initialize(application) {
  let app = new Framework7({
    activeState: true,
    activeStateElements: 'li.item-content button'
  });
  let mobile = Ember.Object.extend({ app });
  application.register('mobile:main', mobile);
  ['controller', 'route', 'component'].forEach( (s) => {
    application.inject(s, 'mobile', 'mobile:main');
  });
}

export default {
  name: 'mobile',
  initialize
};
