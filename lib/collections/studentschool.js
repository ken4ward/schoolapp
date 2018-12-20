StudentSchool = new Mongo.Collection('studentschool');

StudentSchool.allow({
  insert: function () { return false; },
  update: function () { return false; },
  remove: function () { return false; }
});

StudentSchool.deny({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
