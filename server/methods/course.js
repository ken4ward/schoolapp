if (Meteor.isServer) {
	Meteor.methods({
		DeleteSingleCourse: function (courseId) {
		  	check(courseId, String);
		  	var deleteCourse = Courses.findOne({_id: courseId});
		  	if (deleteCourse && deleteCourse.createdById) {
		  		if (deleteCourse.createdById === Meteor.userId()) {
		  			Courses.remove(deleteCourse._id);
		  			let courseModules = CourseModules.find({coursesId: courseId});
		  			if ( courseModules) {
		  				CourseModules.remove(courseId);
		  			}

		  		} else {
		  			throw new Meteor.Error('You are not allowed to delete this');
		  		}
		  	}
		  },

		  CoursesBatchDelete: function (mySelectedCourses) {
		  	check(mySelectedCourses, Array);
		  	if (Meteor.userId()) {
		  		mySelectedCourses.forEach(function (courseIds) {
		  			Courses.remove(courseIds.replace(/[""{}\s]/g, ''));
		  			CourseModules.remove(courseIds.replace(/[""{}\s]/g, ''));
		  		});
		  	}
		  }
	});
}