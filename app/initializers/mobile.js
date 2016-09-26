import Ember from 'ember';
import MobileClient from '../lib/mobile-client';

export function initialize(application) {
  application.register('mobile:main', MobileClient);
  ['controller', 'route', 'component'].forEach( (container) => {
    application.inject(container, 'mobile', 'mobile:main');
  });
}

export default {
  name: 'mobile',
  initialize
};
