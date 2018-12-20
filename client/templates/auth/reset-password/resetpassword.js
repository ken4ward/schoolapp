Template.ResetMyPassword.onCreated(function() {
if (Accounts._resetPasswordToken) {
	Session.set('resetPassword', Accounts._resetPasswordToken);
	console.log('ResetPasswordtemplate : ' + resetPassword);
	}
});

Template.ResetMyPassword.helpers({
	resetPassword: function(){
		var resetPassword = FlowRouter.getParam('token');
		return resetPassword;
	},
});

Template.ResetMyPassword.events({
	'submit .resetPassword': function (event, template) {
		event.preventDefault();

		$('.fa-spinner').show();
		var resetPassword = FlowRouter.getParam('token');
		var password = trimInput(event.target.password.value);
		var cpassword = trimInput(event.target.cpassword.value);

		if (isNotEmpty(password) && isNotEmpty(cpassword) && isValidPassword(password) 
			&& isValidPassword(cpassword) && areValidPasswords(password, cpassword)) {
			Accounts.resetPassword(resetPassword, password, function (error) {
				if (error) {
					$('.fa-spinner').hide();
					Bert.alert(error.reason, 'danger', 'growl-top-right');
					return false;
				}else {
					$('.fa-spinner').hide();
					Bert.alert('Your password has been changed. Welcome back!', 'success', 'growl-top-right');
					Session.set('resetPassword', null);
					FlowRouter.go('/dashboard');
				}
			});
		}
		return false;
	}
});