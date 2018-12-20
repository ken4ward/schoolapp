if (Meteor.isServer) {
	Meteor.publish('Courses', function () {
		if (!this.userId) {
			throw new Meteor.Error('Not authorized');
			return false;
		}else{
			return Courses.find();
		}
	});

	Meteor.publish('SchoolCourses', function (skipCount) {
		check(skipCount, Number);
	  if (!this.userId) {
	    throw new Meteor.Error('Not authorized');
	    return false;
	  } else {
	    return Courses.find({userId: this.userId}, {limit: 5, skip: skipCount});
	  }
	});
}

