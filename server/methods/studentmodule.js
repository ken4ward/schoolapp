if (Meteor.isServer) {
	Meteor.methods({
		AddStudentToModule: function (IdOfModules, mySelectedStudents) {
			check(IdOfModules, String); check(mySelectedStudents, Array);
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				mySelectedStudents.forEach(function (studentId) {
					StudentModule.insert({
						moduleId: IdOfModules,
						studentId: studentId.replace(/[""{}\s]/g, ''),
						createdAt: new Date(),
						userId: Meteor.userId()
					});
				});
			}
		}
	});
}