import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {
		var myApp = new Framework7({
		  activeState: true,
		  activeStateElements: 'li.item-content'
		});
	}
});
