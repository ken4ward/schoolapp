Template.studentdashboard.helpers({
	StudentDetails: function () {
		let studentEmail = Meteor.user();
		if (studentEmail) {
			let email = studentEmail && studentEmail.emails && studentEmail.emails[0].address;
			if (email) {
				var studentprofile = SchoolStudents.findOne({useremail: email});
				if(studentprofile) {
					return studentprofile;
				}
			}
		}
	},
	StudentSocial: function () {
		let studentId = UserProfile.findOne({userId: Meteor.userId()});
		if (studentId) {
			return studentId;
		}
	}
});

Template.studentdashboard.events({
	'click #updatedetails': function (event) {
		event.preventDefault();
		FlowRouter.go('/student/profile');
	},
	"click #changepassword": function (event) {
		event.preventDefault();
		Meteor.setTimeout(function () {
			Modal.show('changepassword', null, {
				backdrop: 'static',
				keyboard: false
			});
		}, 100);
	}
});

Template.studentdashboard.onRendered(function () {
	/*var instance = this;
	var moduleId = Session.get('moduleId');
	console.log('the module id:   ' +moduleId);
	var selectedCourses = Session.get('selectedCourses');
	console.log('array of selected courses   :' +selectedCourses);

	var selectedModules = Session.get('selectedModules');
	var mySelectedSchoolId = Session.get('mySelectedSchoolId');

	var mySelectedStudents = Session.get('mySelectedStudents');
	var myModuleslId = Session.get('myModuleslId');

	instance.autorun(function (stopCursor) {
		if (isNotEmpty(moduleId) && isNotEmpty(selectedCourses)) {
			Meteor.call('AddCourseToModule', moduleId, selectedCourses, function (error, response) {
				if (error) {
					Bert.alert(error.reason, 'danger', 'growl-top-right');
					return false;
				} else {
					Bert.alert('Courses added to created module successfully', 'danger', 'growl-top-right');
				}
			})
		}else {
			return false;
		}
		stopCursor.stop();
	});*/
});

