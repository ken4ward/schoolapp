Template.moduledialog.events({
	'click #addmodule': function (event, template) {
		event.preventDefault();
		var selectedSchoolId = template.find('input:radio[name=schools]:checked');
		var selectedModules = Session.get('selectedModules');
		
		if (!selectedSchoolId) {
			Bert.alert('Please select the school', 'danger', 'growl-top-right');
	 		return false;
		} else if(isNotEmpty($(selectedSchoolId).val()) && isNotEmpty(selectedModules) && arrayIsEmpty(selectedModules)) {
			var selectedSchoolIds = $(selectedSchoolId).val();
			Meteor.call('AddModuleToSchool', selectedSchoolIds, selectedModules, function (error, response) {
				if (error) {
					Bert.alert(error.reason, 'danger', 'growl-top-right');
					return false;
				} else {
					Session.set('moduleSchoolId', response);
					Bert.alert('Details updated successfully', 'success', 'growl-top-right');
					console.log(response);
					FlowRouter.go('/userview');
				}
			});
		} else {
			console.log('good night');
		}
		return false;
	},

	'click #deletemodule': function (event, template) {
		event.preventDefault();

	 	var removeModuleId = template.find('input:radio[name=modules]:checked');
	 	console.log($(removeModuleId).val());
	 	if (!removeModuleId ) {
	 		Bert.alert('Please select the item to remove', 'danger', 'growl-top-right');
	 		return false;
	 	} else {
	 		var moduleId = $(removeModuleId).val();
	 		console.log(moduleId);
	 			Meteor.call('DeleteModule', moduleId, function (error, response) {
	 			if (error) {
	 				Bert.alert(error.reason, 'danger', 'growl-top-right');
	 				return false;
	 			}else {
	 				Bert.alert('Module has been removed successfully', 'success', 'growl-top-right');
	 				Router.go('/profile');
	 				//Modal.hide('moduledialog');
	 			}
	 		});
	 	}
		
	}
});

Template.moduledialog.onRendered(function () {
	var instance = this;

});

Template.moduledialog.helpers({
	OnlyUsersSchool: function () {
		var subValues = Meteor.subscribe('allUserSchools');
		if (Meteor.userId()) {
			if (Meteor.user().emails[0].verified) {
				console.log(Meteor.user().username);
				let usernames = SchoolDb.find({adminUsername: Meteor.user().username});
				if (usernames) {
					return usernames;
				} else {
					return SchoolDb.find({userId: Meteor.userId()}).fetch().reverse();
				}
			} else {
				Bert.alert('Please verify your account to proceed', 'success', 'growl-top-right');
			}
		}
	},
	'CourseCountPerModule': function () {
		var moduleId = Modules.find({"userId": Meteor.userId()});
		var courseModuleIds = CourseModules.find({"userId": Meteor.userId()});
		moduleId.forEach(function (argument) {
			courseModuleIds.forEach(function (coursesId) {
				if (argument._id) {
					if (argument._id === coursesId._id) {
						return CourseModules.find({"userId": Meteor.userId()}).count();
					}
				}
			})
		})
	}
});