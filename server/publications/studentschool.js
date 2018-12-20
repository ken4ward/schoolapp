Meteor.publish('StudentSchool', function () {
  if (!this.userId) {
    throw new Meteor.Error('Not authorized');
    return false;
  } else {
    return StudentSchool.find();
  }
});
