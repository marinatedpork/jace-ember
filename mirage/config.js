function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

export default function() {
  this.get('/users', function(db) {
    return {
      users: db.db.users
    };
  });
  this.post('points', function(db, request) {
    console.log(db, request);
    let id = uuid();
    let point = JSON.parse(request.requestBody);
    point.id = id;
    return { point };
  });
}
