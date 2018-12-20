Template.changepassword.events({
	'click .changepass': function (event, template) {
		event.preventDefault();

		var oldpassowrd = Package.sha.SHA256($('#oldpassword').val());
		var newpassword = ($('#newpassword').val());
		var cpassword = $('#cpassword').val();
		
		var userId = Meteor.userId();

		if (isNotEmpty(oldpassowrd) && isNotEmpty(newpassword) && isNotEmpty(cpassword) 
		 	&& isValidPassword(oldpassowrd) && isValidPassword(newpassword) && isValidPassword(cpassword) 
		 	&& areValidPasswords(newpassword, cpassword)) {

			Meteor.call('CheckPassword', oldpassowrd, function (error, response) {
				if (error) {
					Bert.alert(error.reason, "danger", "growl-top-right");
					return false;
				} else {
					Bert.alert('Password confirmed', 'success', 'growl-top-right');
					Meteor.call('ChangePassword', userId, newpassword, function (error, response) {
						if (error) {
							Bert.alert(error.reason, 'danger', 'growl-top-right');
							return false;
						} else {
							Bert.alert('Password changed successfully', 'success', 'growl-top-right');
						}
					});
				}
			});
		}
	}
});