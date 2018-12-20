CourseModules = new Mongo.Collection('coursemodules');

CourseModules.allow({
  insert: function () { return false; },
  update: function () { return false; },
  remove: function () { return false; }
});

CourseModules.deny({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

