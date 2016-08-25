import DS from 'ember-data';

const { EmbeddedRecordsMixin, RESTSerializer } = DS;

export default RESTSerializer.extend(EmbeddedRecordsMixin, {
	attrs: {
		points: { embedded: 'always' }
	}
});
