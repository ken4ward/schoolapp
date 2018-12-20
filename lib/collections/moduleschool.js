ModuleSchool = new Mongo.Collection('moduleschool');

ModuleSchool.allow({
  insert: function () { return false; },
  update: function () { return false; },
  remove: function () { return false; }
});

ModuleSchool.deny({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});