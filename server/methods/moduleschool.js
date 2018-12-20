if (Meteor.isServer) {
	Meteor.methods({
		AddModuleToSchool: function (selectedSchoolIds, selectedModules) {
			check(selectedSchoolIds, String); check(selectedModules, Array);
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				selectedModules.forEach(function (moduleId) {
					ModuleSchool.insert({
						schoolId: selectedSchoolIds,
						moduleId: moduleId.replace(/[""{}\s]/g, ''),
						createdAt: new Date(),
						userId: Meteor.userId()
					});
				});
			}
		}
	});
}