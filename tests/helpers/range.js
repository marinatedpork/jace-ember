export default (start, end) => {
  return (function apply([head, ...tail]) {
    let next = head + 1;
    return next === end ? [...tail, head, next] : apply([next, ...tail, head]);
  })([start]);
};