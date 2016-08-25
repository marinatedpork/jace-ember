import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, hasMany } = DS;

const { computed: { filterBy, sum, mapBy, alias } } = Ember;

export default Model.extend({
	name: attr('string'),
	phone: attr('string'),
	color: attr('string'),
	points: hasMany('points', { inverse: 'receiver' }),
	pointsGiven: hasMany('points', { inverse: 'giver' }),
	regularPoints: filterBy('pointsReceived', 'type', 'regular'),
	badges: filterBy('pointsReceived', 'type', 'badge'),
	brosties: filterBy('pointsReceived', 'type', 'brosty'),
	numberOfBadges: alias('badges.length'),
	numberOfBrosties: alias('brosties.length'),
	numberOfRegularPoints: alias('regularPoints.length'),
	pointValues: mapBy('points', 'value'),
	overallScore: sum('pointValues'),
  isRating: attr('boolean', { defaultValue: false })
});
