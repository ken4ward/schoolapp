Template.schoolmodal.helpers({
	'UserSchools': function () {
		return NewSchoolDB.find({"authorId": Meteor.userId()});
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

Template.schoolmodal.events({
	'click #addmodule': function(event, template) {
		event.preventDefault();
	    var element = template.find('input:radio[name=school]:checked');
	    var selectedModules = Session.get('selectedModules');
	    
	    if (isNotEmpty(element) && isNotEmpty(selectedModules) && arrayIsEmpty(selectedModules)) {
	    	var newElement = $(element).val();
	    	Session.set('mySelectedSchoolId', newElement);
	    	console.log(Session.get('mySelectedSchoolId'));
	    	Router.go('/profile');
	    	Modal.hide('schoolmodal');
	    }
	 },

	 'click #deleteschool': function (event, template) {
	 	event.preventDefault();

	 	var removeSchoolId = template.find('input:radio[name=school]:checked');
	 	console.log($(removeSchoolId).val());
	 	if (!removeSchoolId ) {
	 		Bert.alert('Please select the item to remove', 'danger', 'growl-top-right');
	 		return false;
	 	} else {
	 		var schoolId = $(removeSchoolId).val();
	 		console.log(schoolId);
	 			Meteor.call('DeleteSchool', schoolId, function (error, response) {
	 			if (error) {
	 				Bert.alert(error.reason, 'danger', 'growl-top-right');
	 				return false;
	 			}else {
	 				Bert.alert('module has been removed successfully', 'success', 'growl-top-right');
	 				Router.go('/profile');
	 				Modal.hide('schoolmodal');
	 			}
	 		});
	 	}
	 }
});