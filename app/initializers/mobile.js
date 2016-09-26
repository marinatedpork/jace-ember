import Ember from 'ember';

export function initialize(application) {
  let app = new Framework7({
    activeState: true,
    activeStateElements: 'li.item-content button'
  });

  let badgeInput = (fn) => {
    app.prompt('What is the title of the badge?', 'Giving a badge?',
      (reason) => {
        if (reason.trim().length) {
          app.alert(`${reason} badge given!`, 'Sweet! Done.');
          fn(reason);
        } else {
          app.alert('Invalid badge name', 'Enter a valid name');
        }
      }
    );
  };

  let confirmDeletion = (fn) => {
    app.confirm('Are you sure?', 'Please confirm, meow.', () => {
      app.alert('Badge deleted!', 'now make another one!');
      fn();
    });
  };

  let mobile = Ember.Object.extend({ app, badgeInput, confirmDeletion });

  application.register('mobile:main', mobile);
  ['controller', 'route', 'component'].forEach( (container) => {
    application.inject(container, 'mobile', 'mobile:main');
  });
}

export default {
  name: 'mobile',
  initialize
};
