if (Meteor.isServer) {
	Meteor.methods({
		CheckPassword: function (oldpassowrd) {
			check(oldpassowrd, String);

			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				var user = Meteor.user();
			    var password = {digest: oldpassword, algorithm: 'sha-256'};
			    var result = Accounts._checkPassword(user, password);
			    return result.error == null;
			}
		},
		ChangePassword: function (userId, newpassword) {
			check(userId, String); check(newpassword, String);
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				Accounts.setPassword(userId, newpassword);
			}
		}
	})
}