if (Meteor.isServer) {
	Meteor.methods({
		StudentSignup: function (username, emailStudent, password) {
			check(username, String); check(emailStudent, String); check(password, String);
			var studentId =  Accounts.createUser({
				username: username,
				email: emailStudent,
				password: password,
				createdAt: new Date()
			});
			Meteor.users.update(studentId, {$set: {"emails.0.verified" :true}});
			Roles.addUsersToRoles( studentId, ['manage-team', 'student-page'], 'student' );
		},

		AdminSignup: function (username, email, password) {
			check(username, String); check(email, String); check(password, String);
			var adminId =  Accounts.createUser({
				username: username,
				email: email,
				password: password,
				createdAt: new Date()
			});
			Meteor.users.update(adminId, {$set: {"emails.0.verified" :true}});
			Roles.addUsersToRoles( adminId, ['super-admin', 'admin'], 'school-admin' );
		},

		SignUp: function (username, email, password) {
			check(username, String); check(email, String); check(password, String);
			var userId = Accounts.createUser({
				username: username,
				email: email,
				password: password,
				createdAt: new Date()
			});
			Roles.addUsersToRoles(userId, ['super-admin', 'admin'], 'school-admin');
			Accounts.sendVerificationEmail( userId );
		},

		UpdateUser: function (studentId) {
			check(studentId, String);
			if (!Meteor.userId()) {
				 Meteor.Error('auth-error', 'Not authorized');
                return false;
			} else {
				SchoolStudents.update(studentId, {$set: {'status.active': '1', 'status.activedate': new Date()}});
			}
		},
		UpdateAdmin: function (myAdminId) {
			check(myAdminId, String);
			if (!Meteor.userId()) {
				 Meteor.Error('auth-error', 'Not authorized');
                return false;
			} else {
				SchoolDb.update(myAdminId, {$set: {'admin.status.active': '1', 'admin.status.activedate': new Date()}});
			}
		},
		emailVerified: function (email) {
			check(email, String);
			validateUser = Meteor.users.findOne({ 'emails.address' : email });
			if (validateUser) {
				if (validateUser.emails[0].verified == true) {
					return 'verified';
				} else {
					return 'unverified';
				}
			} else {
				return 'notfound';
			}
		}
	});
}