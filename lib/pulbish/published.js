if (Meteor.isServer) {
	Meteor.publish('NewSchoolDB', function () {
		if (!this.userId) {
			return false;
			throw new Meteor.Error('Not authorized');
		}else{
			return NewSchoolDB.find();
		}
	});

	Meteor.publish('Users', function () {
		if (!this.userId) {
			return false;
			throw new Meteor.Error('Not authorized');
		}else{
			return Meteor.users.find();
		}
	});

	Meteor.publish('SchoolLogo', function () {
		return SchoolLogo.find();
	});

	Meteor.publish('SchoolLoogDBURL', function () {
		return SchoolLoogDBURL.find();
	});
}