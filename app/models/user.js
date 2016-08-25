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
	regularPoints: filterBy('points', 'type', 'regular'),
	badges: filterBy('points', 'type', 'badge'),
	brosties: filterBy('points', 'type', 'brosty'),
	numberOfBadges: alias('badges.length'),
	numberOfBrosties: alias('brosty.length'),
	numberOfRegularPoints: alias('points.length'),
	pointValues: mapBy('points', 'value'),
	overallScore: sum('pointValues'),
  isRating: attr('boolean', { defaultValue: false })
});
