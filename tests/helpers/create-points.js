import Range from './range';

export default (startId, stopId, type, giver, receiver, store) => {
  return Range(startId, stopId).map(id => {
    return store.createRecord('point', { id, type, giver, receiver });
  });
};