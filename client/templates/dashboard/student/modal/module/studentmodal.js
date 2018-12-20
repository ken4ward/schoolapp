Template.studentdialog.events({
	'click #addstudent': function(event, template) {
		event.preventDefault();
	    var myModuleId = template.find('input:radio[name=modulestudent]:checked');
	    var mySelectedStudents = Session.get('mySelectedStudents');

	    if (!myModuleId) {
	    	Bert.alert('Please select the module', 'danger', 'growl-top-right');
	 		return false;
	    } else if(isNotEmpty(myModuleId) && isNotEmpty(mySelectedStudents) && arrayIsEmpty(mySelectedStudents)) {
	    	var IdOfModules = $(myModuleId).val();
	    	Meteor.call('AddStudentToModule', IdOfModules, mySelectedStudents, function (error, response) {
	    		if (error) {
	    			Bert.alert(error.reason, 'danger', 'growl-top-right');
					return false;
	    		} else {
	    			Session.set('studentModuleId', response);
					Bert.alert('Details updated successfully', 'success', 'growl-top-right');
					console.log(response);
					FlowRouter.go('/userview');
	    		}
	    	})
	    } else {
	    	console.log('well done');
	    }
	 }
});

Template.studentdialog.onRendered(function () {
	var instance = this;

});

Template.studentdialog.helpers({
	'UserModules': function () {
		return Modules.find({"userId": Meteor.userId()});
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