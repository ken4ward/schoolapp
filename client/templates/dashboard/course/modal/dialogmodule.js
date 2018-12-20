Template.dialogmodule.onRendered(function () {
	$('.moduleaddselect').validate({
		rules: {
			modulename: {
				required: true,
				minlength: 10,
				maxlength: 100
			},
			moduledescription: {
				required: true,
				minlength: 10,
				maxlength: 200
			}
		}
	});
});

Template.dialogmodule.events({
	'submit .moduleaddselect': function (event) {
		event.preventDefault();

		var modulename 		  = trimInput(event.target.modulename.value);
		var moduledescription = trimInput(event.target.moduledescription.value);
		var selectedCourses = Session.get('selectedCourses');

		if (isNotEmpty(modulename) && isNotEmpty(moduledescription) && isNotEmpty(selectedCourses) && arrayIsEmpty(selectedCourses)) {
			Meteor.call('AddModule', modulename, moduledescription, function (error, response) {
				if (error) {
					Bert.alert(error.reason, 'danger', 'growl-top-right');
					return false;
				}else {
					Session.set('moduleId', response);
					Bert.alert('Details updated successfully', 'success', 'growl-top-right');
					console.log(response);
					FlowRouter.redirect('/userview');
					//Modal.hide('moduledialog');
				}
			});
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
	 				Bert.alert('module has been removed successfully', 'success', 'growl-top-right');
	 				Router.go('/userview');
	 				//Modal.hide('moduledialog');
	 			}
	 		});
	 	}
		
	}
});

Template.dialogmodule.onRendered(function () {
	var instance = this;

});

Template.dialogmodule.helpers({
	'UserModules': function () {
		return Modules.find({userId: Meteor.userId()});
	},
	'CourseCountPerModule': function () {
		var moduleId = Modules.find({userId: Meteor.userId()});
		var courseModuleIds = CourseModules.find({userId: Meteor.userId()});
		moduleId.forEach(function (argument) {
			courseModuleIds.forEach(function (coursesId) {
				if (argument._id) {
					if (argument._id === coursesId._id) {
						return CourseModules.find({userId: Meteor.userId()}).count();
					}
				}
			})
		})
	}
});