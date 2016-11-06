export default (start, end) => {
  return Array(end - start).fill().reduce(([head, ...tail]) => {
    let next = head + 1;
    return next === end ? [...tail, head, next] : [next, ...tail, head];
  }, [start]);
}