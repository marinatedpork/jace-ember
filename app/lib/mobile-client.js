import Ember from 'ember';

export default Ember.Object.extend({
  app: new Framework7({
    activeState: true,
    activeStateElements: 'li.item-content button'
  }),
  badgeInput(fn) {
    let { app } = this;
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
  },
  confirmDeletion(fn) {
    let { app } = this;
    app.confirm('Are you sure?', 'Please confirm, meow.', () => {
      app.alert('Badge deleted!', 'now make another one!');
      fn();
    });
  }
});