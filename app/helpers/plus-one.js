import Ember from 'ember';

export function plusOne([i]) {
  return i + 1;
}

export default Ember.Helper.helper(plusOne);
