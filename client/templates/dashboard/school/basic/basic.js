Template.basic.onRendered(function () {
	$('.addschool').validate({
		rules: {
			schoolname: {
			required: true,
			minlength: 10,
			maxlength: 50
			},
			schoolmotto: {
				required: true,
				minlength: 10,
				maxlength: 100
			},
			schoolmission: {
				required: true,
				minlength: 100,
				maxlength: 200
			},
			schoolvision: {
				required: true,
				minlength: 100,
				maxlength: 200
			},
			schooltype: {
				required: true
			},
			feerange: {
				required: true
			},
			curriculum: {
				required: true
			}
		},
		messages: {
			schooltype: {
				required: 'Please select an option to continue'
			}, 
			feerange: {
				required: 'Please select an option to continue'
			}, 
			curriculum: {
				required: 'Please select an option to continue'
			}
		}
	});
})

Template.basic.events({
	'submit .addschool': function (event, template) {
		event.preventDefault();

		var conventional = trimInput(event.target.conventional.value);
		var registered = trimInput(event.target.registered.value);
		var schoolname = trimInput(event.target.schoolname.value);
		var schoolmotto = trimInput(event.target.schoolmotto.value);
		var schoolmission = trimInput(event.target.schoolmission.value);
		var schoolvision = trimInput(event.target.schoolvision.value);

		console.log(typeof registered);

		var schooltype = trimInput($("#schooltype :selected").text());
		var feerange = trimInput($("#feerange :selected").text());
		var curriculum = trimInput($("#curriculum :selected").text());

		if (isNotEmpty(conventional) && isNotEmpty(registered) && isNotEmpty(schoolname) && isSchoolField(schoolname) && isNotEmpty(schoolmotto)
		 && isSchoolField(schoolmotto) && isNotEmpty(schoolmission) && isSchoolTextarea(schoolmission) && isNotEmpty(schoolvision) 
		 && isSchoolTextarea(schoolvision) && isNotEmpty(schooltype)  && isNotEmpty(feerange) && isNotEmpty(curriculum)) {
			Meteor.call('RegisterSchool', conventional, registered, schoolname, schoolmotto, schoolmission, schoolvision, schooltype, feerange, curriculum, 
				function (error, response) {
				if (error) {
					Bert.alert(error.reason, 'danger', 'growl-top-right');
					return false;
				}else {
					Session.setPersistent('schoolId', response);
					this.setTimeout(function () {
						Modal.show('confirm');
					}, 100);
					Bert.alert('School created successfully', 'success', 'growl-top-right');
				}
			});
		}
		return false;
	}
});