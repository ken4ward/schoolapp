Template.schoolstudent.events({
	'click #addstudentschool': function(event, template) {
		event.preventDefault();
	    var mySchoolId = template.find('input:radio[name=schoolsstudent]:checked');
	    var mySelectedStudents = Session.get('mySelectedStudents');

	    if (!mySchoolId) {
	    	Bert.alert('Please select the module', 'danger', 'growl-top-right');
	 		return false;
	    } else if(isNotEmpty(mySchoolId) && isNotEmpty(mySelectedStudents) && arrayIsEmpty(mySelectedStudents)) {
	    	var IdOfSchools = $(mySchoolId).val();
	    	Meteor.call('AddStudentToSchool', IdOfSchools, mySelectedStudents, function (error, response) {
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

Template.schoolstudent.onRendered(function () {
	var instance = this;
});

Template.schoolstudent.helpers({
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