Template.signup.onRendered(function () {
	$('.signup').validate({
		rules: {
			username: {
				required: true,
				minlength: 5,
				maxlength: 16
			}, 
			email: {
				email: true,
				required: true
			}, 
			password: {
				required: true,
				minlength: 6,
				maxlength: 30
			},
			cpassword: {
				required: true,
				minlength: 6,
				maxlength: 30,
				equalTo: '#password'
			},
			agree: "required"
		},
		messages: {
			agree: "Please accept our policy",
			username: {
			
			},
			email: {

			}
		}
	});
})

Template.signup.onCreated(function () {
	let instance = this;
	instance.autorun(function () {
		let testall = Meteor.subscribe('AllStudents');
		if (testall) {
			return testall;
		} else {
			console.log('no subscription');
		}

		let allSchools = Meteor.subscribe('AllSchools');
		if (allSchools) {
			return allSchools;
		} else {
			console.log('no subscription');
		}
	});
});
	
var studentEmail = function (usersemail) {
	let testing = SchoolStudents.findOne({useremail: usersemail});
	if (testing && testing.useremail) {
		return testing.useremail;
	} else {
		Bert.alert('No matching record found', 'danger', 'growl-top-right');
		return false;
	}
}

var adminUsername = function (adminusername) {
	var returnedSchool = SchoolDb.findOne({adminUsername: adminusername});
	if (returnedSchool && returnedSchool.adminUsername) {
		console.log(returnedSchool.adminUsername);
		return returnedSchool.adminUsername;
	} else {
		Bert.alert('No matching record for school', 'danger', 'growl-top-right');
		return false;
	}
}

Template.signup.events({
	"submit .signup": function (event) {
		event.preventDefault();
		
		$('.fa-spinner').show();
		var username = trimInput(event.target.username.value);
		var email = trimInput(event.target.email.value.toLowerCase());
		var password = trimInput(event.target.password.value);
		var cpassword = trimInput(event.target.cpassword.value);
		var emailStudent = studentEmail(email);
		var schoolAdmin = adminUsername(username);

		if (isNotEmpty(username) && isUsername(username) && usernameLength(username) && isNotEmpty(email) && isEmail(email)
			&& isNotEmpty(password) && isNotEmpty(cpassword) && areValidPasswords(password, cpassword)) {
			if (emailStudent) {
				Meteor.call('StudentSignup', username, email, password, function (error, response) {
					if (error) {
						$('.fa-spinner').hide();
						Bert.alert(error.reason, 'danger', 'growl-top-right');
						return false;
					} else {
						Modal.hide('signup');
						Meteor.loginWithPassword(emailStudent, password, function (error) {
							if (error) {
								$('.fa-spinner').hide();
								Bert.alert(error.reason, 'danger', 'growl-top-right');
							} else {
								var user = Meteor.user();
								var emailnew= user && user.emails && user.emails[0].address;
								if (emailnew) {
									var subscribeWork = Meteor.subscribe('AllStudents');
									if (subscribeWork) {
										var studentId = SchoolStudents.findOne({useremail: emailnew});
										if (studentId) {
											var relaId = studentId._id;
											Meteor.call('UpdateUser', relaId, function (error, response) {
												if (error) {
													$('.fa-spinner').hide();
													Bert.alert(error.reason, 'danger', 'growl-top-right');
													return false;
												} else {
													$('.fa-spinner').hide();
													Bert.alert('Record updated successfully', 'success', 'growl-top-right');
												}
											});
										}
									}
								}
							}
						});
						$('.fa-spinner').hide();
						FlowRouter.go('/student/dashboard');
						Bert.alert('You have successfully registered', 'success', 'growl-top-right');
					}
				});
			} else if (schoolAdmin ) {
					Meteor.call('AdminSignup', username, email, password, function (error, response) {
						if (error) {
							Bert.alert(error.reason, 'danger', 'growl-top-right');
							return false;
						} else {
							Modal.hide('signup');
							Meteor.loginWithPassword(email, password, function (error) {
								if (error) {
									Bert.alert(error.reason, 'danger', 'growl-top-right');
									return false;
								} else {
									var user = Meteor.user();
									var emailnew= user && user.username;
									if (emailnew) {
										var adminIdSubscription = Meteor.subscribe('AllSchools');
										if (adminIdSubscription) {
											var adminId = SchoolDb.findOne({adminUsername: emailnew});
											if (adminId && adminId._id) {
												var myAdminId = adminId._id;
												Meteor.call('UpdateAdmin', myAdminId, function (error) {
													if (error) {
														Bert.alert(error.reason, 'danger', 'growl-top-right');
														return false;
													} else {
														$('.fa-spinner').hide();
														FlowRouter.go('/school/'+adminId.slug);
														Bert.alert('Registration was successful', 'success', 'growl-top-right');
													}
												});
											}
										}
									}
								}
							});
						}
					});
				} else {
					Meteor.call('SignUp', username, email, password, function (error, response) {
						if (error) {
							Bert.alert(error.reason, 'danger', 'growl-top-right');
							return false;
						} else {
							Modal.hide('signup');
							FlowRouter.go('/sent-verify-email');
							Bert.alert('Registration was successful', 'success', 'growl-top-right');
						}
					});
				}
		}
		return false;
	},

	"click .signins": function (event) {
		event.preventDefault();
		Modal.allowMultiple = true;
		$("#signupModal .close").click();
			Meteor.setTimeout(function () {
				Modal.show('signin', null, {
			    backdrop: 'static',
			    keyboard: false
			});
		}, 100);
			Modal.hide('signup');
	},
});