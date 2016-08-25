import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
	giver: belongsTo('user', { inverse: 'pointsGiven' }),
	receiver: belongsTo('user', { inverse: 'points' }),
	value: attr('number'),
	type: attr('string'),
	reason: attr('string')
});
