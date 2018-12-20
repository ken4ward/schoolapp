if (Meteor.isServer) {
	Meteor.methods({
		AddCourseToModule: function (moduleId, selectedCourses) {
			check(moduleId, String); check(selectedCourses, Array);
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				selectedCourses.forEach(function (coursesId) {
					CourseModules.insert({
						moduleId: moduleId,
						coursesId: coursesId.replace(/[""{}\s]/g, ''),
						createdAt: new Date(),
						userId: Meteor.userId()
					});
				});
			}
		}
	});
}