Meteor.publish('CourseModules', function () {
	if (!this.userId) {
		return false;
		throw new Meteor.Error('Not authorized');
	}else{
		return CourseModules.find();
	}
});

