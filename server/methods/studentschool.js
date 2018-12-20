if (Meteor.isServer) {
	Meteor.methods({
		AddStudentToSchool: function (IdOfSchools, mySelectedStudents) {
			check(IdOfSchools, String); check(mySelectedStudents, Array);
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				mySelectedStudents.forEach(function (studentId) {
					StudentSchool.insert({
						schoolId: IdOfSchools,
						studentId: studentId.replace(/[""{}\s]/g, ''),
						createdAt: new Date(),
						userId: Meteor.userId()
					});
				});
			}
		}
	});
}