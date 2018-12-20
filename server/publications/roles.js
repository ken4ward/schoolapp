Meteor.publish(null, function (){
  if (!this.userId) {
  	this.stop(); return false;
  } else {
  	return Meteor.roles.find({});
  }
});

/*Accounts.validateNewUser(function (user) {
	var loggedInUser = Meteor.user();
	if (Roles.userIsInRole(this.userId, ['admin', 'super-admin'])) {
		return true;
	}
	throw new Meteor.Error(403, 'Not authorized to create new users');
});*/