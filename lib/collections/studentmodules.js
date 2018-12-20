StudentModule = new Mongo.Collection('studentmodule');

StudentModule.allow({
  insert: function () { return false; },
  update: function () { return false; },
  remove: function () { return false; }
});

StudentModule.deny({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
