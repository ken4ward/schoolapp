Template.signin.onRendered(function () {
	$('.signin').validate({
		email: {
			email: true,
			required: true
		}, 
		password: {
			required: true,
			minlength: 6,
			maxlength: 30
		}
	});
});

var adminEmail = function (adminemail) {
	let adminDetails = Meteor.user({'emails.[0].address': adminemail });
	if (adminDetails && adminDetails.username) {
		var subscribedAdmin = Meteor.subscribe('AllSchools');
		if (subscribedAdmin) {
			var adminUsername = SchoolDb.findOne({adminUsername: adminDetails.username});
			if (adminUsername && adminUsername.slug ) {
				FlowRouter.go('/school/'+adminUsername.slug);
			} else {
				FlowRouter.go('/dashboard');
			}
		}
	} else {
		Bert.alert('No matching record found', 'danger', 'growl-top-right');
		return false;
	}
}

Template.signin.events({
	"submit .signin": function (event) {
		event.preventDefault();

		$('.fa-spinner').show();
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value.toLowerCase());

		if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && isValidPassword(password)) {
			Meteor.call('emailVerified', email, function (error, response) {
				if (response == 'verified') {
					Meteor.loginWithPassword(email, password, function (error) {
						if (error) {
							$('.fa-spinner').hide();
							Bert.alert(error.reason, "danger", "growl-top-right");
							return false;
						}else{
							$('.fa-spinner').hide();
							Modal.hide('signin');
							var user = Meteor.user();
							var emailnew= user && user.emails && user.emails[0].address;
							if (emailnew) {
								adminEmail(emailnew);
							}
							Bert.alert("You are now logged in.", "success", "growl-top-right");
						}
					});
				} else if(response == 'unverified') {
					$('.fa-spinner').hide();
					Bert.alert("Check your email for a verification link.", "success", "growl-top-right");
					return false;
				} else {
					$('.fa-spinner').hide();
					Bert.alert('Account not found', "danger", "growl-top-right");
					return false;
				}
			});
		}
			return false;
	},

	"click .signup": function (event) {
		event.preventDefault();
		Modal.allowMultiple = true;
			Meteor.setTimeout(function () {
				Modal.show('signup', null, {
			    backdrop: 'static',
			    keyboard: false
			});
		}, 100);
		Modal.hide('signin');
	},

	"click .forgotpassword": function (event) {
		event.preventDefault();
		Modal.allowMultiple = true;
			Meteor.setTimeout(function () {
				Modal.show('forgotpassword', null, {
			    backdrop: 'static',
			    keyboard: false
			});
		}, 100);
		Modal.hide('signin');
	},
});